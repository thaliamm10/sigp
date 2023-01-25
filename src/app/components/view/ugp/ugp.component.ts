import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { UgpService } from 'src/app/services/ugp.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrganoService } from 'src/app/services/organo.service';
import { ProcesoService } from 'src/app/services/proceso.service';
import { CicloService } from 'src/app/services/ciclo.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { UGPInterface } from 'src/app/entities/ugp-interface';


@Component({
  selector: 'app-ugp',
  templateUrl: './ugp.component.html',
  styleUrls: ['./ugp.component.css']
})
export class UgpComponent implements OnInit {
  listaUGP: any;
  listaOrgano: any;
  lista_personal: Object;
  listaCiclo: Object;
  p: any;
  user: any;
  cantidad_lista: number;
  ugp: UGPInterface;
  lista_proceso: any = Array();
  x_progreso: boolean;
  filtro_nombre: string;
  @ViewChild("closeModalUGP", {static: false})
  closeModalUGP: ElementRef;
  constructor(
    private cicloService: CicloService,
    private procesoService: ProcesoService,
    private organoService: OrganoService,
    private ugpService: UgpService,
    private toastService: ToastrServiceService,
    private authService: AuthService
  ) {
    this.ugp = {
      id: null,
      nombre: "",
      descripcion: "",
      abreviado: "",
      anio_inicio: 0,
      anio_fin: 0,
      id_estado: 1,
      id_proceso: 0,
      nombre_usuario: "",
      usuario_registro: "",
      id_etapa:0,
      id_ciclo: 0
    };
    this.filtro_nombre="";
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.x_progreso =false;
    this.getAllUGP();
    this.getAllOrgano();
    this.getAllProcesos();
    this.getAllCiclo();
  }

  getAllProcesos() {
    this.procesoService.getAllProcesos().subscribe(res => {
      this.lista_proceso = res;
    });
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.listaOrgano = res;
    });
  }

  getAllCiclo() {
    this.cicloService.getAllCicloActivos().subscribe(res => {
      this.listaCiclo = res;
    });
  }

  getAllResponsable() {
    this.organoService.getAllResponsableOrgano(this.ugp.codigo_organo).subscribe(res => {
      this.lista_personal = res;
    });
  }

  getElemento(elemento) {
    this.ugp = {
      id: (elemento!=null) ? elemento.id : 0,
      nombre: (elemento!=null) ? elemento.nombre : "",
      descripcion: (elemento!=null) ? elemento.descripcion : "",
      abreviado: (elemento!=null) ? elemento.abreviado : "",
      id_apertura: (elemento!=null) ? elemento.id_apertura : this.user.id_apertura,
      id_proceso: (elemento!=null) ? elemento.id_proceso : 0,
      id_estado: (elemento!=null) ? elemento.id_estado : 1,
      anio_inicio: (elemento!=null) ? elemento.anio_inicio : 0,
      anio_fin: (elemento!=null) ? elemento.anio_fin : 0,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      codigo_organo:  (elemento!=null) ? elemento.codigo_organo : 0,
      id_responsable:  (elemento!=null) ? elemento.id_responsable : '',
      id_etapa: (elemento!=null) ? elemento.id_etapa : this.user.id_etapa,
      id_ciclo: (elemento!=null) ? elemento.id_ciclo : this.user.id_ciclo,
    };
    //console.log(this.ugp.codigo_organo);
    this.organoService.getAllResponsableOrgano(this.ugp.codigo_organo).subscribe(res => {
      this.lista_personal = res;
      //console.log(res);
    });
  }

  getAllUGP() {
    this.ugpService.getAllUGPxlista(this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.listaUGP = res;
      this.cantidad_lista = res["length"];
    });
  }

  select(elemento) {
    this.ugp.id_proceso = elemento.id;
  }

  guardarUGP() {
    var resultado = this.validacion();
    this.x_progreso = true;
    if(resultado.length==0){
      this.ugpService.guardarUGP(this.ugp).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardo con éxito", "Correcto");
            this.closeModalUGP.nativeElement.click();
            this.getAllUGP();
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
    else{
      this.toastService.showError(
        "Se produjo un error en el servicio. Error: " + resultado,
        "Error"
      );
      this.x_progreso = false;
    }
  }

  validacion(){
    var output = "";
    if(this.ugp.descripcion.length>400){
      output = "Máximo contenido en Descripción es 400 caracteres, ahora estas cargando " +
      this.ugp.descripcion.length + " caracteres";
      return output;
    }
    if(this.ugp.nombre.length>400){
      output = "Máximo contenido en Nombre es 200 caracteres, ahora estas cargando " +
      this.ugp.descripcion.length + " caracteres";
      return output;
    }
    if(this.ugp.anio_inicio>this.ugp.anio_fin){
      output = "El año de inicio no puede ser mayor al año fin";
      return output;
    }
    if(this.ugp.id_responsable==0){
      output = "Debe seleccionar un Responsable";
      return output;
    }
    if(this.ugp.id_proceso==0){
      output = "Debe seleccionar un Proceso";
      return output;
    }
    return output;
  }


}
