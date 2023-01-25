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
  selector: 'app-reporte-opp6',
  templateUrl: './reporte-opp6.component.html',
  styleUrls: ['./reporte-opp6.component.css']
})

export class ReporteOpp6Component implements OnInit {

  lista_bienes: any;
  lista_organo: Object;

  id_centro_costo: number;
  anio: number;
  cantidad_lista: number;
  total_bienes:number;
  canalizador : number;
  user: any;

  lista_ugp: any = new Array();
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
      };
      excel.push(data);

    });
    this.excelService.exportAsExcelFile(excel, 'meta_fisica');
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.x_progreso =false;
    this.id_ciclo = this.user.id_ciclo;
    this.id_etapa = this.user.id_etapa;
    this.getAllUGP();
  }

  getAllUGP() {
    this.ugpService.getAllUGPxProgramacion(this.user.codigo,this.user.id_ciclo, this.user.id_etapa,0).subscribe(res => {
      // this.lista_ugp = res;
      console.log(res);
      if(res["length"]>0){
        this.lista_ugp.push({id: 0, nombre: "---TODOS---"});
        for(let i=0; i<res["length"]; i++){
          this.lista_ugp.push({id: res[i].id, nombre: res[i].nombre});
        }
      }
      this.id_ugp = (res["length"]>0) ? this.lista_ugp[0].id : -1;
      this.getAllReporte();
    });
  }

  getAllReporte()
  {
    this.lista_bienes=null;
    this.total_bienes=0;
    //console.log(this.id_ugp);
    this.ppaService.getAllReporteOPP6(this.user.anio, this.user.codigo, this.canalizador, this.id_ugp, this.user.id_ciclo, this.user.id_etapa).subscribe(
      res => {
        this.lista_bienes = res;
        this.cantidad_lista = res["length"];
        for(let i=0; i< this.lista_bienes["length"]; i++){
          this.total_bienes = this.total_bienes + this.lista_bienes[i].monto;
        }
      },
      err => {
        this.toastService.showError("Problemas para conectar al servidor.","Error");
      }
    );

  }
}
