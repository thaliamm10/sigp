import { Component, OnInit } from '@angular/core';
import { TopePresupuestalService } from 'src/app/services/tope-presupuestal.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tope-ugp',
  templateUrl: './tope-ugp.component.html',
  styleUrls: ['./tope-ugp.component.css']
})
export class TopeUgpComponent implements OnInit {
  lista_tope_ugp: Object;
  lista_tope_cc: Object;
  id_ugp:number;
  total_presupuesto: number;
  condicion: boolean;
  user: any;

  constructor(
    private topePresupuestal: TopePresupuestalService,
    private toastService: ToastrServiceService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.condicion = true;
    this.user = this.authService.getUserLoggedIn();
    this.getAllTope();
    this.total_presupuesto = 0;
  }

  getAllTope() {
    this.topePresupuestal.getAllTopeCC(0, this.user.anio, this.user.id_etapa).subscribe(res => {
      this.lista_tope_ugp = res;
      for (let n = 0; n < this.lista_tope_ugp["length"]; n++) {
        for (let m = 0; m < this.lista_tope_ugp[n].lista_cc.length; m++) {
          this.total_presupuesto = this.total_presupuesto + this.lista_tope_ugp[n].lista_cc[m].tope;
        }
      }
    });
  }

  public validarSoloNumeros(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {      
      return false;
    }
    return true;
  }

  sumarTotal(index_ugp, index_cc){
    this.total_presupuesto =0;
    for (let n = 0; n < this.lista_tope_ugp["length"]; n++) {
      if(index_ugp==n){
        this.lista_tope_ugp[n].tope=0;
      }
      for (let m = 0; m < this.lista_tope_ugp[n].lista_cc.length; m++) {
        this.total_presupuesto = this.total_presupuesto + this.lista_tope_ugp[n].lista_cc[m].tope;
        if(index_ugp==n){
          this.lista_tope_ugp[n].tope = this.lista_tope_ugp[n].tope + this.lista_tope_ugp[n].lista_cc[m].tope;
        }
      }
    }
  }

  guardarTopeUGP(){
    if(confirm("¿Está seguro qure va modificar los topes presupuestales por UGP y Centro de Costo?")){
      var trama_xml='<TOPE>';
      for (let n = 0; n < this.lista_tope_ugp["length"]; n++) {
        for (let m = 0; m < this.lista_tope_ugp[n].lista_cc.length; m++) {
          trama_xml =  trama_xml + "<r>";
          trama_xml =  trama_xml + "<ugp>" + this.lista_tope_ugp[n].lista_cc[m].id_ugp + "</ugp>";
          trama_xml =  trama_xml + "<cc>" + this.lista_tope_ugp[n].lista_cc[m].id_organo + "</cc>";
          trama_xml =  trama_xml + "<tope>" + this.lista_tope_ugp[n].lista_cc[m].tope + "</tope>";
          trama_xml =  trama_xml + "</r>";
        }      
      }
      trama_xml =  trama_xml + "</TOPE>";
      
      this.topePresupuestal.guardarTopeCC(trama_xml).subscribe(
        res => {this.toastService.showSuccess("Se modificó el tope presupuestal.", "Correcto");},
        err => {this.toastService.showError( "Se produjo un error en el servicio. Error: " + err.message,"Error");}
      );   
    }
    
  }

}
