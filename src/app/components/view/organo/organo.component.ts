import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';

import {OrganoInterface} from 'src/app/entities/organo-interface';
import {OrganoService} from 'src/app/services/organo.service';
import {RegionService} from 'src/app/services/region.service';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';

@Component({
  selector: 'app-organo',
  templateUrl: './organo.component.html',
  styleUrls: ['./organo.component.css']
})
export class OrganoComponent implements OnInit {
  listaOrgano: any;
  organo: OrganoInterface;
  lista_personal: Object;
  lista_departamento_ambito: any = Array();
  lista_departamento_principal: any = Array();
  p: any;
  @ViewChild("closeModalOrgano", {static: false})
  closeModalOrgano: ElementRef;
  filtro_estado: any;
  filtro_nombre: any;

  constructor(
    private organoService: OrganoService,
    private regionService: RegionService,
    private toastService: ToastrServiceService
  ) {
    this.organo = {
      nombre: "",
      codigo: "",
      descripcion: "",
      nombre_corto: "",
      lista_ambito: Array(),
      canalizadora: null
    };
    this.filtro_estado = "";
  }

  ngOnInit() {
    this.getAllOrgano();
    this.getAllDepartamento();
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.listaOrgano = res;
    });
  }

  getAllDepartamento() {
    this.regionService.getAllDepartarmento().subscribe(res => {
      this.lista_departamento_principal = res;
      // console.log(res);
      for (let i = 0; i < res["length"]; i++) {
        this.lista_departamento_ambito.push({
          CODI_DEPA_DPT: res[i].CODI_DEPA_DPT,
          NOMB_DPTO_DPT: res[i].NOMB_DPTO_DPT,
          estado: false
        });
      }
    });
  }

  getAllResponsable() {
    this.organoService.getAllResponsableOrgano(this.organo.codigo).subscribe(res => {
      this.lista_personal = res;
    });
  }

  getElemento(elemento) {
    this.organo = {
      id: (elemento != null) ? elemento.id : 0,
      codigo: (elemento != null) ? elemento.codigo : "",
      nombre: (elemento != null) ? elemento.nombre : "",
      descripcion: (elemento != null) ? elemento.descripcion : "",
      nombre_corto: (elemento != null) ? elemento.nombre_corto : "",
      id_estado: (elemento != null) ? elemento.id_estado : 1,
      id_responsable: (elemento != null) ? elemento.id_responsable : "",
      lista_ambito: (elemento != null) ? elemento.lista_ambito : Array(),
      canalizadora: (elemento != null) ? elemento.canalizadora : "",
    };

    this.lista_personal = [];
    for (let i = 0; i < this.lista_departamento_ambito.length; i++) {
      this.lista_departamento_ambito[i].estado = false;
    }

    if (this.organo.id != 0) {
      this.getAllResponsable();
      var codigo_departamento = "";
      var codigo_ambitos = "";
      for (let i = 0; i < this.organo.lista_ambito["length"]; i++) {
        codigo_ambitos = codigo_ambitos + this.organo.lista_ambito[i].id_departamento + "|";
        if (this.organo.lista_ambito[i].principal == 1) {
          codigo_departamento = this.organo.lista_ambito[i].id_departamento;
        }
      }

      for (let i = 0; i < this.lista_departamento_ambito.length; i++) {
        this.lista_departamento_ambito[i].estado = (codigo_ambitos.indexOf(this.lista_departamento_ambito[i].CODI_DEPA_DPT) != -1);
      }

      this.organo.id_departamento = codigo_departamento;
    }

  }

  guardarDependencia() {
    var codigo_departamento = "";
    for (let i = 0; i < this.lista_departamento_ambito.length; i++) {
      if (this.lista_departamento_ambito[i].estado == true) {
        codigo_departamento = codigo_departamento + this.lista_departamento_ambito[i].CODI_DEPA_DPT + "|";
      }
    }

    if (codigo_departamento.indexOf(this.organo.id_departamento) == -1) {
      codigo_departamento = codigo_departamento + this.organo.id_departamento + "|";
    }

    this.organo["lista_ambito"] = [];
    for (let k = 0; k < codigo_departamento.split('|').length - 1; k++) {
      if (this.organo["lista_ambito"]) {
        this.organo["lista_ambito"].push({
          id_departamento: codigo_departamento.split('|')[k],
          principal: (codigo_departamento.split('|')[k] == this.organo.id_departamento) ? 1 : 0
        });
      }
    }
    //console.log(this.organo);
    this.organoService.guardarOrgano(this.organo).subscribe(
      res => {
        if (res["id"] != null) {
          this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          this.closeModalOrgano.nativeElement.click();
          this.getAllOrgano();
        } else if (res["id"] == null) {
          this.toastService.showError(
            "Se produjo un error al guardar.",
            "Error"
          );
        }
      },
      err => {
        this.toastService.showError(
          "Se produjo un error en el servicio. Error: " + err.message,
          "Error"
        );
      }
    );

  }

  onSelect(elemento) {
    for (let i = 0; i < this.lista_departamento_ambito.length; i++) {
      if (elemento.CODI_DEPA_DPT == this.lista_departamento_ambito[i].CODI_DEPA_DPT)
        this.lista_departamento_ambito[i].estado = !this.lista_departamento_ambito[i].estado;
    }
  }

  select(elemento) {
    if (elemento.estado == false) {
      elemento.estado = true;
    } else if (elemento.estado == true) {
      elemento.estado = false;
    }
  }
}
