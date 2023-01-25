import { Component, OnInit } from '@angular/core';
import { TopePresupuestalService } from 'src/app/services/tope-presupuestal.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tope-canalizadora',
  templateUrl: './tope-canalizadora.component.html',
  styleUrls: ['./tope-canalizadora.component.css']
})
export class TopeCanalizadoraComponent implements OnInit {
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
    this.topePresupuestal.getAllTopeCanalizadora(this.user.anio,this.user.id_etapa).subscribe(res => {
      this.lista_generica = res;
      this.lista = new Array();
      for (let m = 0; m < 6; m++) {
        var suma = 0;
        for (let n = 0; n < this.lista_generica["length"]; n++) {
          suma = suma + this.lista_generica[n].lista_organo[m].monto;
        }
        this.total_presupuesto = this.total_presupuesto + suma;
        let data = {
          monto: suma
        };
        this.lista.push(data);
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

  sumarTotal(){
    
  }

  guardarTopeGenerica(){
    var trama_xml='<TOPE>';
    for (let n = 0; n < this.lista_generica["length"]; n++) {
      for (let m = 0; m < this.lista_generica[n].lista_organo["length"]; m++) {
        trama_xml =  trama_xml + "<r>";
        trama_xml =  trama_xml + "<generica>" + this.lista_generica[n].id + "</generica>";
        trama_xml =  trama_xml + "<organo>" + this.lista_generica[n].lista_organo[m].id + "</organo>";
        trama_xml =  trama_xml + "<monto>" + this.lista_generica[n].lista_organo[m].monto + "</monto>";
        trama_xml =  trama_xml + "<anio>" + this.user.anio + "</anio>";
        trama_xml =  trama_xml + "</r>";
      }
    }
    trama_xml =  trama_xml + "</TOPE>";
    console.log(trama_xml);
    this.topePresupuestal.guardarTopeCanalizadora(trama_xml).subscribe(
      res => {
        this.toastService.showSuccess("Se modificó la cantidad.", "Correcto");
        this.getAllTope();
      },
      err => {
        this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message,"Error"
        );
      }
    );   
  }

}
