import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { PersonalService } from 'src/app/services/personal.service';
import { PpPersonalService } from 'src/app/services/pp-personal.service';
import { CicloService } from 'src/app/services/ciclo.service';

@Component({
  selector: 'app-financiamiento-plaza',
  templateUrl: './financiamiento-plaza.component.html',
  styleUrls: ['./financiamiento-plaza.component.css']
})
export class FinanciamientoPlazaComponent implements OnInit {
  monto_rdr: number;
  monto_ro: number;
  monto_don: number;
  id_ugp: number;
  ugp: Object;
  listaPersonal: Object;
  personal: any;
  listaUsuario: any;
  listaUsuarios: any = Array();
  id_plaza: any;
  plazaSeleccionada: any;
  term: any;
  sumaPorcentaje: number;
  id_anio: number;
  lista_ciclo: Object;

  constructor(
    private cicloService: CicloService,
    private personalService: PersonalService,
    private usuarioService: UsuariosService,
    private toastService: ToastrServiceService,
    private ppPersonalService: PpPersonalService
  ) { 
    this.monto_rdr = 0;
    this.monto_ro = 0;
    this.monto_don = 0;
  }

  ngOnInit() {
    this.listaPersonal = [];
    this.getAllCiclo();
    this.getAllPersonal();
    this.id_ugp = -1;
    this.sumaPorcentaje = this.monto_ro + this.monto_rdr;
  }

  getAllCiclo() {
    this.cicloService.getAllCicloActivos().subscribe(res => {
      this.lista_ciclo = res;
      if(res["length"]>0){
        this.id_anio = this.lista_ciclo[0].anio;
      }      
    });
  }

  getAllPersonal() {
    this.ppPersonalService.getAllPlaza(0).subscribe(res => {
      this.listaUsuarios = res;
    });
  }

  select(elemento) {
    this.getAllPersonalxUGP(elemento.ID);
    this.id_plaza = elemento.ID;
    this.plazaSeleccionada = elemento;
    let select = elemento;
    for (let i = 0; i < this.listaUsuarios.length; i++) {
      this.listaUsuarios[i].estado = false;
    }
    select.estado = !select.estado;
  }

  getAllPersonalxUGP(id_plaza) {
    this.listaPersonal = null;
    this.personalService.getAllFinanciamientoPersonalxUGP(id_plaza, this.id_anio).subscribe(res => {
        this.listaPersonal = res;
      });
  }

  getElemento(elemento) {
    this.personal = elemento;
    this.monto_rdr = this.personal.rdr;
    this.monto_ro = this.personal.ro;
    elemento.id_ugp = this.id_ugp;
    this.sumaPorcentaje = this.monto_ro + this.monto_rdr;
  }

  suma(){
    this.sumaPorcentaje = this.monto_ro + this.monto_rdr;
  }

  guardar() {
    this.suma();
    if(this.sumaPorcentaje<=100){
    this.personal.ro = this.monto_ro;
    this.personal.rdr = this.monto_rdr;
    this.personalService.guardarFinanciamientoPersonalxUGP(this.personal)
      .subscribe(res => {
        this.getAllPersonalxUGP(this.id_plaza);
        this.toastService.showSuccess("Se modificó los valores.");
      });
    }else{
      this.toastService.showError("Se excede al 100%  el valor del porcentaje.")
    }
  }

}
