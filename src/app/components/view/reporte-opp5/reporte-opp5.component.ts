import { Component, OnInit } from '@angular/core';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { PpaService } from 'src/app/services/ppa.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrganoService } from 'src/app/services/organo.service';
import { UgpService } from 'src/app/services/ugp.service';
import { CicloService } from '../../../services/ciclo.service';
import { AperturaService } from '../../../services/apertura-service';

@Component({
  selector: 'app-reporte-opp5',
  templateUrl: './reporte-opp5.component.html',
  styleUrls: ['./reporte-opp5.component.css']
})
export class ReporteOpp5Component implements OnInit {

  lista_ugp: Object;
  lista_ugp_ml: Object;
  lista_organo: Object;
  id_ugp: number;
  id_centro_costo: number;
  cantidad_lista: number;
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
    private cicloService: CicloService,
    private aperturaService: AperturaService
  ) { }

  ngOnInit() {

    this.user = this.authService.getUserLoggedIn();
    // this.getAllUGP();
    this.id_ugp = 0;
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
  
  getAllUGP() {
    this.ugpService.getAllUGPxFiltro(this.user.codigo, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_ugp_ml = res;
      this.id_ugp = (res["length"]>0) ? this.lista_ugp_ml[0].id :0;
      this.getAllOrgano();
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
    this.lista_ugp=null;
    this.ppaService.getAllReporteOPP5(this.user.codigo,this.id_centro_costo, this.id_ugp, this.id_ciclo, this.id_etapa).subscribe(
      res => {
        // console.log(this.lista_ugp);
        this.lista_ugp = res;
        this.cantidad_lista = res["length"];
      },
      err => {
        this.toastService.showError(
          "Problemas para conectar al servidor.",
          "Error"
        );
        // console.log(this.lista_ugp);
      }
    );

  }
}
