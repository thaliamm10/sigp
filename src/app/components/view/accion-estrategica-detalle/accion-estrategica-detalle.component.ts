import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccionEstrategicaInterface} from 'src/app/entities/accion-estrategica-interface';
import {IndicadoresPeiInterface} from 'src/app/entities/indicadores-pei-interface';
import {ObjetivoEstrategicoService} from 'src/app/services/objetivo-estrategico.service';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {IndicadoresAccionEstrategicaService} from 'src/app/services/indicadores-accion-estrategica.service';
import {OrganoService} from 'src/app/services/organo.service';
import {AccionEstrategicaService} from 'src/app/services/accion-estrategica.service';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-accion-estrategica-detalle',
  templateUrl: './accion-estrategica-detalle.component.html',
  styleUrls: ['./accion-estrategica-detalle.component.css']
})
export class AccionEstrategicaDetalleComponent implements OnInit {
  @ViewChild("editarIndicadoresAE", {static: false}) editarIndicadoresAE: ElementRef;
  @ViewChild("agregarIndicadoresAE", {static: false}) agregarIndicadoresAE: ElementRef;
  accionEstrategica: AccionEstrategicaInterface;
  indicador: IndicadoresPeiInterface;
  indicador_editar: IndicadoresPeiInterface;
  indicadoresxAE: Object;
  listaOrganos: Object;
  listaObjEstrategico: Object;
  indicadorNuevo: IndicadoresPeiInterface;
  user: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private objEstrategicoService: ObjetivoEstrategicoService,
    private toastService: ToastrServiceService,
    private indicadoresAEService: IndicadoresAccionEstrategicaService,
    private organoService: OrganoService,
    private accionEstrategicaService: AccionEstrategicaService,
    private authService: AuthService,
  ) {
    this.accionEstrategica = {
      codigo: "",
      descripcion: "",
      id_oe: null,
      id_estado: 1,
      id: 0
    };


    this.indicador_editar = {
      anio_actual: null,
      anio_base: null,
      id_ae: "",
      id_organo: null,
      metodo_calculo: "",
      nombre: "",
      valor_actual: null,
      valor_base: null
    };
    //this.accionEstrategica.id_ae = this.activateRoute.snapshot.params["id_ae"];
    //console.log("ID_AE", this.accionEstrategica.id_ae);
    //this.indicadorNuevo.id_ae = this.accionEstrategica.id_ae;
  }

  ngOnInit() {
    this.getAllOrgano();
    //this.getAllAccionesEstrategicasxId(this.accionEstrategica.id_ae);
    //this.getAllIndicadoresxAE(this.accionEstrategica.id_ae);
    this.user = this.authService.getUserLoggedIn();
    this.getAllObjetivoEstrategico();
  }


  limpiarCampos() {
  }

  public validarSoloNumeros(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getAllObjetivoEstrategico() {
    this.objEstrategicoService.getAllObjetivoEstrategico(this.user.id_ciclo, this.user.id_apertura).subscribe(res => {
      this.listaObjEstrategico = res;
    });
  }

  getAllAccionesEstrategicasxId(id) {
    this.accionEstrategicaService
      .getAllAccionEstrategicaxId(id)
      .subscribe(res => {
        this.accionEstrategica = res[0];
        // console.log(res);
      });
  }

  editarAccionEstrategica() {
    // console.log(this.accionEstrategica);
    let accion = {
      id: this.accionEstrategica["id_ae"],
      codigo: this.accionEstrategica["codigo_ae"],
      descripcion: this.accionEstrategica["nombre_ae"],
      estado: 1,
      id_oe: this.accionEstrategica["id_oe"]
    };
    this.accionEstrategicaService.editarAccionEstrategica(accion).subscribe(
      res => {
        // console.log("resp", res);
        if (res["id"] != null) {
          this.toastService.showSuccess("Se modificó con éxito", "Correcto");
          //this.getAllAccionesEstrategicasxId(this.accionEstrategica.id_ae);
        } else if (res["id"] == null) {
          this.toastService.showError(
            "Se produjo un error al guardar.",
            "Error"
          );
        }
      },
      err => {
        this.toastService.showError(
          "Se produjo un error en el servicio. Error: " + err,
          "Error"
        );
      }
    );
  }

  getAllIndicadoresxAE(id_ae) {
    this.indicadoresAEService.getAllIndicadoresAE(id_ae).subscribe(res => {
      this.indicadoresxAE = res;
    });
  }

  guardarIndicador() {
    // console.log("esto es el indicador", this.accionEstrategica);
    this.indicadoresAEService
      .guardarIndicadoresAE(this.indicadorNuevo)
      .subscribe(
        res => {
          // console.log("resp", res);
          this.indicadorNuevo = {
            anio_actual: null,
            anio_base: null,
            id_organo: null,
            metodo_calculo: "",
            nombre: "",
            valor_actual: null,
            valor_base: null
          };
          if (res["id"] != null) {
            this.toastService.showSuccess("Se agregó con éxito", "Correcto");
            //this.getAllIndicadoresxAE(this.accionEstrategica.id_ae);
            //this.limpiarCampos();
          } else if (res["id"] == null) {
            this.toastService.showError(
              "Se produjo un error al guardar.",
              "Error"
            );
          }
        },
        err => {
          this.toastService.showError(
            "Se produjo un error en el servicio. Error: " + err,
            "Error"
          );
        }
      );
  }

  eliminarIndicador(indicador) {
    // console.log(indicador);
    let data = {id: indicador};
    this.indicadoresAEService.eliminarIndicadoresAE(data).subscribe(
      res => {
        // console.log("resp", res);
        if (res["id"] != null) {
          this.toastService.showSuccess("Se eliminó con éxito", "Correcto");
          //this.getAllIndicadoresxAE(this.accionEstrategica.id_ae);
        } else if (res["id"] == null) {
          this.toastService.showError(
            "Se produjo un error al guardar.",
            "Error"
          );
        }
      },
      err => {
        this.toastService.showError(
          "Se produjo un error en el servicio. Error: " + err,
          "Error"
        );
      }
    );
  }

  editarIndicador() {
    // console.log(this.indicador_editar);
    this.indicadoresAEService
      .editarIndicadoresAE(this.indicador_editar)
      .subscribe(
        res => {
          // console.log("resp", res);
          if (res["id"] != null) {
            this.toastService.showSuccess("Se modificó con éxito", "Correcto");
            this.limpiarCampos();
            //this.getAllIndicadoresxAE(this.accionEstrategica.id_ae);
          } else if (res["id"] == null) {
            this.toastService.showError(
              "Se produjo un error al guardar.",
              "Error"
            );
          }
        },
        err => {
          this.toastService.showError(
            "Se produjo un error en el servicio. Error: " + err,
            "Error"
          );
        }
      );
  }

  getIndicador(indicador) {
    this.indicador_editar = indicador;
    // console.log(indicador);
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.listaOrganos = res;
    });
  }

}
