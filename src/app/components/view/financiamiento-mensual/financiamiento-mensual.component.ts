import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UgpService} from '../../../services/ugp.service';
import {BienesService} from '../../../services/bienes.service';
import {CicloService} from '../../../services/ciclo.service';
import {ToastrServiceService} from '../../../services/toastr-service.service';
import {ArrayType} from '@angular/compiler';
import {TopePresupuestalService} from 'src/app/services/tope-presupuestal.service';

@Component({
  selector: 'app-financiamiento-mensual',
  templateUrl: './financiamiento-mensual.component.html',
  styleUrls: ['./financiamiento-mensual.component.css']
})
export class FinanciamientoMensualComponent implements OnInit {

  lista_ugp: Object;
  id_ugp: number;
  listaBienes: any = new Array();
  lista_bienes: any = new Array();
  lista_tope_ugp: any = new Array();
  cantidad_lista: number;
  listaCiclo: Object;
  id_anio: number;
  user: any;
  condicion: boolean = false;
  validacion: boolean;
  anio: number;
  etapa: string;
  total_financiamiento: number;

  constructor(
    private cicloService: CicloService,
    private authService: AuthService,
    private ugpService: UgpService,
    private bienesService: BienesService,
    private topePresupuestal: TopePresupuestalService,
    private toastService: ToastrServiceService) {
    // this.listaBienes = {
    //   lista_bienes: new Array()
    // }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.etapa = this.user.nombre_etapa;
    this.anio = this.user.anio;
    this.lista_bienes = null;
    // this.getAllCiclo();
    this.ListarUGP();
  }

  ListarUGP() {
    this.lista_ugp = null;
    this.ugpService.getAllUGPxFiltro(this.user.codigo, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_ugp = res;
      this.id_ugp = (res['length'] > 0) ? this.lista_ugp[0].id : -1;
      this.ListarMensual();
      this.getAllTope();
    })
  }

  getUgp() {
    this.ListarMensual();
    this.getAllTope();
  }

  ListarMensual() {
    this.lista_bienes = null;
    this.total_financiamiento = 0;
    this.bienesService.getAllFinanciamientoMensualxUGP(this.id_ugp, 0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.listaBienes = res;
      console.log('listaBienes', this.listaBienes);
      this.lista_bienes = this.listaBienes.lista_bienes;
      for (let i = 0; i < this.lista_bienes.length; i++) {
        this.sumarTotal(i);
      }
      for (let n = 0; n < this.lista_bienes.length; n++) {
        for (let k = 0; k < this.lista_bienes[n].lista_periodo.length; k++) {
          this.total_financiamiento = this.total_financiamiento + this.lista_bienes[n].lista_periodo[k].monto_rdr +
            this.lista_bienes[n].lista_periodo[k].monto_ro;
        }
      }

    });
  }

  getAllTope() {
    // console.log(this.id_ugp, "ugp");
    this.topePresupuestal.getAllMarcoUGPFuente(this.id_ugp, this.user.codigo).subscribe(res => {
      this.lista_tope_ugp = res;
      // console.log(res);
    });
  }

  validarSoloNumeros(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }
    return true;
  }

  validarSoloNumerosCantidad(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  sumarTotal(index) {
    var rdr = 0;
    var cantidadRdr = 0;
    var ro = 0;
    let cantidadRo = 0;
    for (let k = 0; k < this.lista_bienes[index].lista_periodo.length; k++) {
      rdr = rdr + this.lista_bienes[index].lista_periodo[k].monto_rdr;
      cantidadRdr = cantidadRdr + this.lista_bienes[index].lista_periodo[k].cantidad_rdr;
      ro = ro + this.lista_bienes[index].lista_periodo[k].monto_ro;
      cantidadRo = cantidadRo + this.lista_bienes[index].lista_periodo[k].cantidad_ro;
      this.lista_bienes[index].lista_periodo[k].monto = this.lista_bienes[index].lista_periodo[k].monto_rdr +
        this.lista_bienes[index].lista_periodo[k].monto_ro;
    }

    this.lista_bienes[index].rdr = rdr;
    this.lista_bienes[index].cantidad_rdr = cantidadRdr;
    this.lista_bienes[index].ro = ro;
    this.lista_bienes[index].cantidad_ro = cantidadRo;
    this.lista_bienes[index].monto = ro + rdr;
    console.log('monto', this.lista_bienes[index].monto);
    console.log('monto', this.lista_bienes[index].monto_programado);
  }

  change(indexFile, indexColumn, tipo) {
    switch (tipo) {
      case 'cantidad_ro':
        this.lista_bienes[indexFile].lista_periodo[indexColumn].monto_ro =
          this.lista_bienes[indexFile].lista_periodo[indexColumn].cantidad_ro *
          this.lista_bienes[indexFile].precio_bienes;
        break;
      case 'monto_ro':
        this.lista_bienes[indexFile].lista_periodo[indexColumn].cantidad_ro =
          this.lista_bienes[indexFile].precio_bienes !== 0 ?
            Number(this.lista_bienes[indexFile].lista_periodo[indexColumn].monto_ro /
              this.lista_bienes[indexFile].precio_bienes).toFixed(2) : 0;
        break;
      case 'cantidad_drd':
        this.lista_bienes[indexFile].lista_periodo[indexColumn].monto_rdr =
          this.lista_bienes[indexFile].lista_periodo[indexColumn].cantidad_rdr *
          this.lista_bienes[indexFile].precio_bienes;
        break;
      case 'monto_drd':
        this.lista_bienes[indexFile].lista_periodo[indexColumn].cantidad_rdr =
          this.lista_bienes[indexFile].precio_bienes !== 0 ?
            Number(this.lista_bienes[indexFile].lista_periodo[indexColumn].monto_rdr /
              this.lista_bienes[indexFile].precio_bienes).toFixed(2) : 0;
        break;
    }
    this.sumarTotal(indexFile);
  }

  guardarFinanMensual(data) {
    if (confirm('??Est?? seguro que va guardar el financimiento programado?')) {
      data.id_usuario = this.user.codigo;
      this.bienesService.guardarFinanciamientoMensualxUGP(data).subscribe(res => {
        this.ListarMensual();
        this.getAllTope();
        this.toastService.showSuccess('Se guard?? con ??xito.', 'Correcto');
      });
    }
  }
}
