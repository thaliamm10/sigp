import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjetivoEstragicoInterface } from 'src/app/entities/objetivo-estrategico-interface';
import { IndicadoresPeiInterface } from 'src/app/entities/indicadores-pei-interface';
import { ObjetivoEstrategicoService } from 'src/app/services/objetivo-estrategico.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { IndicadoresObjEstrategicoService } from 'src/app/services/indicadores-obj-estrategico.service';
import { OrganoService } from 'src/app/services/organo.service';


@Component({
  selector: 'app-objetivo-estrategico-detalle',
  templateUrl: './objetivo-estrategico-detalle.component.html',
  styleUrls: ['./objetivo-estrategico-detalle.component.css']
})
export class ObjetivoEstrategicoDetalleComponent implements OnInit {
  @ViewChild("editarIndicadores", {static: false}) editarIndicadores: ElementRef;
  @ViewChild("agregarIndicadores", {static: false}) agregarIndicadores: ElementRef;
  objEstrategico: ObjetivoEstragicoInterface;
  indicador: IndicadoresPeiInterface;
  indicadoresxOE: Object;
  listaOrganos: Object;
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private objEstrategicoService: ObjetivoEstrategicoService,
    private toastService: ToastrServiceService,
    private indicadoresOEService: IndicadoresObjEstrategicoService,
    private organoService: OrganoService
  ) { 
    this.objEstrategico = {
      codigo: "",
      descripcion: "",
      id_apertura: 0,
      id: 0,
      id_estado: 1
    };
    this.limpiarCampos();
    //this.objEstrategico.id_oe = this.activateRoute.snapshot.params["id_oe"];
    //console.log("ID_OE", this.objEstrategico.id_oe);
    //this.indicador.id_oe = this.objEstrategico.id_oe;
  }

  
  ngOnInit() {
    //this.getAllObjEstrategicoxId(this.objEstrategico.id_oe);
    //this.getAllIndicadoresxOE(this.objEstrategico.id_oe);
    this.getAllOrgano();
  }


  public validarSoloNumeros(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getAllObjEstrategicoxId(id) {
    this.objEstrategicoService
      .getAllObjetivoEstrategicoxId(id)
      .subscribe(res => {
        this.objEstrategico = res[0];
        // console.log(res);
      });
  }

  editarObjEstrategico() {
    // console.log(this.objEstrategico);
    let objetivo = {
      id: this.objEstrategico["id_oe"],
      codigo: this.objEstrategico["codigo_oe"],
      descripcion: this.objEstrategico["nombre_oe"],
      estado: 1
    };
    this.objEstrategicoService.editarObjetivoEstrategico(objetivo).subscribe(
      res => {
        // console.log("resp", res);
        if (res["id"] != null) {
          this.toastService.showSuccess("Se modificó con éxito", "Correcto");
          //this.getAllObjEstrategicoxId(this.objEstrategico.id_oe);
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

  getAllIndicadoresxOE(id_oe) {
    this.indicadoresOEService.getAllIndicadoresOE(id_oe).subscribe(res => {
      this.indicadoresxOE = res;
    });
  }

  guardarIndicador() {
    // console.log(this.indicador);
    this.indicadoresOEService.guardarIndicadoresOE(this.indicador).subscribe(
      res => {
        // console.log("resp", res);
        if (res["id"] != null) {
          this.toastService.showSuccess("Se agregó con éxito", "Correcto");
          this.limpiarCampos();
          //this.getAllIndicadoresxOE(this.objEstrategico.id_oe);
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
    let data = { id: indicador };
    this.indicadoresOEService.eliminarIndicadoresOE(data).subscribe(
      res => {
        // console.log("resp", res);
        if (res["id"] != null) {
          this.toastService.showSuccess("Se eliminó con éxito", "Correcto");
          //this.getAllIndicadoresxOE(this.objEstrategico.id_oe);
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
    console.log(this.indicador);
    this.indicadoresOEService.editarIndicadoresOE(this.indicador).subscribe(
      res => {
        // console.log("resp", res);
        if (res["id"] != null) {
          this.toastService.showSuccess("Se modificó con éxito", "Correcto");

          this.limpiarCampos();
          //this.getAllIndicadoresxOE(this.objEstrategico.id_oe);
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
    this.indicador = indicador;
    // console.log(indicador);
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.listaOrganos = res;
    });
  }

  limpiarCampos() {
    this.indicador = {
      anio_actual: null,
      anio_base: null,
      id_organo: null,
      metodo_calculo: "",
      nombre: "",
      valor_actual: null,
      valor_base: null
    };
  }

}
