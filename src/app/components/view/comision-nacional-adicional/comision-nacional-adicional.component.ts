import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {VehiculoService} from 'src/app/services/vehiculo.service';
import {ComisionInterface} from 'src/app/entities/comision-interface';
import {ComisionService} from 'src/app/services/comision.service';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {RegionService} from 'src/app/services/region.service';
import {DestinoInterface} from 'src/app/entities/destino-interface';
import {UgpService} from 'src/app/services/ugp.service';
import {ProductoService} from 'src/app/services/producto.service';
import {AccionesService} from 'src/app/services/acciones.service';
import {AuthService} from 'src/app/services/auth.service';
import {OrganoService} from 'src/app/services/organo.service';
import {ExcelServicesService} from 'src/app/services/excel-services.service';

@Component({
  selector: 'app-comision-nacional-adicional',
  templateUrl: './comision-nacional-adicional.component.html',
  styleUrls: ['./comision-nacional-adicional.component.css']
})
export class ComisionNacionalAdicionalComponent implements OnInit {
  lista_comision: any = new Array();
  lista_comision_reporte: any = new Array();
  flagbtn = true;
  lista_vehiculo: Object;
  lista_destino: Object;
  lista_organo: Object;
  lista_dep: Object;
  lista_prov: Object;
  lista_dis: Object;
  lista_dep_d: Object;
  lista_prov_d: Object;
  lista_dis_d: Object;

  comision: ComisionInterface;
  destino: DestinoInterface;
  filtro_estado: string;
  filtro_nombre: string;
  p: any;

  listaUGP: Object;
  listaProductos: Object;
  acciones: any = Array();

  user: any;
  id_producto: number = 0;
  id_ugp: number = 0;
  id_accion: number = 0;
  id_departamento_o: string;
  id_provincia_o: string;
  id_distrito_o: string;
  id_departamento_d: string;
  id_provincia_d: string;
  id_distrito_d: string;
  id_comision: number;
  id_organo: number;

  valida: boolean;
  cantidad_lista: number;
  total_comision: number;
  term: any;

  anio: number;
  etapa: string;
  hoy: Date;

  @ViewChild("closeModalVehiculo", {static: false})
  closeModalVehiculo: ElementRef;

  constructor(
    private comisionService: ComisionService,
    private vehiculoService: VehiculoService,
    private regionService: RegionService,
    private toastService: ToastrServiceService,
    private ugpService: UgpService,
    private productoService: ProductoService,
    private accionesService: AccionesService,
    private organoService: OrganoService,
    private excelService: ExcelServicesService,
    private authService: AuthService
  ) {
    this.comision = {
      fecha_retorno: "",
      fecha_salida: "",
      hora_salida: "",
      hora_retorno: "",
      cantidad_persona: 0,
      id_tipo_viatico: 1,
      id_tipo_comision: 1,
      id_estado: 1,
      nombre_estado: "",
      id_organo: 0
    };
    this.filtro_estado = "";
    this.filtro_nombre = "";
    this.destino = {
      tipo_destino: 0,
      id_comision: 0,
      id_estado: 0,
      kilometro: 0,
      id_departamento: '',
      id_provincia: '',
      id_distrito: '',
      placa: '',
      id: 0,
      tarifa: 0
    }
  }

