import { Component, OnInit, ElementRef, ViewChild, ɵConsole } from '@angular/core';
import { CicloService } from 'src/app/services/ciclo.service';
import { UgpService } from 'src/app/services/ugp.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { PfaService } from 'src/app/services/pfa.service';
import { AuthService } from 'src/app/services/auth.service';
import { BienesService } from 'src/app/services/bienes.service';
import { AccionesService } from 'src/app/services/acciones.service';
import { BienesInterface } from 'src/app/entities/bienes-servicios-interface';
import { PpaService } from 'src/app/services/ppa.service';
import { TopePresupuestalService } from 'src/app/services/tope-presupuestal.service';
import { DefinicionProductoInterface } from 'src/app/entities/definicion-producto-interface';
import { Router } from '@angular/router';
import { DemandaInterface } from 'src/app/entities/demanda-interface';
import { DemandaAdicionalService } from 'src/app/services/demanda-adicional.service';

@Component({
  selector: 'app-programacion-presupuesto-adicional',
  templateUrl: './programacion-presupuesto-adicional.component.html',
  styleUrls: ['./programacion-presupuesto-adicional.component.css']
})
export class ProgramacionPresupuestoAdicionalComponent implements OnInit {
  showFiller = false;
  lista_ciclo: Object;
  lista_ugp: Object;
  lista_producto: Object;
  lista_bienes: any = Array();
  lista_bien: any = Array();
  lista_accion_bienes: Object;
  lista_accion_producto: Object;
  lista_marco_canalizado: Object;
  anio: number;
  etapa: string;
  id_ugp: number;
  id_producto: number;
  id_accion: number;
  condicion: boolean = false;
  pfa: any = Array();
  pfa1: any = Array();
  bienes_ppa: any = Array();
  bienes_ppa1: any = Array();
  x_progreso: boolean;
  user: any;
  cantidad_lista: number;
  p: any;
  id_bienes: any = -1;
  term: string;
  bienes: BienesInterface;
  suma_total: number = 0;
  demanda: DemandaInterface;

  x_block_producto: boolean=true;
  x_block_accion: boolean=true;
  x_block_bienes: boolean=true;
  x_block_vincular: boolean=true;

  @ViewChild("closeModalBienes", {static: false})
  closeModalBienes: ElementRef;

  accion_seleccionada: string;
  cantidad_lista_pfa:number;
  lista_tope_ugp: Object;

  nombre_ugp: string;
  nombre_responsable: string;
  total_ugp_marco:number;
  total_ugp_ejecutado: number;
  total_ejecuatado: number;
  total_ugp_saldo: number;
  total_bienes_ejecutado:number;
  bienes_ejecutado: number;
  bienes_canalizado: number;
  comision_ejecutado: number;
  rutas_ejecutado: number;
  porcentaje: number;

  definicionProducto: DefinicionProductoInterface;
  nombre_accion: string;

  constructor(
    private topePresupuestal: TopePresupuestalService,
    private ugpService: UgpService,
    private productoService: ProductoService,
    private toastService: ToastrServiceService,
    private pfaService: PfaService,
    private bienesService: BienesService,
    private accionesService: AccionesService,
    private ppaService: PpaService,
    private authService: AuthService,
    private route: Router,
    private demandaservice: DemandaAdicionalService,
  ) { 
    this.bienes = {
      id_accion:0,
      anio:0,
      nombre: "",
      trama_bienes:""
    };
    this.definicionProducto = {
      id_definicion: 0,
      id_accion: 0,
      id_ugp: 0,
      df1: "",
      df2: "",
      df3: "",
      df4: "",
      df5: "",
      df6: "",
      df7: "",
      df8:"",
      cr1: "",
      cr2: "",
      cr3: "",
      cr4: "",
      cr5: "",
    };
    this.demanda={      
      usuario_registro:"",
      id_ugp:0,
      id:0      
    };
    this.pfa = {
      lista_periodo: Array()
    };
    this.pfa1 = {
      lista_periodo: Array()
    };
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.x_progreso =false;
    this.pfa=null;
    this.lista_producto = null;
    this.lista_accion_producto = null;
    this.lista_accion_bienes = null;
    this.pfa1 = null;
    this.bienes_ppa = null;
    this.getAllUGP();
    this.anio = this.user.anio;
    this.etapa =  this.user.nombre_etapa;
  }

