import { Component, OnInit } from '@angular/core';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { PpaService } from 'src/app/services/ppa.service';
import { OrganoService } from 'src/app/services/organo.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExcelServicesService } from 'src/app/services/excel-services.service';
import { CicloService } from '../../../services/ciclo.service';
import { AperturaService } from '../../../services/apertura-service';

@Component({
  selector: 'app-reporte-opp3',
  templateUrl: './reporte-opp3.component.html',
  styleUrls: ['./reporte-opp3.component.css']
})
export class ReporteOpp3Component implements OnInit {
  pfa: any;
  user: any;
  cantidad_lista: number;
  lista_organo: any = new Array();
  id_centro_costo: number;
  total_bienes: number;

  lista_ciclo : Object;
  id_ciclo: number = 0;
  lista_etapa: Object;
  id_etapa: number = 0;

  constructor(
    private toastService: ToastrServiceService,
    private ppaService: PpaService,
    private authService: AuthService,   
    private organoService: OrganoService,
    private excelService:ExcelServicesService,
    private cicloService: CicloService,
    private aperturaService: AperturaService
  ) { }

  exportAsXLSX():void {  
    var excel=[]; 
    this.pfa.forEach(ugp => { 
      
      ugp.lista_producto.forEach(prod => {
        prod.lista_accion.forEach(acc => {
          acc.lista_bienes.forEach(bien => {
            let array_mes = [];
            bien.lista_periodo.forEach(item => {
              array_mes.push(item.monto);
            });

            let data = {              
              UGP: ugp.nombre,
              PRODUCTO: prod.nombre,
              ACCION: acc.nombre,
              BIENES: bien.NOMBRE,
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
              TOTAL: bien.SUMA
            }
            excel.push(data); 
          });
        });        
      });
    });
    this.excelService.exportAsExcelFile(excel, 'reporte_presupuestal_accion');  
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
      if(res["length"]>0){
        this.id_ciclo = this.user.id_ciclo;
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

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
      if(this.user.id_estado == 3)
            this.lista_organo.push({id: 0, nombre: "---TODOS---"});
      if(res["length"]!=0){
        this.id_centro_costo = (this.user.id_estado == 3) ? 0 : this.lista_organo[0].id;
        this.getAllReporte();
      }
    });
  }

  getAllReporte()
  {
    this.pfa = null;
    this.ppaService.getAllReporteOPP3(this.user.codigo, this.id_centro_costo, this.id_ciclo, this.id_etapa).subscribe(
      res => {
        this.pfa = res;
        this.total_bienes = 0;
        //console.log(res);
        for(let i=0; i<res["length"];i++){
          // console.log(res[i].lista_producto["length"]);
          for(let s=0; s< res[i].lista_producto["length"];s++){
            // console.log(res[i].lista_producto[s].lista_accion["length"]);
            for(let t=0; t<res[i].lista_producto[s].lista_accion["length"];t++){
              // console.log(res[i].lista_producto[s].lista_accion[t].lista_bienes["length"]);
              for(let x=0; x<res[i].lista_producto[s].lista_accion[t].lista_bienes["length"];x++){
                // console.log(res[i].lista_producto[s].lista_accion[t].lista_bienes[x].SUMA);
                this.total_bienes =  this.total_bienes + res[i].lista_producto[s].lista_accion[t].lista_bienes[x].SUMA;
              }
            }
          }
        }
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

}
