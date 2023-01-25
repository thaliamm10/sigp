import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FinalidadInterface } from 'src/app/entities/finalidad-interface';
import { CadenaFuncionalService } from 'src/app/services/cadena-funcional.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';

@Component({
  selector: 'app-efp-finalidad',
  templateUrl: './efp-finalidad.component.html',
  styleUrls: ['./efp-finalidad.component.css']
})
export class EfpFinalidadComponent implements OnInit {
  p: any;
  lista_grupo: Object;
  lista_finalidad: Object;
  finalidad: FinalidadInterface;
  user: any;
  cantidad_lista: number;
  @ViewChild("closeModal", {static: false})
  closeModal: ElementRef;

  constructor(
    private cadenaService: CadenaFuncionalService,
    private authService: AuthService,
    private toastService: ToastrServiceService
  ) {
    this.finalidad = {
      codigo: "",
      descripcion: "",
      id_funcion: 0,
      id_unidad: 0
    }
   }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllFinalidad();
  }

  getAllFinalidad() {
    this.cadenaService.getFinalidad(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_finalidad = res;   
    });
  }

  getAllGrupoFuncional() {
    this.cadenaService.getGrupoFuncional(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_grupo = res;
      this.cantidad_lista = res["length"]; 
    });
  }

  getElemento(elemento) {
    //console.log(elemento);
    this.finalidad = {
      id: (elemento!=null) ? elemento.id : 0,
      codigo: (elemento!=null) ? elemento.codigo : '',  
      descripcion: (elemento!=null) ? elemento.descripcion :  '',
      estado: (elemento!=null) ? elemento.estado : 1,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      fecha_registro: (elemento!=null) ? elemento.fecha_registro : "",
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      id_funcion: (elemento!=null) ? elemento.id_funcion : 0,
      id_unidad: (elemento!=null) ? elemento.id_unidad : 0,
    };    
    this.getAllGrupoFuncional();
  }

  guardar() {    
    //console.log(this.programa);
    if(this.valida(this.finalidad))
    {      
      this.cadenaService.guardarFinalidad(this.finalidad).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
          this.closeModal.nativeElement.click();
          this.getAllFinalidad();
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
