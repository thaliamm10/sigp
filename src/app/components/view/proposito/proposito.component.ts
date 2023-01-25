import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {PropositoInterface} from 'src/app/entities/proposito-interface';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {PropositoService} from 'src/app/services/proposito.service';
import {AccionEstrategicaService} from 'src/app/services/accion-estrategica.service';
import {UGPInterface} from 'src/app/entities/ugp-interface';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-proposito',
  templateUrl: './proposito.component.html',
  styleUrls: ['./proposito.component.css']
})
export class PropositoComponent implements OnInit {
  ugp: UGPInterface;
  proposito: PropositoInterface;
  lista_accion: Object;
  lista_proposito: Object;
  lista_propositoAE: any = new Array();
  user: any;
  x_progreso: boolean;
  @ViewChild("closeModalProposito", {static: false})
  closeModalProposito: ElementRef;
  p: any;
  filtro_nombre: any;
  arrayAnios: any;

  constructor(
    public activateRoute: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastrServiceService,
    private propositoService: PropositoService,
    private accionEstrategica: AccionEstrategicaService
  ) {
    this.ugp = {
      id: this.activateRoute.snapshot.params["id"]
    };
    this.proposito = {
      descripcion: "",
      id_ugp: this.ugp.id
    };
  }

  select(elemento) {
    elemento.flag = !elemento.flag;
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getPropositoUGP();
    this.getAllAE();
    this.getAllAExProposito();
  }

  getPropositoUGP() {
    this.propositoService.getPropositoxUGP(this.ugp.id).subscribe(res => {
      this.lista_proposito = res;
      //console.log("res",res);
      if (res["length"] > 0) {
        this.proposito = this.lista_proposito[0];
      }
    });
  }

  getAllAE() {
    //console.log("ugp",this.ugp);
    this.accionEstrategica.getAllAccionEstrategicaxProposito(this.ugp.id).subscribe(res => {
      this.lista_accion = res;
      //console.log("lista_accion",res);
    });
  }

  getAllAExProposito() {
    this.accionEstrategica.getAExProposito(this.ugp.id, this.user.id_apertura).subscribe(res => {
      this.lista_propositoAE = res;
      //console.log("lista_propositoAE",res);
      for (let i = 0; i < this.lista_propositoAE["length"]; i++) {
        var array_logro = Array();
        var logros = this.lista_propositoAE[i].trama_logros_ae;
        for (let j = 0; j < logros.split("|").length; j++) {
          array_logro.push({
            ID_AE: logros.split("|")[j].split("/")[0],
            ID_CICLO: logros.split("|")[j].split("/")[1],
            LOGRO_ANIO: logros.split("|")[j].split("/")[2],
            LOGRO_VALOR: logros.split("|")[j].split("/")[3]
          });
        }
        this.lista_propositoAE[i].lista_logros = array_logro;
        this.arrayAnios = array_logro;
      }
    });
  }

  guardarPropositoAE() {

    this.x_progreso = true;
    var trama_xml = "<PROPOSITO_AE>";
    for (let i = 0; i < this.lista_accion["length"]; i++) {
      trama_xml = trama_xml + "<r>";
      trama_xml = trama_xml + "<ID_AE>" + this.lista_accion[i].id + "</ID_AE>";
      trama_xml = trama_xml + "<FLAG>" + ((this.lista_accion[i].flag) ? 1 : 0) + "</FLAG>";
      trama_xml = trama_xml + "</r>";
    }
    trama_xml = trama_xml + "</PROPOSITO_AE>";
    this.proposito.trama_ae = trama_xml;
    //console.log("proposito",this.proposito);

    var resultado = this.validacion();
    if (resultado.length == 0) {
      this.accionEstrategica.guardarAccionEstrategicaxProposito(this.proposito).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardo con éxito", "Correcto");
            this.closeModalProposito.nativeElement.click();
            window.location.reload();
            //this.getAllAExProposito();
            //this.x_progreso = false;
          } else if (res["id"] == null) {
            this.x_progreso = false;
            this.toastService.showError(
              "Se produjo un error al guardar.",
              "Error"
            );
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
    }
  }

  validacion() {
    var output = "";
    if (this.proposito.descripcion.length > 400) {
      output = "Máximo contenido en Descripción es 400 caracteres, ahora estas cargando " +
        this.proposito.descripcion.length + " caracteres";
      return output;
    }
    if (this.proposito.entregable.length > 400) {
      output = "Máximo contenido en Entregable es 400 caracteres, ahora estas cargando " +
        this.proposito.entregable.length + " caracteres";
      return output;
    }
    return output;
  }

}
