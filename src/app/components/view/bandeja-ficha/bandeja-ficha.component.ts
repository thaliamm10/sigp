import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoriaPresupuestalService } from '../../../services/categoria-presupuestal.service';
import { DemandaAdicionalService } from '../../../services/demanda-adicional.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrServiceService } from '../../../services/toastr-service.service';
import { DemandaInterface } from '../../../entities/demanda-interface';
import { UnidadMedidaService } from '../../../services/unidad-medida.service';
import {ExcelServicesService} from "../../../services/excel-services.service";

@Component({
  selector: 'app-bandeja-ficha',
  templateUrl: './bandeja-ficha.component.html',
  styleUrls: ['./bandeja-ficha.component.css']
})
export class BandejaFichaComponent implements OnInit {
  lista_adi: any = new Array();
  lista_bandeja: any = new Array();
  lista_programa: Object;
  lista_actividad: Object;
  cantidad_lista: number;
  demanda: DemandaInterface;
  term: any;
  p: any;
  user: any;
  total:number;
  lista_clasificador: object;
  lista_unidad: Object;
  id_unidad: number;
  flagbtn = true;
  @ViewChild("CloseModalDemanada", {static: false})
  CloseModalDemanada: ElementRef;
    constructor(
      private toastService: ToastrServiceService,
      private authService: AuthService,
      private excelService: ExcelServicesService,
      private demandaService: DemandaAdicionalService,
      private unidadMedidaService: UnidadMedidaService,
    ) {

      this.total = 0

      this.demanda={
        nombre_demanda: "",
        tipo_demanda:"",
        programa_presupuestal:"",
        actv_presupuestal:"",
        concepto_demanda:"",
        prioridad_demanda:"",
        objetivo_demanda:"",
        criterio_demanda:"",
        foca_3:"",
        foca_2:"",
        foca_1:"",
        justificacion_3:"",
        justificacion_2:"",
        justificacion_1:"",
        observacion_1:"",
        observacion_2:"",
        observacion_3:"",
        brecha:"",
        indicador:"",
        unidad_medidad:"",
        es_conservador:0,
        es_pesimista:0,
        es_optimo:0,
        presupuesto_3:0,
        presupuesto_2:0,
        presupuesto_1:0,
        id:0,
        prioridad:0,
        id_epp:0,
        id_eap:0,
      };
    }


    ngOnInit() {
      this.user = this.authService.getUserLoggedIn();
      this.getAllBandeja();
    }

   getAllBandeja(){
     this.lista_bandeja=null;
     this.demandaService.getAllDemanda(this.user.codigo, this.demanda.id, this.user.id_ciclo, this.user.id_etapa).subscribe( res => {
       this.lista_bandeja = res;
       this.cantidad_lista = res["length"];
     });
   }

   getElemento(elemento){
    this.demanda={
      id: (elemento!=null) ? elemento.id :0,
      nombre_ugp: (elemento!=null) ? elemento.nombre_ugp : "",
      nombre_demanda: (elemento!=null) ? elemento.nombre_demanda : "",
      tipo_demanda: (elemento!=null) ? elemento.tipo_demanda : "",
      programa_presupuestal: (elemento!=null) ? elemento.programa_presupuestal : 4,
      prioridad_demanda: (elemento!=null) ? elemento.prioridad_demanda : "",
      objetivo_demanda: (elemento!=null) ? elemento.objetivo_demanda : "",
      criterio_demanda: (elemento!=null) ? elemento.criterio_demanda : "",
      concepto_demanda: (elemento!=null) ? elemento.concepto_demanda : "",
      foca_1: (elemento!=null) ? elemento.foca_1 : "",
      foca_2: (elemento!=null) ? elemento.foca_2 : "",
      foca_3: (elemento!=null) ? elemento.foca_3 : "",
      justificacion_1: (elemento!=null) ? elemento.justificacion_1 : "",
      justificacion_2: (elemento!=null) ? elemento.justificacion_2 : "",
      justificacion_3: (elemento!=null) ? elemento.justificacion_3 : "",
      observacion_1: (elemento!=null) ? elemento.observacion_1 : "",
      observacion_2: (elemento!=null) ? elemento.observacion_2 : "",
      observacion_3: (elemento!=null) ? elemento.observacion_3 : "",
      actv_presupuestal: (elemento!=null) ? elemento.actv_presupuestal : 0,
      brecha: (elemento!=null) ? elemento.brecha : "",
      indicador: (elemento!=null) ? elemento.indicador : "",
      unidad_medidad: (elemento!=null) ? elemento.unidad_medidad : "ACCION",
      es_conservador: (elemento!=null) ? elemento.es_conservador : 0,
      es_optimo: (elemento!=null) ? elemento.es_optimo : 0,
      es_pesimista: (elemento!=null) ? elemento.es_pesimista : 0,
      presupuesto_3: (elemento!=null) ? elemento.presupuesto_3 : 0,
      presupuesto_2: (elemento!=null) ? elemento.presupuesto_2 : 0,
      presupuesto_1: (elemento!=null) ? elemento.presupuesto_1 : 0,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      prioridad: (elemento!=null) ? elemento.prioridad :1,
      id_epp : (elemento!=null) ? elemento.id_epp : 0,
      id_eap : (elemento != null) ? elemento.id_eap : 0,
      id_ugp: (elemento != null) ? elemento.id_ugp : 0,
      situacion: (elemento!=null) ? elemento.situacion : 0
    }

    this.ListarClasificadores(this.demanda.id);
    this.getAllUnidadMedida();
  }

