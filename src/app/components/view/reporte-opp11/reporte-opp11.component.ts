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
  selector: 'app-reporte-opp11',
  templateUrl: './reporte-opp11.component.html',
  styleUrls: ['./reporte-opp11.component.css']
})
export class ReporteOpp11Component implements OnInit {

  lista_bienes: any;
  lista_organo: Object;

  id_centro_costo: number;
  anio: number;
  cantidad_lista: number;
  total_bienes:number;
  canalizador : number;
  user: any;

  lista_ugp: Object;
  id_ugp: number;
  x_progreso: boolean;

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
  ) { 
    this.canalizador = 0;
  }

  exportAsXLSX():void {  
    var excel=[]; 
    this.lista_bienes.forEach(row => { 
      let array_mes = [];
      row.lista_periodo.forEach(item => {
        array_mes.push(item.monto);
      });

      let data = {
        CLASIFICADOR: row.codigo_clasificador,
        BIENES: row.nombre_bienes,
        CC: row.nombre_organo,
        UGP: row.nombre_ugp,
        PRODUCTO: row.nombre_producto,
        ACCION: row.nombre_accion,
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
        TOTAL: row.monto
      }
      excel.push(data); 
       
    });
    this.excelService.exportAsExcelFile(excel, 'meta_fisica');  
  } 

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.x_progreso =false;
    this.getAllCiclo();
    this.getAllEtapa();
    this.getAllUGP();
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
    this.lista_ugp = null;
    this.x_progreso =false;
    
    this.ugpService.getAllUGPxFiltro(this.user.codigo, this.user.anio, this.user.id_etapa).subscribe(res => {
      this.lista_ugp = res;
      this.id_ugp = (res["length"]>0) ? this.lista_ugp[0].id :0;
      this.getAllReporte();
    });    
  }

  getAllReporte()
  {
    this.lista_bienes=null;
    this.anio=2020;
    this.total_bienes=0;
    // this.ppaService.getAllReporteOPP11(this.id_ugp, this.user.codigo).subscribe(
    //   res => {        
    //     this.lista_bienes = res;
    //     this.cantidad_lista = res["length"];
    //     for(let i=0; i< this.lista_bienes["length"]; i++){
    //       this.total_bienes = this.total_bienes + this.lista_bienes[i].monto;
    //     }
    //   },
    //   err => {
    //     this.toastService.showError("Problemas para conectar al servidor.","Error");
    //   }
    // );

  }
}
