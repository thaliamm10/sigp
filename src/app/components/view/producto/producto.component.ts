import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UGPInterface} from 'src/app/entities/ugp-interface';
import {ProductoInterface} from 'src/app/entities/producto-interface';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {AccionEstrategicaService} from 'src/app/services/accion-estrategica.service';
import {UnidadMedidaService} from 'src/app/services/unidad-medida.service';
import {ProductoService} from 'src/app/services/producto.service';
import {ActividadOperativaInterface} from 'src/app/entities/actividad-operativa-interface';
import {DefinicionProductoInterface} from 'src/app/entities/definicion-producto-interface';
import {ProcesoService} from 'src/app/services/proceso.service';
import {AuthService} from 'src/app/services/auth.service';
import {ExcelServicesService} from 'src/app/services/excel-services.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  ugp: UGPInterface;
  producto: ProductoInterface;
  actividadOperativa: Object;
  lista_um: Object;
  lista_producto: any = Array();
  lista_accion: Object;
  actividad: ActividadOperativaInterface;
  definicionProducto: DefinicionProductoInterface;
  @ViewChild("closeModalProducto", {static: false})
  closeModalProducto: ElementRef;
  lista_proceso: any = Array();
  x_progreso: boolean;
  user: any;
  cantidad_lista: number;

  constructor(
    public activateRoute: ActivatedRoute,
    private toastService: ToastrServiceService,
    private unidadMedidaService: UnidadMedidaService,
    private productoService: ProductoService,
    private procesoService: ProcesoService,
    private authService: AuthService,
    private accionEstrategica: AccionEstrategicaService,
    private excelService: ExcelServicesService,
    private http: HttpClient
  ) {
    this.ugp = {
      id: this.activateRoute.snapshot.params["id"]
    };
    this.cantidad_lista = 0;
    this.producto = {
      id_ugp: this.ugp.id
    };
  }

  excel = [];

  exportAsXLSX(): void {
    this.lista_producto.forEach(row => {
      let data = {
        PRODUCTO: row.nombre,
        INDICADOR: row.indicador,
        PROCESO: row.nombre_proceso,
        UNIDAD_MEDIDA: row.nombre_unidad_medida
      }
      this.excel.push(data);
    });
    this.excelService.exportAsExcelFile(this.excel, 'productos');
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.lista_producto = null;
    this.getAllProducto();
    this.getAllUnidadMedida();
    this.getAllProcesos();
    this.getAllAExProposito();
  }

  getAllProcesos() {
    this.procesoService.getAllProcesos().subscribe(res => {
      this.lista_proceso = res;
    });
  }

  getAllAExProposito() {
    this.accionEstrategica.getAExProposito(this.ugp.id, this.user.id_apertura).subscribe(res => {
      this.lista_accion = res;
    });
  }

  getElemento(elemento) {
    //console.log("este es el elemento",elemento);
    this.producto = {
      id: (elemento != null) ? elemento.id : 0,
      nombre: (elemento != null) ? elemento.nombre : "",
      descripcion: (elemento != null) ? elemento.nombre_proceso : "",
      indicador: (elemento != null) ? elemento.indicador : "",
      id_proceso: (elemento != null) ? elemento.id_proceso : 0,
      id_estado: (elemento != null) ? elemento.id_estado : 1,
      usuario_registro: (elemento != null) ? elemento.usuario_registro : this.user.codigo,
      nombre_usuario: (elemento != null) ? elemento.nombre_usuario : this.user.username,
      id_ugp: (elemento != null) ? elemento.nombre_usuario : this.ugp.id,
      id_unidad_medida: (elemento != null) ? elemento.id_unidad_medida : 0,
      trama_ae: (elemento != null) ? elemento.trama_ae : ""
    }
    //this.producto.descripcion = elemento.nombre_proceso;

    this.lista_accion = null;
    this.accionEstrategica.getAExProposito(this.ugp.id, this.user.id_apertura).subscribe(res => {
      this.lista_accion = res;

      if (this.producto.trama_ae != null) {
        if (this.producto.trama_ae.length > 0) {
          for (let i = 0; i < this.lista_accion["length"]; i++) {
            for (let j = 0; j < this.producto.trama_ae.split('|').length; j++) {
              if ((this.producto.trama_ae.split('|')[j].split('/')[0] == this.lista_accion[i].id)) {
                this.lista_accion[i].flag = 1;
              }
            }
          }
        }
      }

    });


  }

  public validarSoloNumeros(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getAllUnidadMedida() {
    this.unidadMedidaService.getAllUnidadMedida().subscribe(res => {
      this.lista_um = res;
    });
  }

  getAllProducto() {
    this.productoService.getProductoxUGP(this.ugp.id).subscribe(res => {
      this.lista_producto = res;
      this.cantidad_lista = res["length"];
    });
  }

  selectProceso(elemento) {
    this.producto.id_proceso = elemento.id;
    this.producto.descripcion = elemento.codigo + ": " + elemento.nombre;
  }

  selectAccion(elemento) {
    elemento.flag = !elemento.flag;
  }

  guardarProducto() {
    this.x_progreso = true;
    var trama_xml = "<PRODUCTO_AE>";
    for (let i = 0; i < this.lista_accion["length"]; i++) {
      trama_xml = trama_xml + "<r>";
      trama_xml = trama_xml + "<ID_AE>" + this.lista_accion[i].id + "</ID_AE>";
      trama_xml = trama_xml + "<FLAG>" + ((this.lista_accion[i].flag) ? 1 : 0) + "</FLAG>";
      trama_xml = trama_xml + "</r>";
    }
    trama_xml = trama_xml + "</PRODUCTO_AE>";
    this.producto.trama_ae = trama_xml;
    // console.log("producto",this.producto);

    var resultado = this.validacion();
    if (resultado.length == 0) {
      this.productoService.guardarProducto(this.producto).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
            this.closeModalProducto.nativeElement.click();
            window.location.reload();
            //this.getAllProducto();
            //this.x_progreso = false;
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
        "Error"
      );
      this.x_progreso = false;
    }
  }

  validacion() {
    var output = "";
    if (this.producto.descripcion.length > 400) {
      output = "Máximo contenido en Descripción es 400 caracteres, ahora estas cargando " +
        this.producto.descripcion.length + " caracteres";
      return output;
    }
    if (this.producto.nombre.length > 400) {
      output = "Máximo contenido en Nombre es 200 caracteres, ahora estas cargando " +
        this.producto.descripcion.length + " caracteres";
      return output;
    }
    if (this.producto.id_proceso == 0) {
      output = "Debe seleccionar un Proceso";
      return output;
    }
    return output;
  }

  getProducto(elemento) {
    this.producto = elemento;
  }


  guardarDefinicionProducto() {
    // console.log("Antes de enviar", this.definicionProducto);
    if (this.definicionProducto.id_definicion == 0) {
      this.productoService
        .guardarDefinicionProductoxUGP(this.definicionProducto)
        .subscribe(res => {
          this.toastService.showSuccess(
            "Se guardó la definición y criterios de programación."
          );
          this.getAllProducto();
        });
    } else if (this.definicionProducto.id_definicion != 0) {
      this.productoService
        .editarDefinicionProductoxUGP(this.definicionProducto)
        .subscribe(res => {
          this.toastService.showSuccess(
            "Se editó la definición y criterios de programación."
          );
          this.getAllProducto();
        });
    }
  }

}