  guardarDemanda(){
    // console.log(this.pedido,"pedido");
    this.demandaService.guardarDemanda(this.demanda).subscribe(res => {
        if (res["id"]!= null) {
          this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          this.getAllBandeja();
          this.CloseModalDemanada.nativeElement.click();
        } else if (res["id"] == null) {
          this.toastService.showError("Se produjo un error al guardar.","Error");
        }
      },
      err => {
        this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message,"Error");
      });
  }

  guardarSituacion(){
    if(confirm("¿Está seguro de enviar la Ficha a Responsable OPP?")){
      this.demanda.situacion = 2;
      this.demandaService.situacion(this.demanda).subscribe(res => {
        this.CloseModalDemanada.nativeElement.click();
        this.toastService.showSuccess("Se cambio la situación de la Ficha", "Correcto");
      });
    }
  }

  aprobarSituacion(){
    if(confirm("¿Está seguro de aprobar la Ficha?")){
      this.demanda.situacion = 3;
      this.demandaService.situacion(this.demanda).subscribe(res => {
        this.CloseModalDemanada.nativeElement.click();
        this.toastService.showSuccess("Se aprobó la situación de la Ficha", "Correcto");
      });
    }
  }

  pad(str, max) {
	  str = str.toString();
	  return str.length < max ? this.pad("0" + str, max) : str;
	}

  ListarClasificadores(id_demanda) {
    this.total = 0;
    this.demandaService.listarClasificador(id_demanda).subscribe(
      res =>{
        this.lista_clasificador = res;
        for(let i=0; i < this.lista_clasificador["length"]; i++){
          this.total = this.total + this.lista_clasificador[i].monto;
        }
      }
    );
  }

  getAllUnidadMedida() {
    this.unidadMedidaService.getAllUnidadMedida().subscribe(res => {
      this.lista_unidad = res;
      if(res["length"]>0){
        this.id_unidad = this.lista_unidad[0].id;
      }
    });
  }

  exportAsXLSX(): void {
    this.flagbtn = false;
    this.lista_adi = null;

    this.demandaService.lista_reporte(this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      // console.log(res);
      this.lista_adi = res;

      var excel = [];
      this.lista_adi.forEach(row => {
        let data = {
          FICHA: row.codigo,
          CODIGO_PROGRAMA: row.codigo_programa,
          PROGRAMA_PRESUPUESTAL: row.programa,
          CODIGO_ACTIVIDAD: row.codigo_actividad,
          ACTIVIDAD_PRESUPUESTAL: row.actividad,
          CC: row.nombre_organo,
          UGP: row.ugp_nombre,
          PRODUCTO: row.producto_nombre,
          ACCION: row.accion_nombre,
          BIEN: row.bien,
          CLASIFICADOR: row.clasificador,
          PRECIO: row.precio,
          UNIDAD: row.cantidad,
          MONTO: row.monto,
        };
        excel.push(data);

      });
      this.excelService.exportAsExcelFile(excel, 'reporte_siga');
      this.flagbtn = true;
    });

  }
}
