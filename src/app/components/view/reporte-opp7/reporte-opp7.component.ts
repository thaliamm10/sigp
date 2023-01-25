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
  selector: 'app-reporte-opp7',
  templateUrl: './reporte-opp7.component.html',
  styleUrls: ['./reporte-opp7.component.css']
})
export class ReporteOpp7Component implements OnInit {

  lista_vehiculos: any;
  lista_organo: Object;

  id_centro_costo: number;
  anio: number;
  cantidad_lista: number;
  total_bienes:number;
  user: any;

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
  ) { }

  exportAsXLSX():void {  
    var excel=[]; 
    this.lista_vehiculos.forEach(row => { 
      let array_mes = [];
      row.lista_periodo.forEach(item => {
        array_mes.push(item.km);
      });

      let data = {
        PLACA: row.nombre_vehiculo,
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
        DIC: array_mes[11]
      }
      excel.push(data); 
       
    });
    this.excelService.exportAsExcelFile(excel, 'meta_fisica');  
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
      this.id_centro_costo = (res["length"]>0) ? this.lista_organo[0].id :0;
      this.getAllReporte();
    });
  }

  getAllReporte()
  {
    this.lista_vehiculos=null;
    this.anio=2020;
    this.total_bienes=0;
    this.ppaService.getAllReporteOPP7(this.id_centro_costo,this.anio,this.user.codigo,this.id_ciclo,this.id_etapa).subscribe(
      res => {        
        this.lista_vehiculos = res;
        this.cantidad_lista = res["length"];
        // console.log(this.lista_vehiculos);

        for(let i=0; i< this.lista_vehiculos["length"]; i++){
          this.total_bienes = this.total_bienes + this.lista_vehiculos[i].monto;
        }

      },
      err => {
        this.toastService.showError(
          "Problemas para conectar al servidor.",
          "Error"
        );
        // console.log(this.lista_vehiculos);
      }
    );

  }
}

