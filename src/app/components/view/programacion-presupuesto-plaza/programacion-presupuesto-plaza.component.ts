import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { PpPersonalService } from 'src/app/services/pp-personal.service';
import { CicloService } from 'src/app/services/ciclo.service';
import { PlazaInterface } from 'src/app/entities/plaza-interface';
import { OrganoService } from 'src/app/services/organo.service';
import { ExcelServicesService } from 'src/app/services/excel-services.service';

@Component({
  selector: 'app-programacion-presupuesto-plaza',
  templateUrl: './programacion-presupuesto-plaza.component.html',
  styleUrls: ['./programacion-presupuesto-plaza.component.css']
})
export class ProgramacionPresupuestoPlazaComponent implements OnInit {
  listaUGP: Object;
  id_ugp: any = 0;
  productos: Object;
  id_producto: any = -1;
  acciones: any;
  pfa: Object;
  id_accion: any = -1;
  id_bienes: any = -1;
  listaOrgano: any;
  listaDependencia: any = Array();
  listaBienes: any = Array();
  listaDeBienes: any;
  listaBienesOK: any = Array();
  term: any;
  listaPersonal: Object;
  listaPersonalNombrado: Object;
  PersonalCAS: Object;
  listaPersonalObservador: Object;
  tipoContrato: number;
  listaPeriodo: Object;
  id_periodo: any;
  lista_programacion: Object;
  cod_usuario: any;
  listaUsuario: any;
  listaUsuarios: any = Array();
  listaPersona: any;
  listaUsuarioOK: Object;
  remuneracion: any;
  incentivo: any;
  escolaridad: any;
  essalud: any;
  asignacion: any;
  gratificacion: any;
  bono: any;
  aguinaldo: any;
  productoService: any;
  listaProductos: any;
  listado: boolean;
  listado2: boolean;

  lista_ciclo: Object;
  plaza: any;
  id_plaza: any;
  plazaSeleccionada: any;
  concepto: {}[];
  monto: any = Array();
  lista_periodo: any = Array();
  arregloFinal: any = Array();
  listaAnio: any = Array();
  anio: any;
  condicion: boolean = false;
  id_anio:number;
  personal_seleccionado: string;
  plaza_nueva: PlazaInterface;

  lista_organo: Object;
  lista_organo_ugp: Object;
  lista_concepto: Object;

  @ViewChild("closeModalPlaza", {static: false})
  closeModalPlaza: ElementRef;

  constructor(
    private cicloService: CicloService,
    private usuarioService: UsuariosService,
    private toastrService: ToastrServiceService,
    private ppPersonalService: PpPersonalService,
    private organoService: OrganoService,
    private excelService:ExcelServicesService,
    private toastService: ToastrServiceService
  ) { 
    this.plaza = [
      {
        lista_remuneracion: [
          { DESCRIPCION: " ", lista_periodo: [{ monto: null }] }
        ]
      }
    ];
    this.plaza_nueva = {
      NOMBRE:"",
      A_PATERNO:"",
      A_MATERNO:"",
      DEPENDENCIA:"",
      UNIDAD:"",
      CARGO:"",
      ID_TIPO_CONTRATO:0,
      ID:0
    }
    this.tipoContrato = 0;
    this.listaPersona = {
      id_personal: "",
      porcentaje: null
    };

    this.listado = true;
    this.listado2 = false;
  }

  exportAsXLSX():void {  
    var excel=[]; 
    this.listaUsuarios.forEach(row => {  
      let data = {
        CODIGO: row.CODIGO_PLAZA,
        TITULO: row.NOMBRE + ' ' + row.A_PATERNO + ' ' + row.A_MATERNO,
        DEPENDENCIA: row.DEPENDENCIA,
        UNIDAD: row.UNIDAD,
        CARGO: row.CARGO
      }
      excel.push(data);  
    });
    this.excelService.exportAsExcelFile(excel, 'puestos');  
  } 

  ngOnInit() {
    
    this.getAllCiclo();
    this.getAllPersonal();
    this.getAllPeriodo();
    this.getAllOrgano();
    this.id_plaza = 0;
    this.anio = new Date().getFullYear();
    this.plaza_nueva.ID_TIPO_CONTRATO = 4;
    this.plaza_nueva.ID = 0;
    this.getAllConceptoxTipo();
  }

  capturarAnio() {
    this.getAllConceptoxPlaza(this.id_plaza, this.anio);
  }

  getAllPersonal() {
    this.listaUsuarios = null;
    this.ppPersonalService.getAllPlaza(0).subscribe(res => {
      this.listaUsuarios = res;
    });
  }

  getAllCiclo() {
    this.cicloService.getAllCicloActivos().subscribe(res => {
      this.lista_ciclo = res;
      if(res["length"]>0){
        this.id_anio = this.lista_ciclo[0].anio;
      }      
    });
  }

