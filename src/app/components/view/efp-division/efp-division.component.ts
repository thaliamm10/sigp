import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { divisionFuncionalInterface } from 'src/app/entities/divisionFuncional-interface';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { CadenaFuncionalService } from 'src/app/services/cadena-funcional.service';

@Component({
  selector: 'app-efp-division',
  templateUrl: './efp-division.component.html',
  styleUrls: ['./efp-division.component.css']
})
export class EfpDivisionComponent implements OnInit {
  p: any;
  lista_division: Object;
  lista_funcion: Object;
  division: divisionFuncionalInterface;
  user: any;
  cantidad_lista: number;
  @ViewChild("closeModal", {static: false})
  closeModal: ElementRef;
  constructor(
    private cadenaService: CadenaFuncionalService,
    private authService: AuthService,
    private toastService: ToastrServiceService
  ) {
    this.division = {
      codigo: "",
      descripcion: "",
      id_funcion: 0,
    }
   }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllDivision();
  }

  getAllDivision() {
    this.cadenaService.getDivisionFuncional(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_division = res;   
    });
  }

  getAllFuncion() {
    this.cadenaService.getFuncion(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_funcion = res;
      this.cantidad_lista = res["length"]; 
    });
  }

  getElemento(elemento) {
    this.division = {
      id: (elemento!=null) ? elemento.id : 0,
      codigo: (elemento!=null) ? elemento.codigo : null,  
      descripcion: (elemento!=null) ? elemento.descripcion :  null,
      estado: (elemento!=null) ? elemento.estado : 1,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      fecha_registro: (elemento!=null) ? elemento.fecha_registro : null,
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      id_funcion: (elemento!=null) ? elemento.id_funcion : 0
    };    
    this.getAllFuncion();    
  }

  guardar() {    
    // console.log(this.division);
    if(this.valida(this.division))
    {      
      this.cadenaService.guardarDivisionFuncional(this.division).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
          this.closeModal.nativeElement.click();
          this.getAllDivision();
        },
        err => {
          this.toastService.showError(
            "Se produjo un error en el servicio. Error: " + err.message,
            "Error"
          );
        });
    }
    else{
      this.toastService.showError("Formato de Fecha Incorrecto", "Validación");
    }
  }

  valida(data){
    return true;
  }
}
