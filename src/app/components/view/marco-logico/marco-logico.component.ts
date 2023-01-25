import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//interface
import { UGPInterface } from 'src/app/entities/ugp-interface';


@Component({
  selector: 'app-marco-logico',
  templateUrl: './marco-logico.component.html',
  styleUrls: ['./marco-logico.component.css']
})

export class MarcoLogicoComponent implements OnInit {
  ugp: UGPInterface;

  constructor(
    public activateRoute: ActivatedRoute,
  ) {
    this.ugp = {
      id: this.activateRoute.snapshot.params["id"],
      nombre: this.activateRoute.snapshot.params["nombre"],
      nombre_proceso: this.activateRoute.snapshot.params["nombre_proceso"],
      nombre_responsable: this.activateRoute.snapshot.params["nombre_responsable"]
    }; 
  }

  ngOnInit() {

  }

  closeModal(modal: any) {
    //$(modal.nativeElement).modal("hide");
  }
  
  openModal(modal: any) {
    //$(modal.nativeElement).modal("show");
  }

  openModalELiminar(elemento, nro) {
    //this.openModal(this.modalEliminar);
    if(confirm("¿Está seguro de Eliminar el registro?")){
      // console.log("operacion: " + nro);
      // console.log(elemento);
      //this.datoE = elemento;
      //this.opcionE = nro;
     // this.confirmacionEliminar();
    }    
  }
/*
  confirmacionEliminar() {
    switch (this.opcionE) {
      case 1: {
        this.eliminarObjEstrategico(this.datoE);
        //this.closeModal(this.modalEliminar);
        break;
      }
      case 2: {
        this.eliminarIndicadorFin(this.datoE);
        //this.closeModal(this.modalEliminar);
        break;
      }
      case 3: {
        this.eliminarAE(this.datoE);
        //this.closeModal(this.modalEliminar);
        break;
      }
      case 4: {
        this.eliminarIndicadorProposito(this.datoE);
        //this.closeModal(this.modalEliminar);
        break;
      }
      case 5: {
        this.eliminarProducto(this.datoE);
        //this.closeModal(this.modalEliminar);
        break;
      }
      case 6: {
        this.eliminarIndicador(this.datoE);
        //this.closeModal(this.modalEliminar);
        break;
      }
      case 7: {
        this.eliminarAccion(this.datoE);
        //this.closeModal(this.modalEliminar);
        break;
      }
    }
  }
  */
  onEditFin() {
    //console.log("antes", this.editadoFin);
    //if (this.editadoFin == false) {
      //this.editadoFin = true;
    //}
  }

  onEditProposito() {
    //console.log("antes", this.editadoProp);
    //if (this.editadoProp == false) {
      //this.editadoProp = true;
    //}
  }

  public validarSoloNumeros(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public validarSoloDecimales(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // ESTE METODO HACE QUE SE SELECCIONE Y PINTE EL ESTADO
  select(elemento) {
    if (elemento.estado == false) {
      elemento.estado = true;
    } else if (elemento.estado == true) {
      elemento.estado = false;
    }
  }

  limpiarCampos() {

  }

}

