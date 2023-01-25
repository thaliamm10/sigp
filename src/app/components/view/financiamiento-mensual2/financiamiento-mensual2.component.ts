import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UgpService} from '../../../services/ugp.service';
import {BienesService} from '../../../services/bienes.service';
import {CicloService} from '../../../services/ciclo.service';
import {ToastrServiceService} from '../../../services/toastr-service.service';
import {ArrayType} from '@angular/compiler';

@Component({
  selector: 'app-financiamiento-mensual2',
  templateUrl: './financiamiento-mensual2.component.html',
  styleUrls: ['./financiamiento-mensual2.component.css']
})
export class FinanciamientoMensual2Component implements OnInit {

  lista_ugp: Object;
  id_ugp: number;
  listaBienes: any = new Array();
  lista_bienes: any = new Array();
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
    private toastService: ToastrServiceService) {

  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.etapa = this.user.nombre_etapa;
    this.anio = this.user.anio;
    this.getAllCiclo();
  }

  getAllCiclo() {
    this.cicloService.getAllCicloActivos().subscribe(res => {
      this.listaCiclo = res;
      // console.log(res);
      if (res['length'] > 0) {
        this.id_anio = this.listaCiclo[0].anio;
        this.ListarUGP();
      }
    });
  }

  ListarUGP() {
    this.lista_ugp = null;
    this.ugpService.getAllUGPxFiltro(this.user.codigo, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_ugp = res;
      this.id_ugp = (res['length'] > 0) ? this.lista_ugp[0].id : -1;
      this.ListarMensual();
    })
  }

  ListarMensual() {
    this.lista_bienes = null;
    this.cantidad_lista = null;
    this.total_financiamiento = 0;
    this.bienesService.getAllFinanciamientoMensualxUGP(this.id_ugp, 1, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.listaBienes = res;
      // console.log("listaBienes", this.listaBienes);
      this.lista_bienes = this.listaBienes.lista_bienes;
      this.cantidad_lista = this.listaBienes.lista_bienes['length'];
      for (let i = 0; i < this.lista_bienes.length; i++) {
        this.sumarTotal(i);
      }
      for (let n = 0; n < this.lista_bienes.length; n++) {
        for (let k = 0; k < this.lista_bienes[n].lista_periodo.length; k++) {
          this.total_financiamiento = this.total_financiamiento + this.lista_bienes[n].lista_periodo[k].monto_rdr +
            this.lista_bienes[n].lista_periodo[k].monto_ro;
        }
      }

    })
  }

  public validarSoloNumeros(event): boolean {
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
    this.validacion = false;
    var i = 0;
    var total = data.lista_bienes.length;
    data.lista_bienes.forEach(element => {
      if (element.rdr > element.monto_rdr)
        this.validacion = true;
      if (element.ro > element.monto_ro)
        this.validacion = true;
      i = i + 1;
    });

    if (total == i) {
      /*if(this.validacion){
        this.toastService.showError("Verificar se esta excediendo a lo programado", "Error");
      }
      else{
        this.bienesService.guardarFinanciamientoMensualxUGP(data).subscribe(res => {
          this.ListarMensual();
          this.toastService.showSuccess("Se guardó con éxito.", "Correcto");
        });
      };*/
      this.bienesService.guardarFinanciamientoMensualxUGP(data).subscribe(res => {
        this.ListarMensual();
        this.toastService.showSuccess('Se guardó con éxito.', 'Correcto');
      });
    }
    ;
  }

}
