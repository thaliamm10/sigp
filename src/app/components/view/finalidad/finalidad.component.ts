import {ActivatedRoute} from '@angular/router';
import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {UGPInterface} from 'src/app/entities/ugp-interface';
import {FinInterface} from 'src/app/entities/fin-interface';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {ObjetivoEstrategicoService} from 'src/app/services/objetivo-estrategico.service';
import {AuthService} from 'src/app/services/auth.service';
import {FinalidadService} from 'src/app/services/fin_ugp.service';

@Component({
  selector: 'app-finalidad',
  templateUrl: './finalidad.component.html',
  styleUrls: ['./finalidad.component.css']
})
export class FinalidadComponent implements OnInit {
  ugp: UGPInterface;
  fin: FinInterface;
  lista_objetivo: Object;
  lista_fin: Object;
  lista_finOE: any;
  arrayAnios: any;
  user: any;
  x_progreso: boolean;
  p: any;
  @ViewChild("closeModalFinalidad", {static: false})
  closeModalFinalidad: ElementRef;

  constructor(
    public activateRoute: ActivatedRoute,
    private objEstrategicos: ObjetivoEstrategicoService,
    private toastService: ToastrServiceService,
    private finalidadService: FinalidadService,
    private authService: AuthService
  ) {
    this.ugp = {
      id: this.activateRoute.snapshot.params["id"]
    };
    this.fin = {
      descripcion: ""
    }
  }

  select(elemento) {
    elemento.flag = !elemento.flag;
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getFinalidadUGP();
    this.getAllOE();
    this.getAllOExFin();
  }

  getFinalidadUGP() {
    this.finalidadService.getFinxUGP(this.ugp.id).subscribe(res => {
      this.lista_fin = res;
      if (res["length"] > 0) {
        this.fin = this.lista_fin[0];
      }
    });
  }

  getAllOE() {
    this.objEstrategicos.getObjetivoEstrategicoxFin(this.ugp.id).subscribe(res => {
      this.lista_objetivo = res;
      //console.log("lista_objetivo",res);
    });
  }

  getAllOExFin() {
    this.objEstrategicos.getOExFin(this.ugp.id, this.user.id_apertura).subscribe(res => {
      console.log(':( muy mal')
      this.lista_finOE = res;
      //console.log("lista_finOE",res);
      for (let i = 0; i < this.lista_finOE["length"]; i++) {
        var array_logro = Array();
        var logros = this.lista_finOE[i].trama_logros_oe;
        for (let j = 0; j < logros.split("|").length; j++) {
          array_logro.push({
            ID_OE: logros.split("|")[j].split("/")[0],
            ID_CICLO: logros.split("|")[j].split("/")[1],
            LOGRO_ANIO: logros.split("|")[j].split("/")[2],
            LOGRO_VALOR: logros.split("|")[j].split("/")[3]
          });
        }
        this.lista_finOE[i].lista_logros = array_logro;
        this.arrayAnios = array_logro;
      }
    });
  }

  guardarFinOE() {

    this.x_progreso = true;
    var trama_xml = "<FIN_OE>";
    for (let i = 0; i < this.lista_objetivo["length"]; i++) {
      trama_xml = trama_xml + "<r>";
      trama_xml = trama_xml + "<ID_OE>" + this.lista_objetivo[i].id + "</ID_OE>";
      trama_xml = trama_xml + "<FLAG>" + ((this.lista_objetivo[i].flag) ? 1 : 0) + "</FLAG>";
      trama_xml = trama_xml + "</r>";
    }
    trama_xml = trama_xml + "</FIN_OE>";
    this.fin.trama_oe = trama_xml;
    //console.log("fin",this.fin);

    var resultado = this.validacion();
    if (resultado.length == 0) {
      this.objEstrategicos.guardarObjetivoEstrategicoxFin(this.fin).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardo con éxito", "Correcto");
            this.closeModalFinalidad.nativeElement.click();
            //setInterval(function myfun() {console.log("ok")},5000);
            window.location.reload();
            //this.getAllOExFin();
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
    }
  }

  validacion() {
    var output = "";
    if (this.fin.descripcion.length > 400) {
      output = "Máximo contenido en Descripción es 400 caracteres, ahora estas cargando " +
        this.fin.descripcion.length + " caracteres";
      return output;
    }
    return output;
  }

}
