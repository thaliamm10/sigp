import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FuncionesInterface } from 'src/app/entities/funcion-interface';
import { AuthService } from 'src/app/services/auth.service';
import { CicloService } from 'src/app/services/ciclo.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { CadenaFuncionalService } from 'src/app/services/cadena-funcional.service';

@Component({
  selector: 'app-efp-funcion',
  templateUrl: './efp-funcion.component.html',
  styleUrls: ['./efp-funcion.component.css']
})
export class EfpFuncionComponent implements OnInit {
  p: any;
  lista_funcion: Object;
  lista_ciclo: Object;
  funcion: FuncionesInterface;
  user: any;
  cantidad_lista: number;
  @ViewChild("closeModal", {static: false})
  closeModal: ElementRef;
  constructor(
    private cadenaService: CadenaFuncionalService,
    private authService: AuthService,
    private cicloService: CicloService,
    private toastService: ToastrServiceService
  ) { 
    this.funcion = {
      codigo: 0,
      descripcion: "",
      id_ciclo: 0,
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllFuncion();
    this.getAllCiclo();  
  }

  getAllFuncion() {
    this.cadenaService.getFuncion(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_funcion = res;
      this.cantidad_lista = res["length"]; 
      // console.log("res",res);
    });
  }

  getAllCiclo() {
    this.cicloService.getAllCicloActivos().subscribe(res => {
      this.lista_ciclo = res;
      if(res["length"]>0){
        this.funcion.id_ciclo = this.lista_ciclo[0].id;
      }      
    });
  }

  getElemento(elemento) {
    // console.log(elemento);
    this.funcion = {
      id: (elemento!=null) ? elemento.id : 0,
      codigo: (elemento!=null) ? elemento.codigo : null,  
      descripcion: (elemento!=null) ? elemento.descripcion :  null,
      estado: (elemento!=null) ? elemento.estado : 1,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      fecha_registro: (elemento!=null) ? elemento.fecha_registro : null,
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      id_ciclo: (elemento!=null) ? elemento.id_ciclo : this.user.id_ciclo,
      id_etapa: (elemento!=null) ? elemento.id_etapa : this.user.id_etapa
    };  
  }

  guardar() {    
    // console.log(this.funcion);
    if(this.valida(this.funcion))
    {
      this.funcion.id_etapa = this.user.id_etapa; 
      this.cadenaService.guardarFuncion(this.funcion).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
          this.closeModal.nativeElement.click();
          this.getAllFuncion();
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
