import { Component, OnInit } from '@angular/core';
import {AccionEstrategicaService} from "../../../services/accion-estrategica.service";
import {ExcelServicesService} from "../../../services/excel-services.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-rep-metas-subdirectivos',
  templateUrl: './rep-metas-subdirectivos.component.html',
  styleUrls: ['./rep-metas-subdirectivos.component.css']
})
export class RepMetasSubdirectivosComponent implements OnInit {
  listaAe: any;
  p: any;
  flagbtn = true;
  user: any;

  constructor(
    private accionEstrategicaService: AccionEstrategicaService,
    private excelService: ExcelServicesService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllAE();
  }

  getAllAE() {
    this.accionEstrategicaService.getRepMetaSubdirecion(this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.listaAe = res;
    });
  }

  exportAsXLSX(): void {
    this.flagbtn = false;
    var excel = [];
    this.accionEstrategicaService.getRepMetaSubdirecion(this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      // console.log(res);
      this.listaAe = res;
      this.listaAe.forEach(row => {
        let data = {
          ACTIVIDAD_OPERATIVA: row.actividadOperativa,
          OBJETIVO: row.objetivo,
          ATRIBUTO: row.atributo,
          INDICADOR: row.indicador,
          FORMULA: row.formula,
          EVIDENCIA: row.evidencia,
          PRODUCTO: row.producto,
          UNIDAD_MEDIDA: row.unidadMedida,
          META: row.meta
        };
        excel.push(data);
      });
      this.flagbtn = true;
      this.excelService.exportAsExcelFile(excel, 'reporte-metasgdr-subdirectivos');
    });
  }

}
