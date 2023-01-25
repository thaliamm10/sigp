import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrganoService } from 'src/app/services/organo.service';

@Component({
  selector: 'app-reporte-opp9',
  templateUrl: './reporte-opp9.component.html',
  styleUrls: ['./reporte-opp9.component.css']
})
export class ReporteOpp9Component implements OnInit {
  id_centro_costo: number;
  lista_organo: Object;
  constructor(    
    private authService: AuthService,   
    private organoService: OrganoService
  ) { }

  ngOnInit() {
    this.getAllOrgano();
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
      this.id_centro_costo = (res["length"]>0) ? this.lista_organo[0].id :0;
      // this.getAllReporte();
    });
  }

}