  exportAsXLSX(): void {
    var excel = [];
    this.flagbtn = false;
    this.comisionService.getAllComisionVehReporteServicios(this.user.codigo, 1, 1, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_comision_reporte = res;
      this.lista_comision_reporte.forEach(row => {
        let data = {
          CENTRO_COSTO: row.nombre_organo,
          UGP: row.nombre_ugp,
          PRODUCTO: row.nombre_producto,
          ACCION: row.nombre_accion,
          CODIGO: row.generado,
          FECHA_INICIO: row.fecha_salida,
          FECHA_FIN: row.fecha_retorno,
          PASAJE: row.monto_pasaje,
          VIATICO: row.monto_viatico,
          COMBUSTIBLE: row.monto_combustible,
          DIVERSOS: row.monto_almuerzo,
          TOTAL: row.suma,
          ORIGEN_DESTINO: row.salida_destino
        }
        excel.push(data);
      });
      this.flagbtn = true;
      this.excelService.exportAsExcelFile(excel, 'comision_nacional');
    });
  }

  ngOnInit() {
    this.hoy = new Date();
    this.user = this.authService.getUserLoggedIn();
    this.etapa = this.user.nombre_etapa;
    this.anio = this.user.anio;
    this.getAllComisionVehiculo();
    this.getAllVehiculo();
    this.getAllUGP();
    this.getAllOrgano();
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
      if (res["length"] != 0) {
        this.id_organo = this.lista_organo[0].id;
      }
      //restriccion de organo por perfil
      if (this.user.id_estado != 3) {
        for (let i = 0; i < this.lista_organo["length"]; i++) {
          if (this.lista_organo[i].nombre == this.user.dependencia) {
            this.id_organo = this.lista_organo[i].id;
          }
        }
      }
    });
  }

  getAllComisionVehiculo() {
    this.lista_comision = null;
    this.comisionService.getAllComisionVehServicios(this.user.codigo, 1, 1, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_comision = res;
      this.cantidad_lista = res["length"];
      this.total_comision = 0;
      for (let i = 0; i < this.lista_comision["length"]; i++) {
        this.total_comision = this.total_comision + this.lista_comision[i].suma;
      }
    });
  }

  getAllVehiculo() {
    this.vehiculoService.getAllVehiculoServicios().subscribe(res => {
      this.lista_vehiculo = res;
      if (this.lista_vehiculo["length"] != 0) {
        //this.comision.id_vehiculo = this.lista_vehiculo[0].id;
      }
    });
  }

  getElemento(elemento) {
    this.comision = {
      id: (elemento != null) ? elemento.id : 0,
      id_tipo_viatico: (elemento != null) ? elemento.id_tipo_viatico : 1,
      id_tipo_comision: (elemento != null) ? elemento.id_tipo_comision : 1,
      cantidad_persona: (elemento != null) ? elemento.cantidad_persona : 0,
      fecha_salida: (elemento != null) ? elemento.fecha_salida : new Date().toISOString().split('T')[0],
      fecha_retorno: (elemento != null) ? elemento.fecha_retorno : new Date().toISOString().split('T')[0],
      id_estado: (elemento != null) ? elemento.id_estado : 1,
      nombre_estado: (elemento != null) ? elemento.nombre_estado : "",
      id_organo: (elemento != null) ? elemento.id_organo : 0,
      nombre_organo: (elemento != null) ? elemento.nombre_organo : "",
      id_ugp: (elemento != null) ? elemento.id_ugp : 0,
      id_producto: (elemento != null) ? elemento.id_producto : 0,
      id_accion: (elemento != null) ? elemento.id_accion : 0
    };

    this.id_organo = (elemento != null) ? this.comision.id_organo : this.id_organo;
    this.id_ugp = (elemento != null) ? this.comision.id_ugp : this.id_ugp;
    this.id_producto = (elemento != null) ? this.comision.id_producto : this.id_producto;
    this.id_accion = (elemento != null) ? this.comision.id_accion : this.id_accion;

    this.productoService.getProductoxFiltro(this.id_ugp, this.user.codigo).subscribe(res => {
      this.listaProductos = res;
      this.accionesService.getAllAccionesxMetaFisica(this.id_producto, this.user.codigo, 1).subscribe(res => {
        this.acciones = res;
      });
    });

  }

  getDestino(elemento) {
    // console.log(elemento);
    this.comision = {
      id: (elemento != null) ? elemento.id : 0,
      id_tipo_viatico: (elemento != null) ? elemento.id_tipo_viatico : 1,
      id_tipo_comision: (elemento != null) ? elemento.id_tipo_comision : 1,
      cantidad_persona: (elemento != null) ? elemento.cantidad_personas : 0,
      fecha_salida: (elemento != null) ? elemento.fecha_salida : "",
      fecha_retorno: (elemento != null) ? elemento.fecha_retorno : "",
      id_estado: (elemento != null) ? elemento.id_estado : 1,
      nombre_estado: (elemento != null) ? elemento.nombre_estado : "",
      id_organo: (elemento != null) ? elemento.id_organo : 0,
    };

    this.destino.id_tipo_transporte = 1;
    this.getAllRegion();
    this.getAllDestinoComision();
  }

  getAllRegion() {
    this.regionService.getAllDepartarmento().subscribe(res => {
      this.lista_dep = res;
      this.lista_prov = null;
      this.lista_dis = null;
      this.lista_dep_d = res;
      this.lista_prov_d = null;
      this.lista_dis_d = null;
      if (res["length"] > 0) {
        this.id_departamento_o = this.lista_dep[0].CODI_DEPA_DPT;
        this.id_departamento_d = this.lista_dep_d[0].CODI_DEPA_DPT;
        this.getAllProv();
        this.getAllProvD();
      }
    });
  }

  getAllProv() {
    this.regionService.getAllProvincia(this.id_departamento_o).subscribe(res => {
      this.lista_prov = res;
      this.lista_dis = null;
      if (res["length"] > 0) {
        this.id_provincia_o = this.lista_prov[0].CODI_PROV_TPR;
        this.getAllDis();
      }
    });
  }

  getAllDis() {
    this.regionService.getAllDistrito(this.id_departamento_o, this.id_provincia_o).subscribe(res => {
      this.lista_dis = res;
      if (res["length"] > 0) {
        this.id_distrito_o = this.lista_dis[0].CODI_DIST_TDI;
      }
    });
  }

  getAllProvD() {
    this.regionService.getAllProvincia(this.id_departamento_d).subscribe(res => {
      this.lista_prov_d = res;
      this.lista_dis_d = null;
      if (res["length"] > 0) {
        this.id_provincia_d = this.lista_prov_d[0].CODI_PROV_TPR;
        this.getAllDisD();
      }
    });
  }

  getAllDisD() {
    this.regionService.getAllDistrito(this.id_departamento_d, this.id_provincia_d).subscribe(res => {
      this.lista_dis_d = res;
      if (res["length"] > 0) {
        this.id_distrito_d = this.lista_dis_d[0].CODI_DIST_TDI;
      }
    });
  }

  guardarComision() {
    this.comision.id_accion = this.id_accion;
    this.comision.id_organo = this.id_organo;
    this.comision.id_tipo_comision = 1;
    this.comision.adicional = 1;

    this.comisionService.guardarComisionVehServicios(this.comision).subscribe(
      res => {
        // console.log(res);
        if (res["id"] > 0) {
          this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          this.closeModalVehiculo.nativeElement.click();
          this.getAllComisionVehiculo();
        } else if (res["id"] == null) {
          this.toastService.showError("Se produjo un error al guardar.", "Error");
        } else if (res["id"] == -1) {
          this.toastService.showError("La fecha de salida no puede ser mayor a la fecha de retorno", "Error");
        }
      },
      err => {
        this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message, "Error");
      }
    );

    // if(this.vfecha(this.comision.fecha_salida) && this.vfecha(this.comision.fecha_retorno))
    // {

    // }
    // else{
    //   this.toastService.showError("Formato de Fecha Incorrecto", "Validación");
    // }
  }

  vfecha(data) {
    this.valida = true;
    if (data != null) {
      if (data.split('/').length == 3) {

        if (data.split('/')[2].length == 4) {
          var anio = data.split('/')[2];
        } else {
          this.valida = false;
        }

        if (data.split('/')[1].length == 2) {
          var mes = parseInt(data.split('/')[1]);
          if (mes > 12) {
            this.valida = false;
          }
        } else {
          this.valida = false;
        }

        if (data.split('/')[0].length == 2) {
          var dia = parseInt(data.split('/')[0]);
          if (dia > 31) {
            this.valida = false;
          }
        } else {
          this.valida = false;
        }

      } else {
        this.valida = false;
      }
    } else {
      this.valida = false;
    }
    return this.valida;
  }

  getAllDestinoComision() {
    this.comisionService.getAllDestinoComision(this.comision.id, this.user.anio).subscribe(res => {
      this.lista_destino = res;
    });
  }

  guardarDestino() {
    this.destino.id_comision = this.comision.id;
    this.destino.id_departamento = this.id_departamento_o;
    this.destino.id_provincia = this.id_provincia_o;
    this.destino.id_distrito = this.id_distrito_o;
    this.destino.id_departamento_d = this.id_departamento_d;
    this.destino.id_provincia_d = this.id_provincia_d;
    this.destino.id_distrito_d = this.id_distrito_d;

    this.destino.id_tipo_movilidad = (this.destino.id_tipo_transporte == 1) ? this.destino.id_tipo_movilidad : 0;
    this.destino.id_tipo_carretera = (this.destino.id_tipo_transporte == 1 && this.destino.id_tipo_movilidad == 1) ? this.destino.id_tipo_carretera : 0;
    this.destino.id_vehiculo = (this.destino.id_tipo_transporte == 1 && this.destino.id_tipo_movilidad == 1) ? this.destino.id_vehiculo : 0;
    this.destino.kilometro = (this.destino.id_tipo_transporte == 1 && this.destino.id_tipo_movilidad == 1) ? this.destino.kilometro : 0;

    this.comisionService.guardarDestinoComision(this.destino).subscribe(
      res => {
        if (res["id"] != null) {
          this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          this.lista_destino = null;
          this.getAllDestinoComision();
          this.getAllComisionVehiculo();
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

  getAllUGP() {
    this.listaUGP = null;
    this.listaProductos = null;
    this.acciones = null;
    this.ugpService.getAllUGPxFiltro(this.user.codigo, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.listaUGP = res;
      this.id_ugp = (res["length"] > 0) ? this.listaUGP[0].id : 0;
      this.getAllProductoxUGP();
    });

  }

  getAllProductoxUGP() {
    this.listaProductos = null;
    this.acciones = null;
    this.productoService.getProductoxFiltro(this.id_ugp, this.user.codigo).subscribe(res => {
      this.listaProductos = res;
      this.id_producto = (res["length"] > 0) ? this.listaProductos[0].id : -1;
      this.getAllAccionesxProducto();
    });
  }

  getAllAccionesxProducto() {
    this.acciones = null;
    this.accionesService.getAllAccionesxMetaFisica(this.id_producto, this.user.codigo, 1).subscribe(res => {
      this.acciones = res;
      this.id_accion = (res["length"] > 0) ? this.acciones[0].id : -1;
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

  pad(str, max) {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  }

  eliminarDestino(elemento) {
    this.comisionService.eliminarDestinoComision(elemento).subscribe(
      res => {
        if (res["id"] != null) {
          this.toastService.showSuccess("Se anulo con éxito", "Correcto");
          this.lista_destino = null;
          this.getAllDestinoComision();
          this.getAllComisionVehiculo();
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
