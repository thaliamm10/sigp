import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CategoriaPresupuestalService } from 'src/app/services/categoria-presupuestal.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { ProductoPresupuestalInterface } from 'src/app/entities/producto-presupuestal-interface';

@Component({
  selector: 'app-efp-producto',
  templateUrl: './efp-producto.component.html',
  styleUrls: ['./efp-producto.component.css']
})
export class EfpProductoComponent implements OnInit {
  p: any;
  lista_programa: Object;
  lista_producto: Object;
  producto: ProductoPresupuestalInterface;
  user: any;
  cantidad_lista: number;
  @ViewChild("closeModal", {static: false})
  closeModal: ElementRef;
  constructor(
    private categoriaService: CategoriaPresupuestalService,
    private authService: AuthService,
    private toastService: ToastrServiceService
  ) { 
    this.producto = {
      codigo: "",
      nombre: "",
      id_programa: 0,
      estado: 1
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    
    this.getAllProducto();
  }

  getAllProducto() {
    this.categoriaService.getProductoPresupuestal(0,0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_producto = res;      
      this.cantidad_lista = res["length"]; 
    });
  }

  getAllPrograma() {
    this.categoriaService.getProgramaPresupuestal(0,0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_programa = res;      
    });
  }

  getElemento(elemento) {
    //console.log(elemento);
    this.producto = {
      id: (elemento!=null) ? elemento.id : 0,
      codigo: (elemento!=null) ? elemento.codigo : null,  
      nombre: (elemento!=null) ? elemento.nombre :  null,
      estado: (elemento!=null) ? elemento.estado : 1,
      id_tipo: (elemento!=null) ? elemento.id_tipo : 0,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      fecha_registro: (elemento!=null) ? elemento.fecha_registro : null,
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      id_programa: (elemento!=null) ? elemento.id_programa : 0
    };        
    this.getAllPrograma();
  }

  guardar() {    
    //console.log(this.producto);
    if(this.valida(this.producto))
    {      
      this.categoriaService.guardarProductoPresupuestal(this.producto).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
          this.closeModal.nativeElement.click();
          this.getAllProducto();
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