  getAllTope() {
    for(let i=0; i< this.lista_ugp["length"]; i++){
      if(this.lista_ugp[i].id == this.id_ugp)
        this.total_ugp_ejecutado =  this.lista_ugp[i].monto_ejecutado; 
        this.nombre_ugp = this.lista_ugp[0].nombre;
        this.nombre_responsable = this.lista_ugp[0].nombre_responsable;
    }
   this.topePresupuestal.getAllMarcoUGP(this.id_ugp, this.user.codigo,1).subscribe(res => {
    this.lista_tope_ugp = res;   
    //   this.nombre_ugp = this.lista_tope_ugp[0].nombre_ugp;
    //   this.nombre_responsable = this.lista_tope_ugp[0].nombre_responsable;
    //   this.total_ugp_marco = this.lista_tope_ugp[0].ugp_total;
    this.bienes_ejecutado = this.lista_tope_ugp[0].bienes_ejecutado;
    this.comision_ejecutado = this.lista_tope_ugp[0].comision_ejecutado;
    this.rutas_ejecutado = this.lista_tope_ugp[0].rutas_ejecutado
    this.bienes_canalizado = this.lista_tope_ugp[0].bienes_canalizado;
    this.total_bienes_ejecutado = (this.user.id_estado==7) ? this.bienes_canalizado : this.bienes_ejecutado;
    this.total_ejecuatado = this.total_bienes_ejecutado + this.comision_ejecutado + this.rutas_ejecutado;
    //   this.total_ugp_saldo = this.total_ugp_marco - this.total_ugp_ejecutado;  
    //   this.porcentaje = (this.total_ugp_ejecutado*100)/this.total_ugp_marco;  
   });

    //   this.topePresupuestal.getAllMarcoUGPOrgano(this.id_ugp, this.user.codigo).subscribe(res => {
    //     this.lista_marco_canalizado = res;
    //   });
  }

  getAllUGP() {   
    this.lista_ugp = null;   
    this.lista_producto = null;
    this.lista_accion_producto = null;
    this.lista_accion_bienes = null;
    this.bienes_ppa = null;
    this.pfa=null;
    this.pfa1=null;
    this.x_progreso =false;
    
    this.ugpService.getAllUGPxProgramacion(this.user.codigo, this.user.id_ciclo, this.user.id_etapa, 1).subscribe(res => {
      this.lista_ugp = res;
      this.id_ugp = (res["length"]>0) ? this.lista_ugp[0].id :0;
      this.getAllProducto();
    });    
  }

  getAllProducto() {
    this.lista_producto = null;
    this.lista_accion_producto = null;
    this.lista_accion_bienes = null;
    this.bienes_ppa = null;
    this.pfa=null;
    this.pfa1=null;
    this.x_progreso =false;

    this.getAllTope();

    this.productoService.getProductoxProgramacion(this.id_ugp, this.user.codigo, 1).subscribe(res => {      
      this.lista_producto = res;
      // console.log(res);
      this.id_producto = (res["length"]>0) ? this.lista_producto[0].id : -1;
      this.getAllAccionesxProducto();
    });
  }

  getAllAccionesxProducto() {
    this.lista_accion_producto = null;
    this.lista_accion_bienes = null;
    this.pfa=null;
    this.pfa1=null;
    this.bienes_ppa=null;
    this.x_progreso =false;

    this.accionesService.getAllAccionesxProgramacion(this.id_producto, this.user.codigo, 1).subscribe(res => {
      this.lista_accion_producto = res;
      this.id_accion = (res["length"]>0) ? this.lista_accion_producto[0].id : -1;
      this.accion_seleccionada = (res["length"]>0) ? this.lista_accion_producto[0].nombre : '';    

      this.definicionProducto = {
        df1: (res["length"]>0) ? this.lista_accion_producto[0].df1 : '',
        df2: (res["length"]>0) ? this.lista_accion_producto[0].df2 : '',
        df3: (res["length"]>0) ? this.lista_accion_producto[0].df3 : '',
        df4: (res["length"]>0) ? this.lista_accion_producto[0].df4 : '',
        df5: (res["length"]>0) ? this.lista_accion_producto[0].df5 : '',
        df6: (res["length"]>0) ? this.lista_accion_producto[0].df6 : '',
        df7: (res["length"]>0) ? this.lista_accion_producto[0].df7 : '',
        df8: (res["length"]>0) ? this.lista_accion_producto[0].df8 : '',
        cr1: (res["length"]>0) ? this.lista_accion_producto[0].cr1 : '',
        cr2: (res["length"]>0) ? this.lista_accion_producto[0].cr2 : '',
        cr3: (res["length"]>0) ? this.lista_accion_producto[0].cr3 : '',
        cr4: (res["length"]>0) ? this.lista_accion_producto[0].cr4 : '',
        cr5: (res["length"]>0) ? this.lista_accion_producto[0].cr5 : '',
      };

      this.getAllBienesPPA();
      this.getAllPFAcciones();
      this.getAllBienesPPAcciones();
    });
  }

