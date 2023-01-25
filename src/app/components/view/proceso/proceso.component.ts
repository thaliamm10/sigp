import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProcesoInterface } from 'src/app/entities/proceso-interface';
import { ProcesoService } from 'src/app/services/proceso.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent implements OnInit {
  listaProcesos: any;
  proceso: ProcesoInterface;
  p: any;
  cantidad_lista: number;
  filtro_nombre:any;
  user: any;
  x_progreso: boolean;
  @ViewChild("closeModalProceso", {static: false})
  closeModalProceso: ElementRef;
  constructor(
    private procesoService: ProcesoService,
    private toastService: ToastrServiceService,
    private authService: AuthService
  ) {
    this.proceso = {
      id: 0,
      codigo: "",
      nombre: "",
      descripcion: "",
      id_estado: 1,
      id_proceso: 0,
      id_apertura:0,
      fecha_registro: "",
      usuario_registro: "",
      nombre_usuario: ""
    };  
   }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.proceso.id_apertura = this.user.id_apertura;
    this.x_progreso =false;
    this.getAllProcesos();
  }

  getAllProcesos() {
    this.procesoService.getAllProcesos().subscribe(res => {
      this.listaProcesos = res;
      this.cantidad_lista = res["length"];
    });
  }

  guardarProceso() {
    this.x_progreso = true;
    this.procesoService.guardarProceso(this.proceso).subscribe(      
      res => {
        if (res["id"] != null) {
          this.toastService.showSuccess("Se guargó con éxito", "Correcto");          
          this.closeModalProceso.nativeElement.click();
          this.getAllProcesos();
          this.x_progreso = false;
          
        } else if (res["id"] == null) {
          this.x_progreso = false;
          this.toastService.showError(
            "Se produjo un error al guardar.",
            "Error"
          );
        }
      },
      err => {
        this.x_progreso = false;
        this.toastService.showError(
          "Se produjo un error en el servicio. Error: " + err.message,
          "Error"
        );
      }
    );
  }

  getElemento(elemento) {
    //console.log(elemento);
    this.proceso = {
      id: (elemento!=null) ? elemento.id : 0,
      codigo: (elemento!=null) ? elemento.codigo : "",
      descripcion: (elemento!=null) ? elemento.descripcion : "",
      id_apertura: (elemento!=null) ? elemento.id_apertura : this.user.id_apertura,
      id_proceso: (elemento!=null) ? elemento.id_proceso : 0,
      nombre: (elemento!=null) ? elemento.nombre : "",
      id_estado: (elemento!=null) ? elemento.id_estado : 1,
      nivel: (elemento!=null) ? elemento.nivel : 1
    }
  }
}
