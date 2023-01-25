import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrganoService } from 'src/app/services/organo.service';
import { UgpService } from 'src/app/services/ugp.service';
import { ExcelServicesService } from 'src/app/services/excel-services.service';
import { PfpService } from 'src/app/services/pfp.service';
import { ReportePresupuestalInterface } from 'src/app/entities/reporte-presupuestal-interface';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';

@Component({
  selector: 'app-reporte-opp8',
  templateUrl: './reporte-opp8.component.html',
  styleUrls: ['./reporte-opp8.component.css']
})
export class ReporteOpp8Component implements OnInit {
  pfa: any;
  cantidad_lista: number;
  user: any;
  lista_organo: Object;
  lista_um: Object;
  id_centro_costo: number;
  lista_recursos: any = [];
  reporte: ReportePresupuestalInterface;
  p: any;

  @ViewChild("closeModalReporte", {static: false})
  closeModalReporte: ElementRef;
  constructor(
    private toastService: ToastrServiceService,
    private authService: AuthService,
    private pfpservice: PfpService,
    private organoService: OrganoService,
    private excelService:ExcelServicesService,
    private unidadMedidaService: UnidadMedidaService,
  ) {
    this.reporte = {
      id : 0,
      id_act_pres:0,
      id_departamento:0,
      id_distrito:0,
      id_prog_pres:0,
      id_estado:0,
      id_finalidad:0,
      id_producto:0,
      id_provincia:0,
      id_uni_med:0,
      generica_gastos:"",
      clasificador_gastos:"",
      anio_1:"",
      anio_2:"",
      anio_3:"",
      meta_fisica:""

    }
   }



  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllOrgano();
    this.getAllUnidadMedida();
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
      this.id_centro_costo = (res["length"]>0) ? this.lista_organo[0].id :0;
      this.getAllReporte();
    });
  }

  getAllReporte() {
    this.lista_recursos=null;
    this.pfpservice.getAllReporteOpp8(this.id_centro_costo,this.user.codigo).subscribe(res => {
        this.lista_recursos = res;
        this.cantidad_lista = res["length"];
      },
      err => {
        this.toastService.showError(
          "Problemas para conectar al servidor.",
          "Error"
        );
      }
    );
  }

getElemento(elemento) {

  this.reporte= {
    id: (elemento!=null) ? elemento.id : 0,
    id_prog_pres: (elemento!=null) ? elemento.id_prog_pres : 0,
    id_producto: (elemento!=null) ? elemento.id_producto : 0,
    nombre_producto: (elemento!=null) ? elemento.nombre_producto : "",
    id_act_pres: (elemento!=null) ? elemento.id_act_pres : 0,
    id_finalidad: (elemento!=null) ? elemento.id_finalidad : 0,
    nombre_finalidad: (elemento!=null) ? elemento.nombre_finalidad : "",
    id_departamento: (elemento!=null) ? elemento.id_departamento : "",
    nombre_departamento: (elemento!=null) ? elemento.nombre_departamento : "",
    id_provincia: (elemento!=null) ? elemento.id_provincia : "",
    nombre_provincia: (elemento!=null) ? elemento.nombre_provincia : "",
    id_distrito: (elemento!=null) ? elemento.id_distrito : "",
    nombre_distrito: (elemento!=null) ? elemento.nombre_distrito : "",
    id_uni_med: (elemento!=null) ? elemento.id_uni_med : 0,
    nombre_unidad: (elemento!=null) ? elemento.nombre_unidad : "",
    meta_fisica: (elemento!=null) ? elemento.meta_fisica : "",
    generica_gastos: (elemento!=null) ? elemento.generica_gastos : 0,
    nombre_gastos: (elemento!=null) ? elemento.nombre_gastos : "",
    clasificador_gastos: (elemento!=null) ? elemento.clasificador_gastos : "",
    anio_1: (elemento!=null) ? elemento.anio_1 : "",
    anio_2: (elemento!=null) ? elemento.anio_2 : "",
    anio_3: (elemento!=null) ? elemento.anio_3 : "",
  }

}

guardarReporte(){
  this.pfpservice.guardarReporteOpp8(this.reporte).subscribe(
    res => {
      if (res["id"] != null) {
        this.toastService.showSuccess("Se agregó con éxito", "Correcto");
        this.closeModalReporte.nativeElement.click();
        this.getAllReporte();
      } else if (res["id"] == null) {
        this.toastService.showError("Se produjo un error al guardar.","Error");
      }
    },
    err => {
      this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message,"Error");
    }
 
  );
}

getAllUnidadMedida() {
  this.unidadMedidaService.getAllUnidadMedida().subscribe(res => {
    this.lista_um = res;
  });
}



}
