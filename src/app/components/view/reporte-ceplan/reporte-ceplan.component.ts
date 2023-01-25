import { Component, OnInit } from '@angular/core';
import { OrganoService } from 'src/app/services/organo.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { tap } from "rxjs/operators";
import { CicloService } from 'src/app/services/ciclo.service';
import { AperturaService } from '../../../services/apertura-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reporte-ceplan',
  templateUrl: './reporte-ceplan.component.html',
  styleUrls: ['./reporte-ceplan.component.css']
})
export class ReporteCeplanComponent implements OnInit {
  data: any = Array();
  listaOrgano: Object;
  listaCiclo: Object;
  id_organo: any;
  id_anio: number;
  a: number;
  user: any;

  lista_etapa: Object;
  id_etapa: number = 0;

  constructor(
    private ReporteService: ReporteService,
    private cicloService: CicloService,
    private organoService: OrganoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllOrgano();
  }

  getAllOrgano() {
    this.data = [];
    this.organoService.getAllOrgano().subscribe(res => {
      this.listaOrgano = res;
      if(res["length"]!=0){
        this.id_organo = this.listaOrgano[0].id;
      }
    });
  }

  capturarIdOrgano() {
    this.data = null;
    this.ReporteService.getCeplan(this.user.anio, this.id_organo, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      let dato = res;
      // console.log(res["length"]);
      console.log(res);
      for (let k = 0; k < res["length"]; k++) {
        for(let j = 0; j < res[k].lista_ae.length; j++){
            for(let n = 0; n < res[k].lista_ae[j].lista_ao.length; n++){
              var suma_pf = 0;
              var suma_pp = 0;
              for(let m = 0; m < res[k].lista_ae[j].lista_ao[n].lista_periodo.length; m++){
                //console.log(suma_pp);
                suma_pf =  suma_pf + res[k].lista_ae[j].lista_ao[n].lista_periodo[m].suma_pf;
                suma_pp =  suma_pp + res[k].lista_ae[j].lista_ao[n].lista_periodo[m].suma_pp;
              }
              res[k].lista_ae[j].lista_ao[n].suma_pf = suma_pf;
              res[k].lista_ae[j].lista_ao[n].suma_pp = suma_pp;
            }
        }
      }
      this.data = dato; //JSON.parse(dato);
    });
  }

  imprimirReporte(){
    (window as any).print();
  }


}
