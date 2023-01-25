import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
//import readXlsxFile from 'read-excel-file';

import {ObjetivoEstrategicoService} from 'src/app/services/objetivo-estrategico.service';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {ObjetivoEstragicoInterface} from 'src/app/entities/objetivo-estrategico-interface';
import {AperturaService} from 'src/app/services/apertura-service';
import {AuthService} from 'src/app/services/auth.service';
import {OrganoService} from 'src/app/services/organo.service';

@Component({
  selector: 'app-objetivo-estrategico',
  templateUrl: './objetivo-estrategico.component.html',
  styleUrls: ['./objetivo-estrategico.component.css']
})
export class ObjetivoEstrategicoComponent implements OnInit {
  listaObjEstrategico: Object;
  lista_apertura: Object;
  lista_organo: Object;
  lista_logro: any;
  resultado_excel: Object;
  cantidad_lista: number;
  objEstrategico: ObjetivoEstragicoInterface;
  p: any;
  user: any;
  filtro_nombre: any;
  @ViewChild("closeModalOE", {static: false})
  closeModalOE: ElementRef;

  @ViewChild("closeModalLogro", {static: false})
  closeModalLogro: ElementRef;
  datoE: any;

  constructor(
    private objEstrategicoService: ObjetivoEstrategicoService,
    private organoService: OrganoService,
    private aperturaService: AperturaService,
    private toastService: ToastrServiceService,
    private authService: AuthService
  ) {
    this.objEstrategico = {
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
      id_apertura: 0,
      fecha_registro: "",
      usuario_registro: "",
      nombre_usuario: "",
      id_ciclo: 0,
      lista_logros: []
    };
  }


  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.objEstrategico.id_ciclo = this.user.id_ciclo;
    this.getAllObjetivoEstrategico();
    this.getAllApertura();
    this.getAllOrgano();
    //carga de atributo input File
    /*
    const input = document.getElementById('input');
    input.addEventListener('change', () => {
      readXlsxFile(input["files"][0]).then((rows) => {
        this.resultado_excel = rows;
      })
    });
    */
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
    });
  }

  getAllObjetivoEstrategico() {
    let idCiclo = 0;
    if (this.user.id_ciclo >= 161) {
      idCiclo = this.user.id_ciclo;
    }
    this.objEstrategicoService.getAllObjetivoEstrategico(idCiclo, this.user.id_apertura).subscribe(res => {
      this.listaObjEstrategico = res;
      this.cantidad_lista = res["length"];

      for (let i = 0; i < this.listaObjEstrategico["length"]; i++) {
        var array_logro = Array();
        var logros = this.listaObjEstrategico[i].trama_logros_oe;
        for (let j = 0; j < logros.split("|").length; j++) {
          array_logro.push({
            ID_OE: logros.split("|")[j].split("/")[0],
            ID_CICLO: logros.split("|")[j].split("/")[1],
            LOGRO_ANIO: logros.split("|")[j].split("/")[2],
            LOGRO_VALOR: logros.split("|")[j].split("/")[3]
          });
        }
        this.listaObjEstrategico[i].lista_logros = array_logro;
        this.lista_logro = array_logro;
      }
    });
  }

  getAllApertura() {
    this.aperturaService.getAllApertura().subscribe(res => {
      this.lista_apertura = res;
    });
  }

  getElemento(elemento) {
    this.objEstrategico = {
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
      id_apertura: (elemento != null) ? elemento.id_apertura : 0,
      fecha_registro: (elemento != null) ? elemento.fecha_registro : "",
      usuario_registro: (elemento != null) ? elemento.usuario_registro : this.user.codigo,
      nombre_usuario: (elemento != null) ? elemento.nombre_usuario : this.user.username,
      anio_base: (elemento != null) ? elemento.anio_base : 0,
      valor_base: (elemento != null) ? elemento.valor_base : 0,
      anio_actual: (elemento != null) ? elemento.anio_actual : 0,
      valor_actual: (elemento != null) ? elemento.valor_actual : 0,
    };
  }

  getLogroOE(elemento) {
    this.objEstrategico = {
      id: (elemento != null) ? elemento.id : 0,
      codigo: (elemento != null) ? elemento.codigo : "",
      descripcion: (elemento != null) ? elemento.descripcion : "",
      id_apertura: (elemento != null) ? elemento.id_apertura : 0,
      nombre_indicador: (elemento != null) ? elemento.nombre_indicador : ""
    }
    var array_logro = Array();
    for (let i = 0; i < elemento.lista_logros["length"]; i++) {
      array_logro.push({
        ID_OE: elemento.lista_logros[i].ID_OE,
        ID_CICLO: elemento.lista_logros[i].ID_CICLO,
        LOGRO_ANIO: elemento.lista_logros[i].LOGRO_ANIO,
        LOGRO_VALOR: elemento.lista_logros[i].LOGRO_VALOR
      });
    }
    this.lista_logro = array_logro;
  }

  guardarObjetivoEstrategico() {
    //console.log("registro",this.objEstrategico);
    var validacion = this.validarcampos();
    if (validacion.length == 0) {
      this.objEstrategico.id_ciclo = this.user.id_ciclo;

      console.log(this.objEstrategico);
      this.objEstrategicoService.guardarObjetivoEstrategico(this.objEstrategico).subscribe(
        res => {
          //console.log("resp", res);
          if (res["id"] != null) {
            this.toastService.showSuccess("Se agregó con éxito", "Correcto");
            this.closeModalOE.nativeElement.click();
            this.getAllObjetivoEstrategico();
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
    } else {
      this.toastService.showError(
        validacion,
        "Validación"
      );
    }
  }

  guardarLogrosOE() {
    var trama_logros_oe = "<logro_OE>";
    for (let i = 0; i < this.lista_logro["length"]; i++) {
      trama_logros_oe = trama_logros_oe + "<r>";
      trama_logros_oe = trama_logros_oe + "<ID_OE>" + this.lista_logro[i].ID_OE + "</ID_OE>";
      trama_logros_oe = trama_logros_oe + "<ID_CICLO>" + this.lista_logro[i].ID_CICLO + "</ID_CICLO>";
      trama_logros_oe = trama_logros_oe + "<LOGRO_ANIO>" + this.lista_logro[i].LOGRO_ANIO + "</LOGRO_ANIO>";
      trama_logros_oe = trama_logros_oe + "<LOGRO_VALOR>" + this.lista_logro[i].LOGRO_VALOR + "</LOGRO_VALOR>";
      trama_logros_oe = trama_logros_oe + "</r>";
    }
    trama_logros_oe = trama_logros_oe + "</logro_OE>";
    this.objEstrategico.trama_logros_oe = trama_logros_oe;
    //console.log(this.objEstrategico);
    this.objEstrategicoService.guardarLogrosOE(this.objEstrategico).subscribe(
      res => {
        if (res["id"] != null) {
          this.toastService.showSuccess("Se guardaron los logros", "Correcto");
          this.closeModalLogro.nativeElement.click();
          this.getAllObjetivoEstrategico();
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
    if (this.objEstrategico.metodo_calculo.length > 4000) {
      output = "Máximo contenido en Metodo de Calculo es 4000 caracteres, ahora estas cargando " +
        this.objEstrategico.metodo_calculo.length + " caracteres";
      return output;
    }
    if (this.objEstrategico.justificacion.length > 4000) {
      output = "Máximo contenido en Justifiación es 4000 caracteres, ahora estas cargando " +
        this.objEstrategico.justificacion.length + " caracteres";
      return output;
    }
    if (this.objEstrategico.nombre_indicador.length > 800) {
      output = "Máximo contenido en Nombre del Indicador es 800 caracteres, ahora estas cargando " +
        this.objEstrategico.nombre_indicador.length + " caracteres";
      return output;
    }
    if (this.objEstrategico.fuentes_datos.length > 400) {
      output = "Máximo contenido en Fuente de Datos es 400 caracteres, ahora estas cargando " +
        this.objEstrategico.fuentes_datos.length + " caracteres";
      return output;
    }
    return output;
  }

}
