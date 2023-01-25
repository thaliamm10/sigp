import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CategoriaPresupuestalService } from 'src/app/services/categoria-presupuestal.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { CicloService } from 'src/app/services/ciclo.service';
import { CatagoriaPresupuestalInterface } from 'src/app/entities/categoria-presupuestal-interface';

@Component({
  selector: 'app-efp-categoria',
  templateUrl: './efp-categoria.component.html',
  styleUrls: ['./efp-categoria.component.css']
})
export class EfpCategoriaComponent implements OnInit {
  p: any;
  lista_categoria: Object;
  lista_ciclo: Object;
  categoria: CatagoriaPresupuestalInterface;
  user: any;
  cantidad_lista: number;
  id_ciclo: number;
  @ViewChild("closeModal", {static: false})
  closeModal: ElementRef;
  constructor(
    private categoriaService: CategoriaPresupuestalService,
    private authService: AuthService,
    private cicloService: CicloService,
    private toastService: ToastrServiceService
  ) {
    this.categoria = {
      codigo: "",
      nombre: "",
      id_ciclo: 0,
      id_etapa: 0
    }
   }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllCategoria();
    this.getAllCiclo();  
  }

  getAllCategoria() {
    this.categoriaService.getCategoriaPresupuestal(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_categoria = res;
      this.cantidad_lista = res["length"]; 
    });
  }

  getAllCiclo() {
    this.cicloService.getAllCicloActivos().subscribe(res => {
      this.lista_ciclo = res;
      if(res["length"]>0){
        this.categoria.id_ciclo = this.lista_ciclo[0].id;
      }      
    });
  }

  getElemento(elemento) {
    // console.log(elemento);
    this.categoria = {
      id: (elemento!=null) ? elemento.id : 0,
      codigo: (elemento!=null) ? elemento.codigo : null,  
      nombre: (elemento!=null) ? elemento.nombre :  null,
      estado: (elemento!=null) ? elemento.estado : 1,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      fecha_registro: (elemento!=null) ? elemento.fecha_registro : null,
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      id_ciclo: (elemento!=null) ? elemento.id_ciclo : 0,
      id_etapa : (elemento!=null) ? elemento.id_etapa : this.user.etapa,
    };  
  }

  guardar() {    
    if(this.valida(this.categoria))
    {  
      this.categoria.id_etapa = this.user.id_etapa;    
      this.categoriaService.guardarCategoriaPresupuestal(this.categoria).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
          this.closeModal.nativeElement.click();
          this.getAllCategoria();
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
