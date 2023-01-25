import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CategoriaPresupuestalService } from 'src/app/services/categoria-presupuestal.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { ProductoPresupuestalInterface } from 'src/app/entities/producto-presupuestal-interface';
import { ActividadPresupuestalInterface } from 'src/app/entities/actividad-presupuestal-interface';

@Component({
  selector: 'app-efp-actividad',
  templateUrl: './efp-actividad.component.html',
  styleUrls: ['./efp-actividad.component.css']
})
export class EfpActividadComponent implements OnInit {
  p: any;
  lista_actividad: Object;
  lista_producto: Object;
  actividad: ActividadPresupuestalInterface;
  user: any;
  cantidad_lista: number;
  @ViewChild("closeModal", {static: false})
  closeModal: ElementRef;
  constructor(
    private categoriaService: CategoriaPresupuestalService,
    private authService: AuthService,
    private toastService: ToastrServiceService
  ) { 
    this.actividad = {
      codigo: "",
      nombre: "",
      id_producto: 0,
      estado: 1,
      id_tipo: 1
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllActividad();
    
  }

  getAllProducto() {
    this.categoriaService.getProductoPresupuestal(0,0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_producto = res;
    });
  }

  getAllActividad() {
    this.categoriaService.getActividadPresupuestal(0,0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_actividad = res;      
      this.cantidad_lista = res["length"]; 
    });
  }

  getElemento(elemento) {
    //console.log(elemento);
    this.actividad = {
      id: (elemento!=null) ? elemento.id : 0,
      codigo: (elemento!=null) ? elemento.codigo : null,  
      nombre: (elemento!=null) ? elemento.nombre :  null,
      estado: (elemento!=null) ? elemento.estado : 1,
      id_tipo: (elemento!=null) ? elemento.id_tipo : 0,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      fecha_registro: (elemento!=null) ? elemento.fecha_registro : null,
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      id_producto: (elemento!=null) ? elemento.id_producto : 0
    };      
    this.getAllProducto();  
  }

  guardar() {    
    //console.log(this.actividad);
    if(this.valida(this.actividad))
    {      
      this.categoriaService.guardarActividadPresupuestal(this.actividad).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
          this.closeModal.nativeElement.click();
          this.getAllActividad();
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
