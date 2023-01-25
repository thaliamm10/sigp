import {Component, OnInit} from '@angular/core';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {PpaService} from 'src/app/services/ppa.service';
import {OrganoService} from 'src/app/services/organo.service';
import {AuthService} from 'src/app/services/auth.service';
import {CicloService} from '../../../services/ciclo.service';
import {AperturaService} from '../../../services/apertura-service';
import {AccionEstrategicaService} from "../../../services/accion-estrategica.service";
import {ExcelServicesService} from "../../../services/excel-services.service";

@Component({
  selector: 'app-reporte-opp2',
  templateUrl: './reporte-opp2.component.html',
  styleUrls: ['./reporte-opp2.component.css']
})
export class ReporteOpp2Component implements OnInit {
  lista_ugp: Object;
  lista_organo: Object;
  id_centro_costo: number;
  cantidad_lista: number;
  user: any;

  lista_ciclo: Object;
  id_ciclo: number = 0;
  lista_etapa: Object;
  id_etapa: number = 0;

  listaAe: any;
  p: any;
  flagbtn = true;


  constructor(
    private toastService: ToastrServiceService,
    private ppaService: PpaService,
    private authService: AuthService,
    private organoService: OrganoService,
    private cicloService: CicloService,
    private aperturaService: AperturaService,
    private accionEstrategicaService: AccionEstrategicaService,
    private excelService: ExcelServicesService,
  ) {
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllCiclo();
    this.getAllEtapa();
    this.getAllOrgano();
  }

  getAllCiclo() {
    this.cicloService.getAllCicloActivos().subscribe(res => {
      this.lista_ciclo = res;
      if (res["length"] > 0) {
        this.id_ciclo = this.user.id_ciclo;
      }
    });
  }

  getAllEtapa() {
    this.aperturaService.getAllEtapa2().subscribe(res => {
      this.lista_etapa = res;
      if (res["length"] > 0) {
        this.id_etapa = this.user.id_etapa;
      }
    });
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
      if (res["length"] != 0) {
        this.id_centro_costo = this.lista_organo[0].id;
        this.getAllReporte();
      }
    });
  }

  getAllReporte() {
    this.lista_ugp = null;
    this.ppaService.getAllReporteOPP2(this.user.codigo, this.id_centro_costo, this.id_ciclo, this.id_etapa).subscribe(
      res => {
        this.lista_ugp = res;
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

  exportAsXLSX(): void {
    this.flagbtn = false;
    var excel = [];
    this.accionEstrategicaService.getRepMetaPersonal2(this.user.id_ciclo, this.user.id_etapa,this.user.codigo, this.id_centro_costo).subscribe(res => {
      // console.log(res);

      this.listaAe = res;

      this.listaAe.forEach(row => {
        let data = {
          NOMBRE_UGP: row.nombre_ugp,
          NOMBRE_PRODUCTO: row.nombre_producto,
          ANIO: row.anio,
          CODIGO_PLAZA: row.codigo_plaza,
          CARGO: row.CARGO,
          NOMBRE_PLAZA:row.nombre_plaza,
          OBJETIVO: row.OBJETIVO,
          ACCION: row.ACCION,
          ESTANDAR_ACCION: row.ESTANDAR_ACCION,
          MEDIO_VERIFICACION: row.MEDIO_VERIFICACION,
          PERIODICIDAD: row.PERIODICIDAD,
          UNIDAD_MEDIDA: row.UNIDAD_MEDIDA,
          ENE: row.ENE,
          FEB: row.FEB,
          MAR: row.MAR,
          ABR: row.ABR,
          MAY: row.MAY,
          JUN: row.JUN,
          JUL: row.JUL,
          AGO: row.AGO,
          SEP: row.SEP,
          OCT: row.OCT,
          NOV: row.NOV,
          DIC: row.NOV
        };
        excel.push(data);
      });
      this.flagbtn = true;
      this.excelService.exportAsExcelFile(excel, 'reporte-metasgdr-servidores');
    });
  }
}