  getAllPeriodo() {
    this.ppPersonalService.getAllPeriodo().subscribe(res => {
      //console.log("LISTA DE PERIODO", res);
      this.listaPeriodo = res;
      this.listado = false;
    });
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
      if(res["length"]!=0){
        this.plaza_nueva.DEPENDENCIA = this.lista_organo[0].nombre;
        this.plaza_nueva.ID_DEPENDENCIA = this.lista_organo[0].id;
        this.getAllUGPxOrgano();
      }
    });
  }

  getAllUGPxOrgano() {

    for(let i=0; i<this.lista_organo["length"];i++){
      if(this.lista_organo[i].id == this.plaza_nueva.ID_DEPENDENCIA){
        this.plaza_nueva.DEPENDENCIA = this.lista_organo[i].nombre;
      }
    }

    this.organoService.getAllUGPxOrgano(this.plaza_nueva.ID_DEPENDENCIA).subscribe(res => {
      this.lista_organo_ugp = res;   
      if(res["length"]!=0){
        this.plaza_nueva.UNIDAD = this.lista_organo_ugp[0].nombre;
        this.plaza_nueva.ID_UNIDAD = this.lista_organo_ugp[0].id;
      }        
    });
  }

  getAllConceptoxTipo() {
    this.ppPersonalService.getAllConceptoxTipo(this.plaza_nueva.ID_TIPO_CONTRATO, this.plaza_nueva.ID).subscribe(res => {
      this.lista_concepto = res;    
    });
  }

  public validarSoloNumeros(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      if(charCode!=44)
      return false;
    }
    return true;
  }

  select(elemento) {
    this.id_plaza = elemento.ID;
    this.personal_seleccionado = (elemento.NOMBRE==null) ? 'Plaza Programada sin Asignación' : elemento.NOMBRE + ' ' + elemento.A_PATERNO + ' ' + elemento.A_MATERNO;
    this.getAllConceptoxPlaza(elemento.ID, this.anio);
    this.id_plaza = elemento.codigo;
    this.plazaSeleccionada = elemento;
    let select = elemento;
    for (let i = 0; i < this.listaUsuarios.length; i++) {
      this.listaUsuarios[i].estado = false;
    }

    select.estado = !select.estado;
  }

  getAllConceptoxPlaza(id_plaza, anio) {
    this.arregloFinal = null;
    this.listaAnio = [];
    this.ppPersonalService.getAllConcepto(id_plaza, anio).subscribe(res => {
      this.arregloFinal = [];
      this.plaza = res;
    });
  }

  guardarPlaza(){

    var trama_xml = "<remuneracion>";
    for (let i = 0; i < this.lista_concepto["length"]; i++) {
      trama_xml =  trama_xml + "<r>";
      trama_xml =  trama_xml + "<id_clasificador>" + this.lista_concepto[i].id_clasificador + "</id_clasificador>";
      trama_xml =  trama_xml + "<monto>" + this.lista_concepto[i].monto + "</monto>";
      trama_xml =  trama_xml + "</r>";
    }
    trama_xml =  trama_xml + "</remuneracion>";
    this.plaza_nueva.XML_REMUNERACION = trama_xml;

    this.ppPersonalService.guardarPlaza(this.plaza_nueva).subscribe(
      res => {
        if (res["ID"] != null) {
          this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          this.closeModalPlaza.nativeElement.click();
          this.getAllPersonal();
        } else if (res["ID"] == null) {
          this.toastService.showError("Se produjo un error al guardar.", "Error");
        }
      },
      err => {
        this.toastService.showError(
          "Se produjo un error en el servicio. Error: " + err.message,
          "Error"
        );
      }
    );
  }

  getPlaza(elemento){
    this.plaza_nueva= {
      ID:  (elemento!=null) ? elemento.ID : 0,
      NOMBRE: (elemento!=null) ? elemento.NOMBRE : "",
      A_PATERNO: (elemento!=null) ? elemento.A_PATERNO : "",
      A_MATERNO: (elemento!=null) ? elemento.A_MATERNO : "",
      CODIGO_PLAZA: (elemento!=null) ? elemento.CODIGO_PLAZA : "",
      DNI: (elemento!=null) ? elemento.DNI : "",
      ID_ESTADO: (elemento!=null) ? elemento.ID_ESTADO : 1,
      ID_DEPENDENCIA: (elemento!=null) ? elemento.ID_DEPENDENCIA : 0,
      DEPENDENCIA: (elemento!=null) ? elemento.DEPENDENCIA : "",
      UNIDAD: (elemento!=null) ? elemento.UNIDAD : "",
      CARGO: (elemento!=null) ? elemento.CARGO : "",
      ID_TIPO_CONTRATO: (elemento!=null) ? elemento.ID_TIPO_CONTRATO : 0
    }

    if(this.plaza_nueva.ID == 0){
      this.plaza_nueva.ID_DEPENDENCIA = this.lista_organo[0].id;
    }

    this.organoService.getAllUGPxOrgano(this.plaza_nueva.ID_DEPENDENCIA).subscribe(res => {
      this.lista_organo_ugp = res;        
    });
  }

}