  getChangeAcciones(){
    this.getAllBienesPPA();
    this.getAllPFAcciones();
    this.getAllBienesPPAcciones();
  }

  getAllPFAcciones() {
    this.pfa=null;
    this.pfa1=null;

    this.pfaService.getAllPFAcciones3(this.id_accion, this.user.anio, this.user.codigo, 0).subscribe(res => {
      this.pfa1 = res;  
      this.pfaService.getAllPFAcciones3(this.id_accion, this.user.anio, this.user.codigo, 1).subscribe(res => {
        this.pfa = res;
      });
    });
  }

  getAllBienes(){
    this.lista_accion_bienes = null;
    this.bienes_ppa=null;
    this.x_progreso =false;
    this.getAllBienesPPA();
  }

  getAllBienesPPA() {
    this.bienesService.getAllBienesServiciosPPA(this.user.anio, this.user.codigo, this.id_accion, 1).subscribe(
      res => {
        this.lista_bienes = res;
        // console.log(this.lista_bienes);
      },
      err => {
        this.toastService.showError(
          "Error: " + err.message + "Respuesta del servidor.",
          "Error"
        );
      }
    );
  }

  getDefinicion(elemento){
    this.nombre_accion = elemento.nombre_accion;
  }

  select(elemento) {
    elemento.flag = !elemento.flag;
  }

  public validarSoloNumeros(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {      
      return false;
    }
    return true;
  }

  sumarTotal(index){
    var suma = 0;
    var monto = 0;
    for (let k = 0; k < this.bienes_ppa[index].lista_periodo_adicional.length; k++) {
      suma = suma + this.bienes_ppa[index].lista_periodo_adicional[k].cantidad;
      this.bienes_ppa[index].lista_periodo_adicional[k].monto = this.bienes_ppa[index].lista_periodo_adicional[k].cantidad*this.bienes_ppa[index].lista_periodo_adicional[k].precio_bienes;
      monto =  monto + this.bienes_ppa[index].lista_periodo_adicional[k].cantidad*this.bienes_ppa[index].lista_periodo_adicional[k].precio_bienes;
    }
    this.bienes_ppa[index].suma = suma;
    this.bienes_ppa[index].monto = monto;
  }

  vincularBienes(){
    this.x_progreso =false;
    this.bienes.id_accion = this.id_accion;
    this.bienes.anio = this.user.anio;
    this.bienes.codigo_usuario = this.user.codigo;
    this.bienes.id_ciclo = this.user.id_ciclo;
    this.bienes.id_etapa = this.user.id_etapa;
    this.bienes.adicional = 1;
    var trama_bienes = "<bienes>";
    for (let i = 0; i < this.lista_bienes["length"]; i++) {
      if(this.lista_bienes[i].flag){
        trama_bienes =  trama_bienes + "<r>";
        trama_bienes =  trama_bienes + "<ID_BIENES>" + this.lista_bienes[i].id + "</ID_BIENES>";
        trama_bienes =  trama_bienes + "<ANIO>" + this.user.anio + "</ANIO>";
        trama_bienes =  trama_bienes + "<ID_ACCION>" + this.id_accion + "</ID_ACCION>";
        trama_bienes =  trama_bienes + "<FLAG>" + "1" + "</FLAG>";
        trama_bienes =  trama_bienes + "</r>";
      }
    }
    trama_bienes =  trama_bienes + "</bienes>";
    this.bienes.trama_bienes = trama_bienes;
    //console.log(this.bienes.trama_bienes);
    this.bienesService.guardarBienesxAccion(this.bienes).subscribe(res => {
      this.closeModalBienes.nativeElement.click();
      this.x_progreso = true;
      //this.getBienesxAccion();
      this.ugpService.getAllUGPxProgramacion(this.user.codigo, this.user.id_ciclo, this.user.id_etapa, 1).subscribe(res => {
        this.lista_ugp = res;
        this.productoService.getProductoxProgramacion(this.id_ugp, this.user.codigo, 1).subscribe(res => {      
          this.lista_producto = res;
          this.accionesService.getAllAccionesxProgramacion(this.id_producto, this.user.codigo, 1).subscribe(res => {
            this.lista_accion_producto = res;
          });
        });
      });
      this.getAllTope();
      this.getAllBienesPPAcciones();
    });
  }

