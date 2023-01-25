import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {UnidadMedidaService} from 'src/app/services/unidad-medida.service';
import {ProductoService} from 'src/app/services/producto.service';
import {AuthService} from 'src/app/services/auth.service';
import {AccionEstrategicaService} from 'src/app/services/accion-estrategica.service';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {OrganoService} from 'src/app/services/organo.service';
import {ActividadOperativaInterface} from 'src/app/entities/actividad-operativa-interface';
import {ActividadOperativaService} from 'src/app/services/actividad-operativa.service';
import {ExcelServicesService} from 'src/app/services/excel-services.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-actividad-operativa',
  templateUrl: './actividad-operativa.component.html',
  styleUrls: ['./actividad-operativa.component.css']
})
export class ActividadOperativaComponent implements OnInit {
  lista_ao: any = [];
  lista_um: Object;
  lista_producto: Object;
  lista_accion: Object;
  lista_organo: Object;
  x_progreso: boolean;
  user: any;

  id_ae: number;
  id_organo: number;

  ao: ActividadOperativaInterface;
  filtro_nombre: any;
  p: any;
  cantidad_lista: number;

  @ViewChild("closeModalAO", {static: false})
  closeModalAO: ElementRef;

  constructor(
    private unidadMedidaService: UnidadMedidaService,
    private toastService: ToastrServiceService,
    private productoService: ProductoService,
    private authService: AuthService,
    private organoService: OrganoService,
    private accionEstrategica: AccionEstrategicaService,
    private actividadOperativaService: ActividadOperativaService,
    private excelService: ExcelServicesService,
    private http: HttpClient
  ) {
    this.ao = {
      codigo: "",
      descripcion: "",
      id_organo: 0,
      id_unidad_medida: 0,
      id_ae: 0,
      id: 0,
      objetivo: '',
      atributo: '',
      indicador: '',
      formula: '',
      evidencia: '',
      producto: '',
    },
      this.lista_ao = {}

  }

  exportAsXLSX(): void {
    var excel = [];
    this.lista_ao.forEach(row => {
      let data = {
        CODIGO: row.codigo,
        NOMBRE: row.descripcion,
        PRODUCTO: row.trama_producto,
        ACCION_ESTRATEGICA: row.codigo_ae + ':' + row.nombre_ae,
        ORGANO: row.nombre_organo,
        UNIDAD_MEDIDA: row.nombre_unidad_medida
      }
      excel.push(data);
    });
    this.excelService.exportAsExcelFile(excel, 'actividad_operativa');
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllAO();
    this.getAllUnidadMedida();
    this.getAllAccionEstrategica();
  }

