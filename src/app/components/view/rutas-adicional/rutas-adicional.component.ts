import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { RutasInterface } from 'src/app/entities/rutas';
import { RutasService } from 'src/app/services/rutas.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { RegionService } from 'src/app/services/region.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { DestinoRutasInterface } from 'src/app/entities/destino-rutas';
import { OrganoService } from 'src/app/services/organo.service';
import { UgpService } from 'src/app/services/ugp.service';
import { ProductoService } from 'src/app/services/producto.service';
import { AccionesService } from 'src/app/services/acciones.service';
import { ExcelServicesService } from 'src/app/services/excel-services.service';

@Component({
  selector: 'app-rutas-adicional',
  templateUrl: './rutas-adicional.component.html',
  styleUrls: ['./rutas-adicional.component.css']
})
export class RutasAdicionalComponent implements OnInit {
  lista_rutas: any = Array();
  lista_vehiculo: Object;
  lista_mantenimiento: Object;
  lista_tipo_vehiculo:Object;
  lista_estacion: any = Array();
  lista_categoria: Object;
  lista_organo: Object;
  lista_destino: Object;
  ruta: RutasInterface;
  destino: DestinoRutasInterface;
  filtro_estado: string;
  filtro_nombre: string;
  p: any;

  id_departamento_o:string;
  id_provincia_o:string;
  id_distrito_o:string;
  id_departamento_d:string;
  id_provincia_d:string;
  id_distrito_d:string;
  lista_dep: Object;
  lista_prov: Object;
  lista_dis: Object;
  lista_dep_d: Object;
  lista_prov_d: Object;
  lista_dis_d: Object;

  id_organo: number;
  user: any;
  id_producto: number=0;
  id_ugp: number=0;
  id_accion: number=0;
  codigo_organo: string;
  codigo_categoria:string;

  listaUGP: Object;
  listaProductos: Object;
  acciones: any = Array();

  lista_toda_estacion; Object;
  term:any;
  total_comision:number;
  @ViewChild("closeModalRuta", {static: false})
  closeModalRuta: ElementRef;

  anio: number;
  etapa: string;
  hoy: Date;

  constructor(
    private rutaSrv: RutasService,
    private vehSrv: VehiculoService,
    private rgSrv: RegionService,
    private toastService: ToastrServiceService,
    private authService: AuthService,
    private ugpService: UgpService,
    private productoService: ProductoService,
    private accionesService: AccionesService,
    private excelService:ExcelServicesService,
    private organoService: OrganoService,
  ) {
    this.ruta = {
      id: 0,
      nombre_ruta: "",
      id_organo: 0,
      id_accion:0,
      id_ugp:0,
      estado: 1,
      nombre_estado: "",
      cantidad_persona: 0,
      tiempo_servicio: 0,
      tiempo_traslado: 0,
      fecha_salida: "",
      hora_salida: "",
      otros_servicio: 0,
      id_departamento:'',
      id_provincia:'',
      id_distrito:'',
      adicional:1
    };
    this.filtro_estado="";
    this.filtro_nombre="";

    this.lista_rutas = null;

    this.filtro_nombre="";
    this.destino = {
      tipo_destino:0,
      id_ruta:0,
      id_estado:0,
      kilometro:0,
      id:0,
      id_estacion:"",
      id_mantenimiento: 0,
      tiempo_mantenimiento: 0,
      id_categoria: 0,
      tiempo_traslado: 0,
    }
  }

  exportAsXLSX():void {
    var excel=[];
    this.lista_rutas.forEach(row => {
      let data = {
        CENTRO_COSTO: row.nombre_organo,
        UGP: row.nombre_ugp,
        PRODUCTO: row.nombre_producto,
        ACCION: row.nombre_accion,
        CODIGO: row.generado,
        FECHA_SALIDA: row.fecha_salida,
        HORA_SALIDA: row.hora_salida,
        PEAJE: row.monto_peaje,
        VIATICO: row.monto_viatico,
        COMBUSTIBLE: row.monto_combustible,
        TOTAL: row.suma,
        NOMBRE_DEPARTAMENTO: row.nombre_departamento,
        NOMBRE_PROVINCIA: row.nombre_provincia,
        NOMBRE_DISTRITO: row.nombre_distrito,
        DESTINOS: row.destinos
      }
      excel.push(data);
    });
    this.excelService.exportAsExcelFile(excel, 'comision_local');
  }

