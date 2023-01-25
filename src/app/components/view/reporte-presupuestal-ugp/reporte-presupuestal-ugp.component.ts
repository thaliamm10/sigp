import {Component, OnInit} from '@angular/core';
import {ReporteService} from 'src/app/services/reporte.service'
import {from} from 'rxjs';
import {ExcelServicesService} from 'src/app/services/excel-services.service';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import {AuthService} from 'src/app/services/auth.service';
import {CicloService} from '../../../services/ciclo.service';
import {AperturaService} from '../../../services/apertura-service';

@Component({
  selector: 'app-reporte-presupuestal-ugp',
  templateUrl: './reporte-presupuestal-ugp.component.html',
  styleUrls: ['./reporte-presupuestal-ugp.component.css']
})
export class ReportePresupuestalUgpComponent implements OnInit {
  lista_siga: any = new Array();
  lista_financiado: any = new Array();
  user: any;
  lista_reporte: any;
  cantidad_lista: number;
  flag_btn: boolean = false;

  lista_ciclo: Object;
  id_ciclo: number = 0;
  anio: number;
  lista_etapa: Object;
  id_etapa: number = 0;
  etapa: string;

  constructor(
    private reporteSRV: ReporteService,
    private authService: AuthService,
    private excelService: ExcelServicesService,
    private cicloService: CicloService,
    private aperturaService: AperturaService
  ) {
  }

  exportAsXLSX1(): void {
    this.lista_siga = null;

    this.reporteSRV.getReportePrepSIGA(this.user.anio, this.user.codigo).subscribe(res => {
      // console.log(res);
      this.lista_siga = res;

      var excel = [];
      this.lista_siga.forEach(row => {
        let array_mes_monto = [];
        let array_mes_cantidad = [];
        row.lista.forEach(item => {
          array_mes_monto.push(item.monto);
          array_mes_cantidad.push(item.cantidad);
        });

        let data = {
          ORGANO: row.nombre_organo,
          UNIDAD_ORGANO: row.nombre_unidad_organo,
          META: row.id_meta,
          CONTRATO: row.tipo_contrato,
          PROGRAMA: row.tipo_programa,
          RDR: row.rdr,
          RO: row.ro,
          TAREA: row.tarea,
          CLASIFICADOR: row.clasificador,
          BIEN: row.nombre_bien,
          SIGA: row.codigo_siga,
          UNIDAD: row.unidad,
          PRECIO: row.precio,
          ENE: array_mes_cantidad[0],
          FEB: array_mes_cantidad[1],
          MAR: array_mes_cantidad[2],
          ABR: array_mes_cantidad[3],
          MAY: array_mes_cantidad[4],
          JUN: array_mes_cantidad[5],
          JUL: array_mes_cantidad[6],
          AGO: array_mes_cantidad[7],
          SET: array_mes_cantidad[8],
          OCT: array_mes_cantidad[9],
          NOV: array_mes_cantidad[10],
          DIC: array_mes_cantidad[11],
          ENE1: array_mes_monto[0],
          FEB1: array_mes_monto[1],
          MAR1: array_mes_monto[2],
          ABR1: array_mes_monto[3],
          MAY1: array_mes_monto[4],
          JUN1: array_mes_monto[5],
          JUL1: array_mes_monto[6],
          AGO1: array_mes_monto[7],
          SET1: array_mes_monto[8],
          OCT1: array_mes_monto[9],
          NOV1: array_mes_monto[10],
          DIC1: array_mes_monto[11]
        }
        excel.push(data);

      });
      this.excelService.exportAsExcelFile(excel, 'reporte_siga');
    });

  }

