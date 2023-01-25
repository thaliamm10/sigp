import { Component, OnInit } from '@angular/core';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { TopePresupuestalService } from 'src/app/services/tope-presupuestal.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tope-integral',
  templateUrl: './tope-integral.component.html',
  styleUrls: ['./tope-integral.component.css']
})
export class TopeIntegralComponent implements OnInit {

  lista_tope_integral : Object;
  lista_generica : any = new Array();
  lista_fuente : any = new Array();
  lista : any = new Array();
  total_presupuesto : number;
  user : any;

  constructor(
    private topePresupuestal: TopePresupuestalService,
    private toastService: ToastrServiceService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.total_presupuesto = 0;
    this.getAllTope();
  }

  public validarSoloNumeros(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {      
      return false;
    }
    return true;
  }

  getAllTope(){
    this.topePresupuestal.getAllTopeIntegral(this.user.anio,this.user.id_etapa).subscribe(res =>{
      this.lista_tope_integral = res;
      console.log(res);
      for (let n = 0; n < this.lista_tope_integral["length"]; n++) {
        for (let m = 0; m < this.lista_tope_integral[n].lista_generica.length; m++) {
          this.total_presupuesto = this.total_presupuesto + this.lista_tope_integral[n].lista_generica[m].tope;
        }
      }
    });
  }

  sumarTotal(index_ugp, index_generica){
    this.total_presupuesto = 0;
    for (let n = 0; n < this.lista_tope_integral["length"]; n++) {
      if(index_ugp == n){
        this.lista_tope_integral[n].tope = 0;
      }
      for (let m = 0; m < this.lista_tope_integral[n].lista_generica.length; m++) {
        if(index_generica == m && index_ugp == n){
          this.lista_tope_integral[n].lista_generica[m].tope = 0;
        }
        for(let p = 0; p < this.lista_tope_integral[n].lista_generica[m].lista_fuente.length; p++){
          if(index_ugp == n && index_generica == m){
            this.lista_tope_integral[n].lista_generica[m].tope = this.lista_tope_integral[n].lista_generica[m].tope + this.lista_tope_integral[n].lista_generica[m].lista_fuente[p].monto;
          }
        }
        this.total_presupuesto = this.total_presupuesto + this.lista_tope_integral[n].lista_generica[m].tope;
        if(index_ugp == n){
          this.lista_tope_integral[n].tope = this.lista_tope_integral[n].tope + this.lista_tope_integral[n].lista_generica[m].tope;
          
        }
      }
    }
  }

  guardarTopeIntegral(){
    var trama_xml='<TOPE>';
    for (let n = 0; n < this.lista_tope_integral["length"]; n++) {
      for (let m = 0; m < this.lista_tope_integral[n].lista_generica.length; m++) {
        for(let p = 0; p < this.lista_tope_integral[n].lista_generica[m].lista_fuente.length; p++){
          trama_xml =  trama_xml + "<r>";
          trama_xml =  trama_xml + "<ugp>" + this.lista_tope_integral[n].lista_generica[m].lista_fuente[p].id_ugp + "</ugp>";
          trama_xml =  trama_xml + "<generica>" + this.lista_tope_integral[n].lista_generica[m].lista_fuente[p].id_generica + "</generica>";
          trama_xml =  trama_xml + "<fuente>" + this.lista_tope_integral[n].lista_generica[m].lista_fuente[p].id_fuente + "</fuente>";
          trama_xml =  trama_xml + "<monto>" + this.lista_tope_integral[n].lista_generica[m].lista_fuente[p].monto + "</monto>";
          trama_xml =  trama_xml + "</r>";
        }
      }      
    }
    trama_xml =  trama_xml + "</TOPE>";
    this.topePresupuestal.guardarTopeIntegral(trama_xml).subscribe(
      res => {
        this.toastService.showSuccess("Se modificó la cantidad.", "Correcto");
      },
      err => {
        this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message,"Error"
        );
      }
    );
  }
}
