import { Component, OnInit } from '@angular/core';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { PpaService } from 'src/app/services/ppa.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrganoService } from 'src/app/services/organo.service';
import { UgpService } from 'src/app/services/ugp.service';
import { ExcelServicesService } from 'src/app/services/excel-services.service';
import { CicloService } from '../../../services/ciclo.service';
import { AperturaService } from '../../../services/apertura-service';
import { BienesService } from '../../../services/bienes.service';

@Component({
  selector: 'app-reporte-opp10',
  templateUrl: './reporte-opp10.component.html',
  styleUrls: ['./reporte-opp10.component.css']
})
export class ReporteOpp10Component implements OnInit {

  listaBienes : any = new Array();
  lista_bienes : any = new Array();
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

  total_financiamiento: number;

  constructor(
    private toastService: ToastrServiceService,
    private ppaService: PpaService,
    private ugpService: UgpService,
    private authService: AuthService,
    private organoService: OrganoService,
    private excelService:ExcelServicesService,
    private cicloService: CicloService,
    private aperturaService: AperturaService,
    private bienesService: BienesService,
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
        //CC: row.nombre_organo,
        //UGP: row.nombre_ugp,
        //PRODUCTO: row.nombre_producto,
        //ACCION: row.nombre_accion,
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
    this.excelService.exportAsExcelFile(excel, 'reporte-financimiento-mensual');
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
        this.id_ciclo = this.user.anio;
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

    this.ugpService.getAllUGPxFiltro(this.user.codigo, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_ugp = res;
      this.id_ugp = (res["length"]>0) ? this.lista_ugp[0].id :0;
      this.ListarMensual();
    });
  }

  getAllReporte()
  {
    this.lista_bienes=null;
    this.anio=2020;
    this.total_bienes=0;
    //console.log(this.id_ugp);
    this.ppaService.getAllReporteOPP10(this.anio,this.user.codigo, this.canalizador, this.id_ugp, this.id_ciclo, this.id_etapa).subscribe(
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

  ListarMensual(){
    this.lista_bienes = null;
    this.cantidad_lista = null;
    this.total_financiamiento = 0;
    this.bienesService.getAllFinanciamientoMensualxUGP(this.id_ugp,this.canalizador,this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.listaBienes = res;
      // console.log("listaBienes", this.listaBienes);
      this.lista_bienes = this.listaBienes.lista_bienes;
      this.cantidad_lista = this.listaBienes.lista_bienes["length"];
      for(let i=0; i<this.lista_bienes.length;i++){
        this.sumarTotal(i);
      }
      for(let n = 0; n < this.lista_bienes.length; n++){
        for (let k = 0; k < this.lista_bienes[n].lista_periodo.length; k++) {
          this.total_financiamiento = this.total_financiamiento + this.lista_bienes[n].lista_periodo[k].monto_rdr +
            this.lista_bienes[n].lista_periodo[k].monto_ro;
        }
      }

    })
  }

  sumarTotal(index){
    var rdr = 0;
    var ro = 0;
    for (let k = 0; k < this.lista_bienes[index].lista_periodo.length; k++) {
      rdr = rdr + this.lista_bienes[index].lista_periodo[k].monto_rdr;
      ro = ro + this.lista_bienes[index].lista_periodo[k].monto_ro;
      this.lista_bienes[index].lista_periodo[k].monto = this.lista_bienes[index].lista_periodo[k].monto_rdr +
        this.lista_bienes[index].lista_periodo[k].monto_ro;
    }
    this.lista_bienes[index].rdr = rdr;
    this.lista_bienes[index].ro = ro;
  }
}
