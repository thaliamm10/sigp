import { Component, OnInit } from '@angular/core';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { PpaService } from 'src/app/services/ppa.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrganoService } from 'src/app/services/organo.service';
import { UgpService } from 'src/app/services/ugp.service';
import { ExcelServicesService } from 'src/app/services/excel-services.service';
import { CicloService } from '../../../services/ciclo.service';
import { AperturaService } from '../../../services/apertura-service';

@Component({
  selector: 'app-reporte-opp4',
  templateUrl: './reporte-opp4.component.html',
  styleUrls: ['./reporte-opp4.component.css']
})
export class ReporteOpp4Component implements OnInit {

  lista_ugp: any = new Array();
  lista_ugp_ml: Object;
  lista_organo: Object;
  id_ugp: number;
  id_centro_costo: number;
  cantidad_lista: number;
  user: any;
  total_comision: number;
  term: any;

  lista_ciclo : Object;
  id_ciclo: number = 0;
  lista_etapa: Object;
  id_etapa: number = 0;

  constructor(
    private toastService: ToastrServiceService,
    private ppaService: PpaService, 
    private ugpService: UgpService,
    private authService: AuthService,   
    private organoService: OrganoService,
    private excelService:ExcelServicesService,
    private cicloService: CicloService,
    private aperturaService: AperturaService
  ) { }

  exportAsXLSX():void {  
    var excel=[]; 
    this.lista_ugp.forEach(ugp => { 
      
      ugp.lista_producto.forEach(prod => {
        prod.lista_accion.forEach(acc => {
          acc.lista_clasificador.forEach(bien => {
            let array_mes = [];
            bien.lista_periodo.forEach(item => {
              array_mes.push(item.monto);
            });

            let data = {              
              UGP: ugp.nombre,
              PRODUCTO: prod.nombre,
              ACCION: acc.nombre,
              CODIGO: bien.CODIGO,
              CLASIFICADOR: bien.DESCRIPCION,
              ENE: array_mes[0],
              FEB: array_mes[1],
              MAR: array_mes[2],
              ABR: array_mes[3],
              MAY: array_mes[4],
              JUN: array_mes[5],
              JUL: array_mes[6],
              AGO: array_mes[7],
              SET: array_mes[8],
              OCT: array_mes[9],
              NOV: array_mes[10],
              DIC: array_mes[11],
              TOTAL: bien.MONTO
            }
            excel.push(data); 
          });
        });        
      });
    });
    this.excelService.exportAsExcelFile(excel, 'reporte_comision_accion');  
  } 

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    // this.getAllUGP();
    this.id_ugp = 0;
    this.getAllCiclo();
    this.getAllEtapa();
    this.getAllOrgano();
  }

  getAllCiclo() {
    this.cicloService.getAllCicloActivos().subscribe(res => {
      this.lista_ciclo = res;
      if(res["length"]>0){
        this.id_ciclo = this.user.id_ciclo;
      }      
    });
  }

  getAllEtapa(){
    this.aperturaService.getAllEtapa2().subscribe(res => {
      this.lista_etapa = res;
      if(res["length"]>0){
        this.id_etapa = this.user.id_etapa;
      }
    });
  }

  getAllUGP() {
    this.ugpService.getAllUGPxFiltro(this.user.codigo, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_ugp_ml = res;
      this.id_ugp = (res["length"]>0) ? this.lista_ugp_ml[0].id :0;
      this.getAllOrgano();
    });
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
      this.id_centro_costo = (res["length"]>0) ? this.lista_organo[0].id :0;
      this.getAllReporte();
    });
  }

  getAllReporte()
  {
    this.lista_ugp=null;
    this.ppaService.getAllReporteOPP4(this.user.codigo,this.id_centro_costo, this.id_ugp, this.id_ciclo, this.id_etapa).subscribe(
      res => {
        this.lista_ugp = res;
        this.cantidad_lista = res["length"];
        this.total_comision = 0;
        for(let i=0;i<this.lista_ugp["length"];i++){          
          for(let j=0;j<this.lista_ugp[i].lista_producto["length"];j++){
            for(let k=0;k<this.lista_ugp[i].lista_producto[j].lista_accion["length"];k++){
              for(let n=0;n<this.lista_ugp[i].lista_producto[j].lista_accion[k].lista_clasificador["length"];n++){
              this.total_comision = this.total_comision + this.lista_ugp[i].lista_producto[j].lista_accion[k].lista_clasificador[n].MONTO;
              }
            }
          }
        }
      },
      err => {
        this.toastService.showError(
          "Problemas para conectar al servidor.",
          "Error"
        );
      }
    );

  }
}
