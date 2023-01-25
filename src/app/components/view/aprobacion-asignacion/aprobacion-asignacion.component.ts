import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {CicloService} from 'src/app/services/ciclo.service';
import {PpPersonalService} from 'src/app/services/pp-personal.service';
import {ThousandsPipe} from '../../filter/decimal-filter.pipe';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';

@Component({
  selector: 'app-aprobacion-asignacion',
  templateUrl: './aprobacion-asignacion.component.html',
  styleUrls: ['./aprobacion-asignacion.component.css']
})
export class AprobacionAsignacionComponent implements OnInit {
  user: any;
  lista_ciclo: Object;
  listaUsuarios: any = new Array();
  lista_accion: Object;
  id_anio: number;
  id_plaza: number;
  result: any = new Array();
  personal_seleccionado: String;
  anio_seleccionado: number;
  cantidad_resultado: number;
  term: any;

  constructor(
    private authService: AuthService,
    private ppPersonalService: PpPersonalService,
    private cicloService: CicloService,
    private toastService: ToastrServiceService
  ) {
    this.cantidad_resultado = 0;
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.result = null;
    this.cantidad_resultado = 0;
    this.getAllCiclo();
    this.getAllPersonal();
  }

  getAllCiclo() {
    this.cicloService.getAllCicloActivos().subscribe(res => {
      this.lista_ciclo = res;
      this.id_anio = this.user.id_ciclo;
      // if (res["length"] > 0) {
      //   this.id_anio = this.lista_ciclo[0].id;
      // }
    });
  }

  getAllPersonal() {
    this.listaUsuarios = null;
    this.ppPersonalService.getAllPlazaAsignacion(this.user.codigo).subscribe(res => {
      this.listaUsuarios = res;
      // console.log(res);
    });
  }

  select(elemento) {
    this.id_plaza = elemento.ID;
    this.result = null;
    this.getAllAsignacion();
    for (let i = 0; i < this.listaUsuarios["length"]; i++) {
      this.listaUsuarios[i].estado = false;
    }
    this.personal_seleccionado = (elemento.NOMBRE == null) ? 'Plaza Programada sin Asignación' : elemento.NOMBRE + ' ' + elemento.A_PATERNO + ' ' + elemento.A_MATERNO;
    this.id_plaza = elemento.ID;
    elemento.estado = !elemento.estado;
  }

  select_anio() {
    for (let i = 0; i < this.lista_ciclo["length"]; i++) {
      if (this.lista_ciclo[i].id == this.id_anio) {
        this.anio_seleccionado = this.lista_ciclo[i].anio;
      }
    }
    this.result = null;
    this.getAllAsignacion();
  }

  getAllAsignacion() {
    this.ppPersonalService.getAllAsignacionxPlaza(this.id_plaza, this.id_anio, this.user.id_etapa).subscribe(res => {
      this.result = res;
    });
  }

  guardarAprobacion() {
    if (confirm("¿Esta seguro(a) que va aprobar la asignación?")) {
      let data = {
        id_plaza: this.id_plaza,
        id_personal: this.user.codigo,
        id_ciclo: this.id_anio
      };
      this.ppPersonalService.aprobarAsignacion(data).subscribe(res => {
          this.toastService.showSuccess("Se guardó con éxito la aprobación", "Correcto");
        },
        err => {
          this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message, "Error"
          );
        });
    }
  }

  devolverAprobacion() {
    if (confirm("¿Esta seguro(a) que devolverá la asignación?")) {
      let data = {
        id_plaza: this.id_plaza,
        id_personal: this.user.codigo,
        id_ciclo: this.id_anio
      };
      this.ppPersonalService.devolverAsignacion(data).subscribe(res => {
          this.toastService.showSuccess("Se devolvio con éxito la aprobación", "Correcto");
        },
        err => {
          this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message, "Error"
          );
        });
    }
  }
}