  getBienesxAccion(){
    this.x_block_bienes = true;
    this.bienesService.getAllBienesServiciosAccion(this.user.anio, this.id_accion).subscribe(
      res => {
        this.lista_accion_bienes = res;
        if(res["length"]>0){
          this.id_bienes = this.lista_accion_bienes[0].id;
          this.x_block_bienes = false;
        }  
        else{
          this.id_bienes = -1;
        }    
        this.getAllBienesPPAcciones();
      },
      err => {
        this.toastService.showError(
          "Error: " + err.message + "Respuesta del servidor.",
          "Error"
        );
      }
    );
  }

  getAllBienesPPAcciones() {
    this.bienes_ppa = null;
    this.bienes_ppa1 = null;

    this.ppaService.getAllBienesAdicional(this.id_accion, this.user.codigo).subscribe(
      res => {        
        this.bienes_ppa = res;
        // console.log(res,"res");
        this.cantidad_lista = res["length"];
        this.x_progreso =true;
        this.condicion = false;
        this.suma_total = 0;
        // console.log("ok1",this.user.id_estado);
        for(let i=0; i<this.bienes_ppa.length;i++){
          this.sumarTotal(i);
          this.suma_total = this.suma_total + this.bienes_ppa[i].monto; 
          this.bienes_ppa[i].canalizado = (this.user.id_estado == 7) ? 1 : ((this.bienes_ppa[i].canalizado == 1) ? 0 : 1);
          this.bienes_ppa[i].id_ciclo = this.user.id_ciclo;
          this.bienes_ppa[i].id_etapa = this.user.id_etapa; 
          this.bienes_ppa[i].codigo_usuario = this.user.codigo;
        }
        //console.log("suma_total",suma_total);
        this.ppaService.getAllBienesPPAcciones(this.id_accion, this.user.anio, this.user.codigo, 0).subscribe(res => { 
          this.bienes_ppa1 = res;
          });
      },
      err => {
        this.toastService.showError(
          "Problemas para conectar al servidor.",
          "Error"
        );
      }
    );
  }

  guardarPPAccion() {
    this.x_progreso =false;
    // console.log("res",this.bienes_ppa);
    this.ppaService.guardarPPAccionesAdicional(this.bienes_ppa).subscribe(res => {
      this.toastService.showSuccess("Se guardó la programación.", "Correcto");
      this.x_progreso =true;
      //this.getAllTope; //tope se actualiza
      //this.getAllUGP(); //debe disparar actualizar los combos
      this.ugpService.getAllUGPxProgramacion(this.user.codigo, this.user.id_ciclo, this.user.id_etapa, 1).subscribe(res => {
        this.lista_ugp = res;
        this.productoService.getProductoxProgramacion(this.id_ugp, this.user.codigo, 1).subscribe(res => {      
          this.lista_producto = res;
          this.accionesService.getAllAccionesxProgramacion(this.id_producto, this.user.codigo, 1).subscribe(res => {
            this.lista_accion_producto = res;
          });
        });
        this.getAllTope();
      });
      
      //this.getAllBienesPPAcciones();
    },
    err => {
      this.x_progreso =true;
      this.toastService.showError(
        "Problemas para conectar al servidor.",
        "Error"
      );
    });
  }

  getAllBienesCanalizados(){
    this.closeModalBienes.nativeElement.click();
    setTimeout( () => {this.route.navigate(["/reporte-programacion-bienes"]),2000}
    )
  }
  
  getElemento(elemento){
    this.demanda={
      id: (elemento!=null) ? elemento.id : 0,
      id_ugp: (elemento!=null) ? elemento.id_accion : this.id_ugp,      
      usuario_registro: (elemento!=null) ? elemento.actv_presupuestal : this.user.codigo,
    };
  }

}
