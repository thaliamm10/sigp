import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CadenaFuncionalService } from 'src/app/services/cadena-funcional.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { GrupoFuncionalInterface } from 'src/app/entities/grupo-funcional-interface';

@Component({
  selector: 'app-efp-grupo',
  templateUrl: './efp-grupo.component.html',
  styleUrls: ['./efp-grupo.component.css']
})
export class EfpGrupoComponent implements OnInit {
  p: any;
  lista_division: Object;
  lista_grupo: Object;
  grupo: GrupoFuncionalInterface;
  user: any;
  cantidad_lista: number;
  @ViewChild("closeModal", {static: false})
  closeModal: ElementRef;
  constructor(
    private cadenaService: CadenaFuncionalService,
    private authService: AuthService,
    private toastService: ToastrServiceService
  ) { 
    this.grupo = {
      codigo: "",
      descripcion: "",
      id_funcion: 0
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllGrupo();
  }

  getAllGrupo() {
    this.cadenaService.getGrupoFuncional(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_grupo = res;   
    });
  }

  getAllDivision() {
    this.cadenaService.getDivisionFuncional(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_division = res;
      this.cantidad_lista = res["length"]; 
    });
  }

  getElemento(elemento) {
    this.grupo = {
      id: (elemento!=null) ? elemento.id : 0,
      codigo: (elemento!=null) ? elemento.codigo : '',  
      descripcion: (elemento!=null) ? elemento.descripcion :  '',
      estado: (elemento!=null) ? elemento.estado : 1,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      fecha_registro: (elemento!=null) ? elemento.fecha_registro : "",
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      id_funcion: (elemento!=null) ? elemento.id_funcion : 0
    };    
    this.getAllDivision();
  }

  guardar() {    
    if(this.valida(this.grupo))
    {      
      this.cadenaService.guardarGrupoFuncional(this.grupo).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
          this.closeModal.nativeElement.click();
          this.getAllGrupo();
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
