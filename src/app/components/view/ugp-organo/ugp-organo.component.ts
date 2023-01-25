import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { UGPxOrganoInterface } from 'src/app/entities/ugp-organo-interface';
import { OrganoService } from 'src/app/services/organo.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';

@Component({
  selector: 'app-ugp-organo',
  templateUrl: './ugp-organo.component.html',
  styleUrls: ['./ugp-organo.component.css']
})
export class UgpOrganoComponent implements OnInit {
  organo: UGPxOrganoInterface;
  lista_cc: Object;
  lista_organo: Object;
  lista_personal: Object;
  @ViewChild("closeModalUGP", {static: false})
  closeModalUGP: ElementRef;
  x_progreso: boolean;
  p: any;
  filtro_nombre:string;
  cantidad_lista:number=0;

  constructor(
    private organoService: OrganoService,
    private toastService: ToastrServiceService
  ) { 
    this.organo = {
      id:0,
      nombre:"",
      codigo:"",
      id_organo:0,
      id_estado:1,
      id_responsable:""
    }
  }

  ngOnInit() {
    this.getAllUGPxOrgano();
    this.getAllOrgano();
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_cc = res;
      if(res["length"]>0){
        this.organo.id_organo = this.lista_cc[0].id;
        this.organo.codigo_organo = this.lista_cc[0].codigo;
        //console.log(this.organo.codigo_organo);
        this.organoService.getAllResponsableOrgano(this.organo.codigo_organo).subscribe(res => {
          //console.log(res);
          this.lista_personal = res;
        });
      } 
    });
  }

  getAllUGPxOrgano() {
    this.organoService.getAllUGPxOrgano(0).subscribe(res => {
      this.lista_organo = res;    
      this.cantidad_lista = res["length"]; 
    });
  }

  getAllResponsable() {
    this.organoService.getAllResponsableOrgano(this.organo.codigo_organo).subscribe(res => {
      this.lista_personal = res;
      if(res["length"]>0){
        this.organo.id_responsable = this.lista_personal[0].codigo;
      }
    });
  }

  getElemento(elemento) {
    // console.log(elemento);
    this.organo = {
      id: (elemento!=null) ? elemento.id : 0,
      codigo: (elemento!=null) ? elemento.codigo : "",
      nombre: (elemento!=null) ? elemento.nombre : "",
      id_organo: (elemento!=null) ? elemento.id_organo : 0,
      codigo_organo: (elemento!=null) ? elemento.codigo_organo : "",
      id_estado: (elemento!=null) ? elemento.id_estado : 1,
      id_responsable: (elemento!=null) ? elemento.id_responsable : ""
    }

    this.organoService.getAllResponsableOrgano(this.organo.codigo_organo).subscribe(res => {
      this.lista_personal = res;
    });
  }

  guardarUGPxOrgano () {
    // console.log(this.organo);
    this.x_progreso = true;
      this.organoService.guardarUGPxOrgano(this.organo).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardo con éxito", "Correcto");
            this.closeModalUGP.nativeElement.click();
            this.getAllUGPxOrgano();
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

}
