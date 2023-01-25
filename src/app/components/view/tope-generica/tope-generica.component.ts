import { Component, OnInit } from '@angular/core';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { TopePresupuestalService } from 'src/app/services/tope-presupuestal.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tope-generica',
  templateUrl: './tope-generica.component.html',
  styleUrls: ['./tope-generica.component.css']
})

export class TopeGenericaComponent implements OnInit {
  lista_tope_ugp: Object;
  lista_tope_generica: Object;
  lista_generica: any = new Array();
  lista : any = new Array();
  total_presupuesto: number;
  user: any;

  constructor(
    private topePresupuestal: TopePresupuestalService,
    private toastService: ToastrServiceService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllTope();
    this.total_presupuesto = 0;
  }

  getAllTope() {
    this.topePresupuestal.getAllTopeGenerica(this.user.anio,this.user.id_etapa).subscribe(res => {
      this.lista_tope_ugp = res;
      //console.log(res);
      for (let n = 0; n < this.lista_tope_ugp["length"]; n++) {
        for (let m = 0; m < this.lista_tope_ugp[n].lista_generica.length; m++) {
          this.total_presupuesto = this.total_presupuesto + this.lista_tope_ugp[n].lista_generica[m].tope;
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

  sumarTotal(index_ugp, index_generica){
    this.total_presupuesto =0;
    for (let n = 0; n < this.lista_tope_ugp["length"]; n++) {
      if(index_ugp==n){
        this.lista_tope_ugp[n].tope=0;
      }
      for (let m = 0; m < this.lista_tope_ugp[n].lista_generica.length; m++) {
        this.total_presupuesto = this.total_presupuesto + this.lista_tope_ugp[n].lista_generica[m].tope;
        if(index_ugp==n){
          this.lista_tope_ugp[n].tope = this.lista_tope_ugp[n].tope + this.lista_tope_ugp[n].lista_generica[m].tope;
        }
      }
    }
  }

  guardarTopeGenerica(){
    var trama_xml='<TOPE>';
    for (let n = 0; n < this.lista_tope_ugp["length"]; n++) {
      for (let m = 0; m < this.lista_tope_ugp[n].lista_generica.length; m++) {
        trama_xml =  trama_xml + "<r>";
        trama_xml =  trama_xml + "<ugp>" + this.lista_tope_ugp[n].lista_generica[m].id_ugp + "</ugp>";
        trama_xml =  trama_xml + "<generica>" + this.lista_tope_ugp[n].lista_generica[m].id_generica + "</generica>";
        trama_xml =  trama_xml + "<tope>" + this.lista_tope_ugp[n].lista_generica[m].tope + "</tope>";
        trama_xml =  trama_xml + "</r>";
      }      
    }
    trama_xml =  trama_xml + "</TOPE>";
    this.topePresupuestal.guardarTopeGenerica(trama_xml).subscribe(
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
