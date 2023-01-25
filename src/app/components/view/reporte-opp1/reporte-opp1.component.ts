import { Component, OnInit } from '@angular/core';
import { PpaService } from 'src/app/services/ppa.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrganoService } from 'src/app/services/organo.service';
import { ExcelServicesService } from 'src/app/services/excel-services.service';
import { CicloService } from '../../../services/ciclo.service';
import { AperturaService } from '../../../services/apertura-service';
import { UgpService } from 'src/app/services/ugp.service';

@Component({
  selector: 'app-reporte-opp1',
  templateUrl: './reporte-opp1.component.html',
  styleUrls: ['./reporte-opp1.component.css']
})
export class ReporteOpp1Component implements OnInit {

  pfa: any;
  cantidad_lista: number;
  user: any;
  lista_organo: any = new Array();
  id_centro_costo: number = 0;

  lista_ugp: any = new Array();
  id_ugp: number = 0;
  lista_ciclo : Object;
  id_ciclo: number = 0;
  lista_etapa: Object;
  id_etapa: number = 0;

  constructor(
    private toastService: ToastrServiceService,
    private authService: AuthService,
    private ppaService: PpaService,
    private organoService: OrganoService,
    private excelService:ExcelServicesService,
    private cicloService: CicloService,
    private aperturaService: AperturaService,
    private ugpService: UgpService
  ) { }

  exportAsXLSX():void {  
    var excel=[]; 
    this.pfa.forEach(row => { 
      let array_mes = [];
      row.lista_periodo.forEach(item => {
        array_mes.push(item.cantidad);
      });

      let data = {
        UGP: row.nombre_ugp,
        PRODUCTO: row.nombre_producto,
        UNIDAD_MEDIDA_PRODUCTO: row.nombre_unidad_producto,
        ACCION: row.nombre_accion,
        UNIDAD_MEDIDA_aCCION: row.nombre_unidad,
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
        TOTAL: row.suma
      }
      excel.push(data);        
    });
    this.excelService.exportAsExcelFile(excel, 'reporte_meta_fisica');  
  } 


  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllUGP();
    this.getAllOrgano();
    this.getAllReporte();
  }

  getAllUGP() {
    this.ugpService.getAllUGPxProgramacion(this.user.codigo,this.user.id_ciclo, this.user.id_etapa,1).subscribe(res => {
      if(res["length"]>0){
        this.lista_ugp.push({id: 0, nombre: "---TODOS---"});
        for(let i=0; i<res["length"]; i++){
          this.lista_ugp.push({id: res[i].id, nombre: res[i].nombre});
        }
      }
      this.id_ugp = (res["length"]>0) ? this.lista_ugp[0].id : -1;
    });
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      if(res["length"]>0){
        this.lista_organo.push({id: 0, nombre: "---TODOS---"});
        for(let i=0; i<res["length"]; i++){
          this.lista_organo.push({id: res[i].id, nombre: res[i].nombre});
        }
      }
      this.id_centro_costo = (res["length"]>0) ? this.lista_organo[0].id : -1;
    });
  }

  getAllReporte()
  {
    this.pfa = null;
    this.ppaService.getAllReporteOPP1(this.id_ugp, this.user.codigo, this.id_centro_costo, this.user.id_ciclo, this.user.id_etapa).subscribe(
      
      res => {
        this.pfa = res;
      },
      err => {
        this.toastService.showError("Problemas para conectar al servidor.","Error");
      }
    );
  }

}
