import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CategoriaPresupuestalService } from 'src/app/services/categoria-presupuestal.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { ProgramaPresupuestalInterface } from 'src/app/entities/programa-presupuestal-interface';

@Component({
  selector: 'app-efp-programa',
  templateUrl: './efp-programa.component.html',
  styleUrls: ['./efp-programa.component.css']
})
export class EfpProgramaComponent implements OnInit {
  p: any;
  lista_programa: Object;
  lista_categoria: Object;
  programa: ProgramaPresupuestalInterface;
  user: any;
  cantidad_lista: number;
  @ViewChild("closeModal", {static: false})
  closeModal: ElementRef;
  constructor(
    private categoriaService: CategoriaPresupuestalService,
    private authService: AuthService,
    private toastService: ToastrServiceService
  ) { 
    this.programa = {
      codigo: "",
      nombre: "",
      id_categoria: 0,
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllPrograma();    
  }

  getAllCategoria() {
    this.categoriaService.getCategoriaPresupuestal(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_categoria = res;      
    });
  }

  getAllPrograma() {
    this.categoriaService.getProgramaPresupuestal(0,0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_programa = res;
      this.cantidad_lista = res["length"]; 
    });
  }

  getElemento(elemento) {
    //console.log(elemento);
    this.programa = {
      id: (elemento!=null) ? elemento.id : 0,
      codigo: (elemento!=null) ? elemento.codigo : null,  
      nombre: (elemento!=null) ? elemento.nombre :  null,
      estado: (elemento!=null) ? elemento.estado : 1,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      fecha_registro: (elemento!=null) ? elemento.fecha_registro : null,
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      id_categoria: (elemento!=null) ? elemento.id_categoria : 0
    };       
    this.getAllCategoria(); 
  }

  guardar() {    
    //console.log(this.programa);
    if(this.valida(this.programa))
    {      
      this.categoriaService.guardarProgramaPresupuestal(this.programa).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
          this.closeModal.nativeElement.click();
          this.getAllPrograma();
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