  getAllAO() {
    this.actividadOperativaService.getAllActividadOperativaxAE(this.ao.id_ae, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      console.log('Listado_AO', res);
      this.lista_ao = res;
    });
  }

  getAllUnidadMedida() {
    this.unidadMedidaService.getAllUnidadMedida().subscribe(res => {
      this.lista_um = res;
      if (res["length"] > 0) {
        this.ao.id_unidad_medida = this.lista_um[0].id;
      }
    });
  }

  getAllAccionEstrategica() {
    this.accionEstrategica.getAllAccionEstrategica(this.user.id_apertura, this.user.id_ciclo).subscribe(res => {
      this.lista_accion = res;
      if (res["length"] > 0) {
        this.ao.id_ae = this.lista_accion[0].id;
      } else {
        this.ao.id_ae = -1;
      }
      this.getAllOrgano();
    });
  }

  getAllOrgano() {
    this.lista_producto = null;
    this.lista_organo = [];
    //console.log("ao.id_ae",this.ao.id_ae);
    this.organoService.getAllOrganoxAE(this.ao.id_ae).subscribe(res => {
      this.lista_organo = res;
      //console.log("this.lista_organo",res);
      if (res["length"] > 0) {
        this.ao.id_organo = this.lista_organo[0].id;
      } else {
        this.ao.id_organo = -1;
      }
      this.getAllProducto();
    });
  }

  getAllProducto() {
    this.productoService.getProductoxOrgano(this.ao.id_organo, this.ao.id_ae, this.ao.id, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_producto = res;
    });
  }

  selectProducto(elemento) {
    elemento.flag = !elemento.flag;
  }

  getElemento(elemento) {
    // console.log(elemento);
    this.ao = {
      id: (elemento != null) ? elemento.id : 0,
      codigo: (elemento != null) ? elemento.codigo : "",
      descripcion: (elemento != null) ? elemento.descripcion : "",
      id_ae: (elemento != null) ? elemento.id_ae : this.ao.id_ae,
      id_estado: (elemento != null) ? elemento.id_estado : 1,
      id_organo: (elemento != null) ? elemento.id_organo : this.ao.id_organo,
      id_unidad_medida: (elemento != null) ? elemento.id_unidad_medida : this.ao.id_unidad_medida,
      trama_producto: (elemento != null) ? elemento.trama_producto : "",
      objetivo: (elemento != null) ? elemento.objetivo : '',
      atributo: (elemento != null) ? elemento.atributo : '',
      indicador: (elemento != null) ? elemento.indicador : '',
      formula: (elemento != null) ? elemento.formula : '',
      evidencia: (elemento != null) ? elemento.evidencia : '',
      producto: (elemento != null) ? elemento.producto : '',
      id_etapa: this.user.id_etapa,
      id_ciclo: this.user.id_ciclo,
    }

    this.lista_organo = [];
    this.organoService.getAllOrganoxAE(this.ao.id_ae).subscribe(res => {
      this.lista_organo = res;
      // console.log("this.lista_organo",res);

      this.lista_producto = null;
      this.productoService.getProductoxOrgano(this.ao.id_organo, this.ao.id_ae, this.ao.id, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
        this.lista_producto = res;
        // console.log("res",res);
        // console.log("this.ao.trama_producto",this.ao.trama_producto);
        if (this.ao.trama_producto.length > 0) {
          for (let i = 0; i < this.lista_producto["length"]; i++) {
            for (let j = 0; j < this.ao.trama_producto.split('|').length; j++) {
              if ((this.ao.trama_producto.split('|')[j].split('/')[0] == this.lista_producto[i].id)) {
                this.lista_producto[i].flag = 1;
              }
            }
          }
        }
      });
    });


  }

  guardarAO() {
    this.x_progreso = true;
    var trama_xml = "<producto>";
    for (let i = 0; i < this.lista_producto["length"]; i++) {
      trama_xml = trama_xml + "<r>";
      trama_xml = trama_xml + "<ID_PRODUCTO>" + this.lista_producto[i].id + "</ID_PRODUCTO>";
      trama_xml = trama_xml + "<FLAG>" + ((this.lista_producto[i].flag) ? 1 : 0) + "</FLAG>";
      trama_xml = trama_xml + "</r>";
    }
    trama_xml = trama_xml + "</producto>";
    this.ao.trama_producto = trama_xml;
    // console.log("producto",this.ao);

    var resultado = this.validacion();
    console.log('A_O', this.ao)
    if (resultado.length == 0) {
      this.actividadOperativaService.guardarActividadOperativa(this.ao).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
            this.closeModalAO.nativeElement.click();
            this.ao.id = 0;
            this.ao.id_ae = 0;
            this.getAllAO();
            this.x_progreso = false;
          } else if (res["id"] == null) {
            this.x_progreso = false;
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
        },
        err => {
          this.x_progreso = false;
          this.toastService.showError(
            "Se produjo un error en el servicio. Error: " + err.message,
            "Error"
          );
        }
      );
    } else {
      this.toastService.showError(
        "Se produjo un error en el servicio. Error: " + resultado,
        "Error");
      this.x_progreso = false;
    }
  }

  validacion() {
    var output = "";
    if (this.ao.descripcion.length > 400) {
      output = "Máximo contenido en Descripción es 400 caracteres, ahora estas cargando " +
        this.ao.descripcion.length + " caracteres";
      return output;
    }
    if (this.ao.codigo.length > 80) {
      output = "Máximo contenido en Nombre es 200 caracteres, ahora estas cargando " +
        this.ao.codigo.length + " caracteres";
      return output;
    }
    if (this.ao.id_ae == 0) {
      output = "Debe seleccionar una Acción";
      return output;
    }
    if (this.ao.id_organo == 0) {
      output = "Debe seleccionar un Organo";
      return output;
    }
    return output;
  }


}