  exportAsXLSX2(): void {
    this.lista_financiado = null;
    this.flag_btn = true;
    this.reporteSRV.getReporteFinanciado2(this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      // console.log(res);
      this.flag_btn = false;
      this.lista_financiado = res;


      var excel = [];
      this.lista_financiado.forEach(row => {
        let array_mes_monto_ro = [];
        let array_mes_monto_rdr = [];
        let array_mes_cantidad_ro = [];
        let array_mes_cantidad_rdr = [];
        row.lista.forEach(item => {
          array_mes_monto_ro.push(item.monto_ro);
          array_mes_monto_rdr.push(item.monto_rdr);
          array_mes_cantidad_ro.push(item.cantidad_ro);
          array_mes_cantidad_rdr.push(item.cantidad_rdr);
        });

        let data = {
          NOMBRE_ORGANO: row.nombre_organo,
          NOMBRE_UNIDAD_ORGANO: row.nombre_unidad_organo,
          SECUENCIA: row.secuencia,
          META: row.meta,
          CODIGO_CATEGORIA: row.codigo_categoria,
          CATEGORIA: row.categoria,
          CODIGO_PROGRAMA: row.codigo_programa,
          PROGRAMA: row.programa,
          TAREA: row.tarea,
          CODIGO_PRODUCTO: row.codigo_producto,
          PRODUCTO: row.producto,
          CODIGO_ACTIVIDAD: row.codigo_actividad,
          ACTIVIDAD: row.actividad,
          CODIGO_FUNCION: row.codigo_funcion,
          FUNCION: row.funcion,
          CODIGO_DIVISION: row.codigo_division,
          DIVISION: row.division,
          CODIGO_GRUPO: row.codigo_grupo,
          GRUPO: row.grupo,
          CODIGO_FINALIDAD: row.codigo_finalidad,
          FINALIDAD: row.finalidad,
          DEPARTAMENTO: row.departamento,
          PROVINCIA: row.provincia,
          DISTRITO: row.distrito,
          UGP: row.ugp_nombre,
          PRODUCTO_UGP: row.producto_nombre,
          ACCION_UGP: row.accion_nombre,
          UNIDAD: row.unidad,
          BIEN: row.bien,
          CODIGO_BIEN: row.codigo_bien,
          CLASIFICADOR: row.clasificador,
          PRECIO: row.precio,

          CANT_ENE_RO: array_mes_cantidad_ro[0],
          CANT_FEB_RO: array_mes_cantidad_ro[1],
          CANT_MAR_RO: array_mes_cantidad_ro[2],
          CANT_ABR_RO: array_mes_cantidad_ro[3],
          CANT_MAY_RO: array_mes_cantidad_ro[4],
          CANT_JUN_RO: array_mes_cantidad_ro[5],
          CANT_JUL_RO: array_mes_cantidad_ro[6],
          CANT_AGO_RO: array_mes_cantidad_ro[7],
          CANT_SET_RO: array_mes_cantidad_ro[8],
          CANT_OCT_RO: array_mes_cantidad_ro[9],
          CANT_NOV_RO: array_mes_cantidad_ro[10],
          CANT_DIC_RO: array_mes_cantidad_ro[11],
          CANT_ENE_DRD: array_mes_cantidad_rdr[0],
          CANT_FEB_DRD: array_mes_cantidad_rdr[1],
          CANT_MAR_DRD: array_mes_cantidad_rdr[2],
          CANT_ABR_DRD: array_mes_cantidad_rdr[3],
          CANT_MAY_DRD: array_mes_cantidad_rdr[4],
          CANT_JUN_DRD: array_mes_cantidad_rdr[5],
          CANT_JUL_DRD: array_mes_cantidad_rdr[6],
          CANT_AGO_DRD: array_mes_cantidad_rdr[7],
          CANT_SET_DRD: array_mes_cantidad_rdr[8],
          CANT_OCT_DRD: array_mes_cantidad_rdr[9],
          CANT_NOV_DRD: array_mes_cantidad_rdr[10],
          CANT_DIC_DRD: array_mes_cantidad_rdr[11],
          MONTO_ENE_RO: array_mes_monto_ro[0],
          MONTO_FEB_RO: array_mes_monto_ro[1],
          MONTO_MAR_RO: array_mes_monto_ro[2],
          MONTO_ABR_RO: array_mes_monto_ro[3],
          MONTO_MAY_RO: array_mes_monto_ro[4],
          MONTO_JUN_RO: array_mes_monto_ro[5],
          MONTO_JUL_RO: array_mes_monto_ro[6],
          MONTO_AGO_RO: array_mes_monto_ro[7],
          MONTO_SET_RO: array_mes_monto_ro[8],
          MONTO_OCT_RO: array_mes_monto_ro[9],
          MONTO_NOV_RO: array_mes_monto_ro[10],
          MONTO_DIC_RO: array_mes_monto_ro[11],
          MONTO_ENE_RDR: array_mes_monto_rdr[0],
          MONTO_FEB_RDR: array_mes_monto_rdr[1],
          MONTO_MAR_RDR: array_mes_monto_rdr[2],
          MONTO_ABR_RDR: array_mes_monto_rdr[3],
          MONTO_MAY_RDR: array_mes_monto_rdr[4],
          MONTO_JUN_RDR: array_mes_monto_rdr[5],
          MONTO_JUL_RDR: array_mes_monto_rdr[6],
          MONTO_AGO_RDR: array_mes_monto_rdr[7],
          MONTO_SET_RDR: array_mes_monto_rdr[8],
          MONTO_OCT_RDR: array_mes_monto_rdr[9],
          MONTO_NOV_RDR: array_mes_monto_rdr[10],
          MONTO_DIC_RDR: array_mes_monto_rdr[11],

          TOTAL_DRD: row.total_drd,
          TOTAL_RO: row.total_ro,
        }
        excel.push(data);

      });
      this.excelService.exportAsExcelFile(excel, 'reporte_siga');
    });

  }

  exportAsXLSX(): void {
    var excel = [];
    this.lista_reporte.forEach(row => {
      let array_mes = [];
      row.lista_clasificador.forEach(item => {
        array_mes.push(item.MONTO);
      });

      let data = {
        UGP: row.nombre_ugp,
        PRODUCTO: row.nombre_organo,
        ACCION: row.nombre_personal,
        GG23: array_mes[0],
        GG25: array_mes[1],
        GG26: array_mes[2],
        TOTAL: row.total,
        TOPE: row.tope,
        SALDO: row.saldo
      }
      excel.push(data);

    });
    this.excelService.exportAsExcelFile(excel, 'reporte_gasto_variable');
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.anio = this.user.anio;
    this.etapa = this.user.nombre_etapa;
    this.getAllReporte();
  }

  getAllReporte() {
    this.lista_reporte = null;
    this.cantidad_lista = null;
    this.reporteSRV.getReportePrep(this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.cantidad_lista = res["length"];
      this.lista_reporte = res;
      // console.log(res);
    });
  }

}
