import { Component, OnInit } from '@angular/core';
import {AccionEstrategicaService} from "../../../services/accion-estrategica.service";
import {ExcelServicesService} from "../../../services/excel-services.service";
@Component({
  selector: 'app-rep-metas-directivos',
  templateUrl: './rep-metas-directivos.component.html',
  styleUrls: ['./rep-metas-directivos.component.css']
})
export class RepMetasDirectivosComponent implements OnInit {
  listaAe: any;
  p: any;
  flagbtn = true;

  constructor(
    private accionEstrategicaService: AccionEstrategicaService,
    private excelService: ExcelServicesService,
  ) {
  }

  ngOnInit() {
    this.getAllAE();
  }

  getAllAE() {
    this.accionEstrategicaService.getRepAE().subscribe(res => {
      this.listaAe = res;
    });
  }

  exportAsXLSX(): void {
    this.flagbtn = false;
    var excel = [];
    this.accionEstrategicaService.getRepAE().subscribe(res => {
      // console.log(res);

      this.listaAe = res;

      this.listaAe.forEach(row => {
        let data = {
          ACCION_ESTRATEGICA: row.ACCION_ESTRATEGICA,
          INDICADOR: row.indicador,
          OBJETIVO: row.objetivo,
          PRODUCTO: row.producto,
          INDICADOR_GDR: row.indicador_gdr,
          ATRIBUTO_INDICADOR: row.atributo_indicador,
          FORMULA_CALCULO: row.formula_calculo,
          EVIDENCIA: row.evidencia,
          META: (row.VALOR_BASE * 100) + '%'
        };
        excel.push(data);
      });
      this.flagbtn = true;
      this.excelService.exportAsExcelFile(excel, 'reporte-metasgdr-directivos');
    });
  }

}
