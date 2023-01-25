import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import readXlsxFile from 'read-excel-file';

import {AccionEstrategicaInterface} from 'src/app/entities/accion-estrategica-interface';
import {AccionEstrategicaService} from 'src/app/services/accion-estrategica.service';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {ObjetivoEstrategicoService} from 'src/app/services/objetivo-estrategico.service';
import {AuthService} from 'src/app/services/auth.service';
import {OrganoService} from 'src/app/services/organo.service';
import {ExcelServicesService} from "../../../services/excel-services.service";

@Component({
  selector: 'app-accion-estrategica',
  templateUrl: './accion-estrategica.component.html',
  styleUrls: ['./accion-estrategica.component.css']
})
export class AccionEstrategicaComponent implements OnInit {
  listaAcciones: Object;
  lista_oe: Object;
  lista_organo: Object;
  lista_logro: any;
  accionEstrategica: AccionEstrategicaInterface;
  resultado_excel: Object;
  listaObjEstrategico: Object;
  cantidad_lista: number;
  filtro_nombre: string;
  p: any;
  user: any;
  @ViewChild("closeModalAE", {static: false})
  closeModalAE: ElementRef;
  @ViewChild("closeModalLogro", {static: false})
  closeModalLogro: ElementRef;
  datoE: any;

  constructor(
    private accionEstrategicaService: AccionEstrategicaService,
    private toastService: ToastrServiceService,
    private objEstrategicoService: ObjetivoEstrategicoService,
    private authService: AuthService,
    private organoService: OrganoService,
    private excelService: ExcelServicesService,
  ) {
    this.accionEstrategica = {
      id: 0,
      codigo: "",
      descripcion: "",
      nombre_indicador: "",
      justificacion: "",
      limitacion: "",
      metodo_calculo: "",
      parametro_medicion: "",
      sentido_esperado: "",
      fuentes_datos: "",
      id_estado: 1,
      id_organo: 0,
      id_oe: 0,
      fecha_registro: "",
      usuario_registro: "",
      nombre_usuario: "",
      lista_logros: [],
      objetivo: "",
      producto: "",
      atributo: "",
      evidencia: "",
      indicador: "",
    };
    this.filtro_nombre = "";
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllAccionEstrategica();
    this.getAllObjetivoEstrategico();
    this.getAllOrgano();
  }


  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
    });
  }

  getAllObjetivoEstrategico() {
    this.objEstrategicoService.getAllObjetivoEstrategico(this.user.id_ciclo, this.user.id_apertura).subscribe(res => {
      this.lista_oe = res;
    });
  }

  getAllAccionEstrategica() {
    this.accionEstrategicaService.getAllAccionEstrategica(this.user.id_apertura, this.user.id_ciclo).subscribe(res => {
      this.listaAcciones = res;
      this.cantidad_lista = res["length"];

      for (let i = 0; i < this.listaAcciones["length"]; i++) {
        var array_logro = Array();
        var logros = this.listaAcciones[i].trama_logros_ae;
        for (let j = 0; j < logros.split("|").length; j++) {
          array_logro.push({
            ID_AE: logros.split("|")[j].split("/")[0],
            ID_CICLO: logros.split("|")[j].split("/")[1],
            LOGRO_ANIO: logros.split("|")[j].split("/")[2],
            LOGRO_VALOR: logros.split("|")[j].split("/")[3]
          });
        }
        this.listaAcciones[i].lista_logros = array_logro;
        this.lista_logro = array_logro;
      }
    });
  }

  getElemento(elemento) {
    this.accionEstrategica = {
      id: (elemento != null) ? elemento.id : 0,
      codigo: (elemento != null) ? elemento.codigo : "",
      descripcion: (elemento != null) ? elemento.descripcion : "",
      nombre_indicador: (elemento != null) ? elemento.nombre_indicador : "",
      justificacion: (elemento != null) ? elemento.justificacion : "",
      limitacion: (elemento != null) ? elemento.limitacion : "",
      metodo_calculo: (elemento != null) ? elemento.metodo_calculo : "",
      parametro_medicion: (elemento != null) ? elemento.parametro_medicion : "",
      sentido_esperado: (elemento != null) ? elemento.sentido_esperado : "",
      fuentes_datos: (elemento != null) ? elemento.fuentes_datos : "",
      id_estado: (elemento != null) ? elemento.id_estado : 1,
      id_organo: (elemento != null) ? elemento.id_organo : 0,
      id_oe: (elemento != null) ? elemento.id_oe : 0,
      fecha_registro: (elemento != null) ? elemento.fecha_registro : "",
      usuario_registro: (elemento != null) ? elemento.usuario_registro : this.user.codigo,
      nombre_usuario: (elemento != null) ? elemento.nombre_usuario : this.user.username,
      anio_base: (elemento != null) ? elemento.anio_base : 0,
      valor_base: (elemento != null) ? elemento.valor_base : 0,
      anio_actual: (elemento != null) ? elemento.anio_actual : 0,
      valor_actual: (elemento != null) ? elemento.valor_actual : 0,
      objetivo: (elemento != null) ? elemento.objetivo : '',
      producto: (elemento != null) ? elemento.producto : '',
      atributo: (elemento != null) ? elemento.atributo : '',
      evidencia: (elemento != null) ? elemento.evidencia : '',
      indicador: (elemento != null) ? elemento.indicador : '',
    };
  }

  getLogroAE(elemento) {
    this.accionEstrategica = {
      id: (elemento != null) ? elemento.id : 0,
      codigo: (elemento != null) ? elemento.codigo : "",
      descripcion: (elemento != null) ? elemento.descripcion : "",
      id_oe: (elemento != null) ? elemento.id_oe : 0,
      nombre_indicador: (elemento != null) ? elemento.nombre_indicador : ""
    }
    var array_logro = Array();
    for (let i = 0; i < elemento.lista_logros["length"]; i++) {
      array_logro.push({
        ID_AE: elemento.lista_logros[i].ID_AE,
        ID_CICLO: elemento.lista_logros[i].ID_CICLO,
        LOGRO_ANIO: elemento.lista_logros[i].LOGRO_ANIO,
        LOGRO_VALOR: elemento.lista_logros[i].LOGRO_VALOR
      });
    }
    this.lista_logro = array_logro;

  }

  guardarAccionEstrategica() {
    var validacion = this.validarcampos();
    if (validacion.length == 0) {
      console.log("AE", this.accionEstrategica);
      this.accionEstrategicaService
        .guardarAccionEstrategica(this.accionEstrategica)
        .subscribe(
          res => {
            this.toastService.showSuccess("Se agregó con éxito", "Correcto");
            this.getAllAccionEstrategica();
            this.closeModalAE.nativeElement.click();
            // console.log("resp", res);
            // if (res["id"] != null) {
            //   this.toastService.showSuccess("Se agregó con éxito", "Correcto");
            //   this.getAllAccionEstrategica();
            //   this.closeModalAE.nativeElement.click();
            // } else if (res["id"] == null) {
            //   this.toastService.showError(
            //     "Se produjo un error al guardar.",
            //     "Error"
            //   );
            // }
          },
          err => {
            this.toastService.showError(
              "Se produjo un error en el servicio. Error: " + err.message,
              "Error"
            );
          }
        );
    } else {
      this.toastService.showError(
        validacion,
        "Validación"
      );
    }
  }

  guardarLogrosAE() {
    var trama_logros_ae = "<logro_AE>";
    for (let i = 0; i < this.lista_logro["length"]; i++) {
      trama_logros_ae = trama_logros_ae + "<r>";
      trama_logros_ae = trama_logros_ae + "<ID_AE>" + this.lista_logro[i].ID_AE + "</ID_AE>";
      trama_logros_ae = trama_logros_ae + "<ID_CICLO>" + this.lista_logro[i].ID_CICLO + "</ID_CICLO>";
      trama_logros_ae = trama_logros_ae + "<LOGRO_ANIO>" + this.lista_logro[i].LOGRO_ANIO + "</LOGRO_ANIO>";
      trama_logros_ae = trama_logros_ae + "<LOGRO_VALOR>" + this.lista_logro[i].LOGRO_VALOR + "</LOGRO_VALOR>";
      trama_logros_ae = trama_logros_ae + "</r>";
    }
    trama_logros_ae = trama_logros_ae + "</logro_AE>";
    this.accionEstrategica.trama_logros_ae = trama_logros_ae;
    //console.log(this.objEstrategico);
    this.accionEstrategicaService.guardarLogrosAE(this.accionEstrategica).subscribe(
      res => {
        if (res["id"] != null) {
          this.toastService.showSuccess("Se guardaron los logros", "Correcto");
          this.closeModalLogro.nativeElement.click();
          this.getAllAccionEstrategica();
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

  validarcampos() {
    var output = "";
    if (this.accionEstrategica.metodo_calculo.length > 4000) {
      output = "Máximo contenido en Metodo de Calculo es 4000 caracteres, ahora estas cargando " +
        this.accionEstrategica.metodo_calculo.length + " caracteres";
      return output;
    }
    if (this.accionEstrategica.justificacion.length > 4000) {
      output = "Máximo contenido en Justifiación es 4000 caracteres, ahora estas cargando " +
        this.accionEstrategica.justificacion.length + " caracteres";
      return output;
    }
    if (this.accionEstrategica.nombre_indicador.length > 800) {
      output = "Máximo contenido en Nombre del Indicador es 800 caracteres, ahora estas cargando " +
        this.accionEstrategica.nombre_indicador.length + " caracteres";
      return output;
    }
    if (this.accionEstrategica.fuentes_datos.length > 400) {
      output = "Máximo contenido en Fuente de Datos es 400 caracteres, ahora estas cargando " +
        this.accionEstrategica.fuentes_datos.length + " caracteres";
      return output;
    }
    return output;
  }


}