  ngOnInit() {
    this.hoy = new Date();
    this.user = this.authService.getUserLoggedIn();
    this.etapa =  this.user.nombre_etapa;
    this.anio = this.user.anio;
    this.getAllEstacionInit();
    this.getAllOrigen();
    this.getAllCategoriaEstacion();
    this.getAllRutas();
    this.getAllVehiculo();
    this.getAllTipoVehiculo();
    this.getAllUGP();
    this.getAllOrgano();
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
      if(res["length"]!=0){
        this.id_organo = this.lista_organo[0].id;
      }
      //restriccion de organo por perfil
      if(this.user.id_estado!=3){
        for(let i=0;i<this.lista_organo["length"];i++){
          if(this.lista_organo[i].nombre == this.user.dependencia){
            this.id_organo = this.lista_organo[i].id;
          }
        }
      }
    });
  }

  getAllRutas(){
    this.rutaSrv.listarRutas(this.user.codigo, 1, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_rutas = res;
      // console.log(res);
      this.total_comision = 0;
      for(let i=0;i<this.lista_rutas["length"];i++){
        this.total_comision = this.total_comision + this.lista_rutas[i].suma;
      }
    });
  }

  getAllUGP() {
    this.listaUGP = null;
    this.listaProductos = null;
    this.acciones = null;
    this.ugpService.getAllUGPxFiltro(this.user.codigo, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.listaUGP = res;
      this.id_ugp = (res["length"]>0) ? this.listaUGP[0].id :0;
      this.getAllProductoxUGP();
    });

  }

  getAllProductoxUGP() {
    this.listaProductos = null;
    this.acciones = null;
    this.productoService.getProductoxFiltro(this.id_ugp, this.user.codigo).subscribe(res => {
      this.listaProductos = res;
      this.id_producto = (res["length"]>0) ? this.listaProductos[0].id : -1;
      this.getAllAccionesxProducto();
    });
  }

  getAllAccionesxProducto() {
    this.acciones = null;
    this.accionesService.getAllAccionesxMetaFisica(this.id_producto, this.user.codigo, 1).subscribe(res => {
      this.acciones = res;
      this.id_accion = (res["length"]>0) ? this.acciones[0].id : -1;
    });
  }

  capturarIdUGP(elemento) {
    this.id_ugp = elemento.id;
    this.id_accion = null;
    this.id_producto = null;
    this.getAllProductoxUGP();
  }

  capturarIdProducto(elemento) {
    this.id_producto = elemento.id;
    this.id_accion = null;
    this.getAllAccionesxProducto();
  }

  capturarIdAccion(accion) {
    this.id_accion = accion.id;
  }

  getAllVehiculo() {
    this.vehSrv.getAllVehiculoServicios().subscribe(res => {
      this.lista_vehiculo = res;
      if(this.lista_vehiculo["length"]!=0){
      }
  });}

  getAllTipoVehiculo() {
    this.vehSrv.listaTipoVehiculo().subscribe(res => {
      this.lista_tipo_vehiculo = res;
      if(this.lista_tipo_vehiculo["length"]!=0){
      }
    });
  }

  getAllEstacionInit(){
    this.rutaSrv.getAllEstacionLocal().subscribe(res => {
      this.lista_toda_estacion = res["listEstacion"];
    });
  }

  getAllEstacion(){
    this.lista_estacion = [];
    if(this.lista_toda_estacion!=null)
    {
      for(let n=0; n< this.lista_categoria["length"];n++){
        if(this.lista_categoria[n].id == this.destino.id_categoria){
          this.codigo_categoria = this.lista_categoria[n].abreviatura;
        }
      }

      for(let i=0; i< this.lista_toda_estacion.length;i++){
        if(this.lista_toda_estacion[i].cod_DIRECCION_ZONAL==this.codigo_organo &&
          this.lista_toda_estacion[i].categoria.indexOf(this.codigo_categoria) !==-1){
          this.lista_estacion.push({
            codigo: this.lista_toda_estacion[i].cod_ESTACION,
            nombre: this.lista_toda_estacion[i].estacion,
            categoria: this.lista_toda_estacion[i].categoria
          });
        }
      }
    }
  }

  getAllCategoriaEstacion(){
    this.rutaSrv.getAllEstacion().subscribe(res => {
      this.lista_categoria = res;
    });
  }

  getAllRegion() {
    this.rgSrv.getAllDepartarmento().subscribe(res => {
      this.lista_dep_d = res;
      this.lista_prov_d = null;
      this.lista_dis_d = null;
      if(res["length"]>0){
        this.id_departamento_d = this.lista_dep_d[0].CODI_DEPA_DPT;
        this.getAllProvD();
      }
    });
  }

  getAllOrigen(){
    this.rgSrv.getAllDepartarmento().subscribe(res => {
      this.lista_dep = res;
      this.lista_prov = null;
      this.lista_dis = null;
      if(res["length"]>0){
        this.id_departamento_o = this.lista_dep[0].CODI_DEPA_DPT;
        this.getAllProv();
      }
    })
  }

  getAllProv() {
    this.rgSrv.getAllProvincia(this.id_departamento_o).subscribe(res => {
      this.lista_prov = res;
      this.lista_dis = null;
      if(res["length"]>0){
        this.id_provincia_o = this.lista_prov[0].CODI_PROV_TPR;
        this.getAllDis();
      }
    });
  }
  getAllDis() {
    this.rgSrv.getAllDistrito(this.id_departamento_o,this.id_provincia_o).subscribe(res => {
      this.lista_dis = res;
      if(res["length"]>0){
        this.id_distrito_o = this.lista_dis[0].CODI_DIST_TDI;
      }
    });
  }

  getAllProvD() {
    this.rgSrv.getAllProvincia(this.id_departamento_d).subscribe(res => {
      this.lista_prov_d = res;
      this.lista_dis_d = null;
      if(res["length"]>0){
        this.id_provincia_d = this.lista_prov_d[0].CODI_PROV_TPR;
        this.getAllDisD();
      }
    });
  }
  getAllDisD() {
    this.rgSrv.getAllDistrito(this.id_departamento_d,this.id_provincia_d).subscribe(res => {
      this.lista_dis_d = res;
      if(res["length"]>0){
        this.id_distrito_d = this.lista_dis_d[0].CODI_DIST_TDI;
      }
    });
  }


    getAllDestinoRuta(){
      this.rutaSrv.getAllDestinoRuta(this.ruta.id).subscribe(res => {
        this.lista_destino = res;

        if(this.lista_toda_estacion!=null)
        {
          for(let i=0; i<this.lista_destino["length"];i++){
            for(let j=0; j<this.lista_toda_estacion["length"];j++){
              if(this.lista_destino[i].id_estacion == this.lista_toda_estacion[j].cod_ESTACION){
                this.lista_destino[i].nombre_estacion =  this.lista_toda_estacion[j].estacion;
              }
            }
          }
        }
      });
    }

    getElemento(elemento){
      this.ruta = {
        id: (elemento !=null)? elemento.id : 0,
        nombre_ruta: (elemento !=null)? elemento.nombre_ruta : "",
        id_organo: (elemento!= null) ? elemento.id_organo:0,
        cantidad_persona: (elemento !=null)? elemento.cantidad_persona : 0,
        fecha_salida: (elemento !=null)? elemento.fecha_salida : new Date().toISOString().split('T')[0],
        hora_salida: (elemento !=null)? elemento.hora_salida : "",
        tiempo_traslado: (elemento !=null)? elemento.tiempo_traslado : 0,
        otros_servicio: (elemento !=null)?elemento.otros_servicio: "",
        id_departamento: (elemento !=null)?elemento.id_departamento: "",
        id_provincia: (elemento !=null)?elemento.id_provincia: "",
        id_distrito: (elemento !=null)?elemento.id_distrito: "",
        estado: (elemento !=null)? elemento.estado : 1,
        nombre_estado: (elemento !=null)? elemento.nombre_estado : "",
        id_ugp: (elemento!=null) ? elemento.id_ugp : 0,
        id_producto: (elemento!=null) ? elemento.id_producto : 0,
        id_accion: (elemento!=null) ? elemento.id_accion : 0,
        peajes: (elemento!=null) ? elemento.peajes : 0,
        adicional : (elemento != null)?elemento.adicional : 1,
      };

      this.id_organo = (elemento!=null) ? this.ruta.id_organo : this.id_organo;
      this.id_ugp = (elemento!=null) ? this.ruta.id_ugp : this.id_ugp;
      this.id_producto = (elemento!=null) ? this.ruta.id_producto : this.id_producto;
      this.id_accion = (elemento!=null) ? this.ruta.id_accion : this.id_accion;

      this.id_departamento_o = (elemento!=null) ? this.ruta.id_departamento : this.id_departamento_o;
      this.rgSrv.getAllProvincia(this.id_departamento_o).subscribe(res => {
        this.lista_prov = res;
        if(res["length"]>0){
          this.id_provincia_o = (elemento!=null) ? this.ruta.id_provincia : this.id_provincia_o;
          this.rgSrv.getAllDistrito(this.id_departamento_o,this.id_provincia_o).subscribe(res => {
            this.lista_dis = res;
            if(res["length"]>0){
              this.id_distrito_o = (elemento!=null) ? this.ruta.id_distrito : this.id_distrito_o;
            }
          });
        }
      });

      this.productoService.getProductoxFiltro(this.id_ugp, this.user.codigo).subscribe(res => {
        this.listaProductos = res;
        this.accionesService.getAllAccionesxMetaFisica(this.id_producto, this.user.codigo, 1).subscribe(res => {
          this.acciones = res;
        });
      });

    }

    guardarRutas() {

    this.ruta.id_accion = this.id_accion;
    this.ruta.id_organo = this.id_organo;

    this.ruta.id_departamento = this.id_departamento_o;
    this.ruta.id_provincia = this.id_provincia_o;
    this.ruta.id_distrito = this.id_distrito_o;

    this.ruta.adicional = 1;

    this.rutaSrv.registrarRuta(this.ruta).subscribe(
      res => {
        if (res["id"]!= null) {
          this.toastService.showSuccess("La ruta ha sido registrada", "Correcto");
          this.closeModalRuta.nativeElement.click();
          this.getAllRutas();
        } else if (res["id"] == null) {
          this.toastService.showError("Se produjo un error al guardar.","Error");
        }
      },
      err => {
        this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message,"Error");
      });

    }

    getDestino(elemento){
      this.ruta = {
        id: (elemento!=null) ? elemento.id : 0,
        nombre_ruta: (elemento!=null) ? elemento.nombre_ruta : "",
        id_organo: (elemento!= null) ? elemento.id_organo:0,
        codigo_organo: (elemento!= null) ? elemento.codigo_organo:"",
        nombre_organo: (elemento!=null) ? elemento.nombre_organo : "",
        id_accion: (elemento!= null) ? elemento.id_accion:0,
        cantidad_persona: (elemento !=null)? elemento.cantidad_persona : 0,
        fecha_salida: (elemento !=null)? elemento.fecha_salida : "",
        hora_salida: (elemento !=null)? elemento.hora_salida : "",
        tiempo_traslado: (elemento !=null)? elemento.tiempo_traslado : 0,
        otros_servicio: (elemento !=null)?elemento.otros_servicio: "",
        id_departamento: (elemento !=null)?elemento.id_departamento: "",
        id_provincia: (elemento !=null)?elemento.id_provincia: "",
        id_distrito: (elemento !=null)?elemento.id_distrito: "",
        nombre_departamento: (elemento !=null)?elemento.nombre_departamento: "",
        nombre_provincia: (elemento !=null)?elemento.nombre_provincia: "",
        nombre_distrito: (elemento !=null)?elemento.nombre_distrito: "",
        estado: (elemento !=null)? elemento.estado : 1,
        nombre_estado: (elemento !=null)? elemento.nombre_estado : "",
        adicional: (elemento !=null)? elemento.adicional : 1,
      };

      this.codigo_organo = this.ruta.codigo_organo;
      // console.log(this.codigo_organo);
      this.destino.id_tipo_transporte = 1;
      this.getAllEstacion()
      this.getAllRegion();
      this.getAllDestinoRuta();
    }

  pad(str, max) {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  }


  guardarDestino() {
    this.destino.id_ruta = this.ruta.id;
    this.destino.id_departamento_d = this.id_departamento_d;
    this.destino.id_provincia_d = this.id_provincia_d;
    this.destino.id_distrito_d = this.id_distrito_d;

    this.destino.id_tipo_movilidad = (this.destino.id_tipo_transporte==1) ? this.destino.id_tipo_movilidad : 0;
    this.destino.id_tipo_carretera = (this.destino.id_tipo_transporte==1 && this.destino.id_tipo_movilidad==1) ? this.destino.id_tipo_carretera : 0;
    this.destino.id_vehiculo = (this.destino.id_tipo_transporte==1 && this.destino.id_tipo_movilidad==1) ? this.destino.id_vehiculo : 0;
    this.destino.kilometro = (this.destino.id_tipo_transporte==1 && this.destino.id_tipo_movilidad==1) ? this.destino.kilometro : 0;

    this.rutaSrv.guardarDestinoRuta(this.destino).subscribe(
      res => {
        if (res["id"] != null) {
          this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          this.lista_destino = null;
          this.getAllDestinoRuta();
          this.getAllRutas();
        } else if (res["id"] == null) {
          this.toastService.showError(
            "Se produjo un error al guardar.",
            "Error"
          );
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


  eliminarDestino(elemento){
    this.rutaSrv.eliminarDestinoRuta(elemento).subscribe(
      res => {
        if (res["id"] != null) {
          this.toastService.showSuccess("Se anulo con éxito", "Correcto");
          this.lista_destino = null;
          this.getAllDestinoRuta();
        } else if (res["id"] == null) {
          this.toastService.showError(
            "Se produjo un error al anular.",
            "Error"
          );
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

}
