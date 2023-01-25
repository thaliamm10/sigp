import {Component, OnInit} from '@angular/core';
import {AccionEstrategicaService} from "../../../services/accion-estrategica.service";
import {ExcelServicesService} from "../../../services/excel-services.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-rep-metas-servidores',
  templateUrl: './rep-metas-servidores.component.html',
  styleUrls: ['./rep-metas-servidores.component.css']
})

export class RepMetasServidoresComponent implements OnInit {
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
    this.accionEstrategicaService.getRepMetaPersonal(this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.listaAe = res;
    });
  }

  exportAsXLSX(): void {
    this.flagbtn = false;
    var excel = [];
    this.accionEstrategicaService.getRepMetaPersonal(this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      // console.log(res);

      this.listaAe = res;

      this.listaAe.forEach(row => {
        let data = {
          OBJETIVO: row.OBJETIVO,
          ACCION: row.ACCION,
          ESTANDAR_ACCION: row.ESTANDAR_ACCION,
          MEDIO_VERIFICACION: row.MEDIO_VERIFICACION,
          PERIODICIDAD: row.PERIODICIDAD,
          UNIDAD_MEDIDA: row.UNIDAD_MEDIDA,
          ID_CICLO: row.ID_CICLO,
          ID_ETAPA: row.ID_ETAPA,
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
      this.excelService.exportAsExcelFile(excel, 'reporte-metasgdr-directivos');
    });
  }

}

