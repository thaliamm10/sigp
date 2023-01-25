import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ExcelServicesService} from '../../../services/excel-services.service';
import {ReporteService} from '../../../services/reporte.service';

@Component({
  selector: 'app-reporte-general-demanda-adiccional',
  templateUrl: './reporte-general-demanda-adiccional.component.html',
  styleUrls: ['./reporte-general-demanda-adiccional.component.css']
})
export class ReporteGeneralDemandaAdiccionalComponent implements OnInit {

  user: any;
  anio: number;
  etapa: string;
  cantidad_lista: number;
  lista_rep: any;

  constructor(
    private authService: AuthService,
    private excelService: ExcelServicesService,
    private reporteSRV: ReporteService,
  ) {
  }

  getReporte(): void {
    this.cantidad_lista = null;
    this.reporteSRV.getReporteFinancMasPersonalDemandaAdicional(this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_rep = res;
      this.cantidad_lista = res['length'];
    });
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.anio = this.user.anio;
    this.etapa = this.user.nombre_etapa;
    this.getReporte();
  }

  exportAsXLSX(): void {
    let excel = [];
    this.lista_rep.forEach(row => {
      let array_mes_monto_ro = [];
      let array_mes_cantidad_ro = [];
      row.lista.forEach(item => {
        array_mes_monto_ro.push(item.monto_ro);
        array_mes_cantidad_ro.push(item.cantidad_ro);
      });

      let data = {
        ORIGEN: row.origen,
        CC: row.nombre_organo,
        UNIDAD_ORGANICA: row.nombre_unidad_organo,
        TIPO: row.canalizado_text,
        CANALIZADOR: row.organo_canalizador,
        CANAL: row.canal,
        META_PRESUPUESTAL: row.meta,
        SEC_FUNC: row.secuencia,
        CODIGO_CATEGORIA: row.codigo_categoria,
        CATEGORIA: row.categoria,
        CODIGO_PROGRAMA: row.codigo_programa,
        PROGRAMA: row.programa,
        TAREA: row.tarea,
        CODIGO_PRODUCTO_PRESUPUESTAL: row.codigo_producto,
        PRODUCTO_PRESUPUESTAL: row.producto,
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
        RESPONSABLE_UGP: row.responsable_ugp,
        UGP: row.ugp_nombre,
        PRODUCTO_UGP: row.producto_nombre,
        ACCION_UGP: row.accion_nombre,
        CLASIFICADOR: row.clasificador,
        CODIGO_BIEN: row.codigo_bien,
        BIEN: row.bien,
        UNIDAD: row.unidad,
        FTE_FTO: row.fte_fto,
        PRECIO_CATALOGO: row.precio,
        ENE: array_mes_monto_ro[0],
        CANTIDAD_ENE: array_mes_cantidad_ro[0],
        FEB: array_mes_monto_ro[1],
        CANTIDAD_FEB: array_mes_cantidad_ro[1],
        MAR: array_mes_monto_ro[2],
        CANTIDAD_MAR: array_mes_cantidad_ro[2],
        ABR: array_mes_monto_ro[3],
        CANTIDAD_ABR: array_mes_cantidad_ro[3],
        MAY: array_mes_monto_ro[4],
        CANTIDAD_MAY: array_mes_cantidad_ro[4],
        JUN: array_mes_monto_ro[5],
        CANTIDAD_JUN: array_mes_cantidad_ro[5],
        JUL: array_mes_monto_ro[6],
        CANTIDAD_JUL: array_mes_cantidad_ro[6],
        AGO: array_mes_monto_ro[7],
        CANTIDAD_AGO: array_mes_cantidad_ro[7],
        SET: array_mes_monto_ro[8],
        CANTIDAD_SET: array_mes_cantidad_ro[8],
        OCT: array_mes_monto_ro[9],
        CANTIDAD_OCT: array_mes_cantidad_ro[9],
        NOV: array_mes_monto_ro[10],
        CANTIDAD_NOV: array_mes_cantidad_ro[10],
        DIC: array_mes_monto_ro[11],
        CANTIDAD_DIC: array_mes_cantidad_ro[11],
        TOTAL: row.total,
      };
      excel.push(data);

    });
    this.excelService.exportAsExcelFile(excel, 'reporte_siga');
  }


}
