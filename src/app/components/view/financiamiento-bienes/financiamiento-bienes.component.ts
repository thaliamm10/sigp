import { Component, OnInit } from '@angular/core';
import { UgpService } from 'src/app/services/ugp.service';
import { BienesService } from 'src/app/services/bienes.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExcelServicesService } from 'src/app/services/excel-services.service';
import { Router } from '@angular/router';
import { TopePresupuestalService } from 'src/app/services/tope-presupuestal.service';

@Component({
  selector: 'app-financiamiento-bienes',
  templateUrl: './financiamiento-bienes.component.html',
  styleUrls: ['./financiamiento-bienes.component.css']
})
export class FinanciamientoBienesComponent implements OnInit {
  ugp: Object;
  id_ugp: number;
  listaCiclo: Object;
  listaBienes: any;
  lista_bienes: any = new Array();
  lista_tope_ugp: any = new Array();
  bien: any;
  monto_rdr: number;
  monto_ro: number;
  anio: number;
  etapa: string;
  id_anio: number;
  sumaPorcentaje: number;
  user: any;
  total_financiamiento: number=0;
  constructor(
    private ugpService: UgpService,
    private bienesService: BienesService,
    private authService: AuthService,
    private toastService: ToastrServiceService,
    private excelService:ExcelServicesService,
    private topePresupuestal: TopePresupuestalService,
    private route: Router
  ) {
    this.id_ugp = 0;
    this.monto_rdr = 0;
    this.monto_ro = 0;
    this.lista_bienes = [];
  }

  exportAsXLSX():void {
    var excel=[];
    this.lista_bienes.forEach(row => {
      let data = {
        CLASIFICADOR: row.codigo_clasificador,
        BIENES: row.nombre_bienes,
        MONTO: row.monto,
        RDR: row.monto_rdr,
        RO: row.monto_ro
      }
      excel.push(data);
    });
    this.excelService.exportAsExcelFile(excel, 'financiamiento_bienes');
  }

  limpiarform() {
    this.monto_rdr = 0;
    this.monto_ro = 0;
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.etapa =  this.user.nombre_etapa;
    this.anio = this.user.anio;
    this.lista_bienes = null;
    this.getAllUBG();
  }

  getAllUBG() {
    this.ugpService.getAllUGPBienes(this.user.anio).subscribe(res => {
      this.ugp = res;
      this.id_ugp = (res["length"]>0) ? this.ugp[0].id : -1;
      this.getAllBienesxUGP();

    });
  }

  getAllBienesxUGP() {
    this.lista_bienes = null;
    this.bienesService.getAllFinanciamientoBienesxUGP(this.id_ugp, this.user.anio, 0).subscribe(res => {
        this.listaBienes = res;
        this.getAllTope();
        this.lista_bienes = this.listaBienes.lista_bienes;

        this.total_financiamiento =0;
        for(let i = 0; i < this.lista_bienes["length"];i++){
          this.total_financiamiento = this.total_financiamiento + this.lista_bienes[i].monto;
        }
      });
  }

  getElemento(elemento) {
    this.bien = elemento;
    this.monto_rdr = this.bien.rdr;
    this.monto_ro = this.bien.ro;
    elemento.id_ugp = this.id_ugp;
    this.sumaPorcentaje = this.monto_ro + this.monto_rdr;
    this.route.navigate(["/financiamiento-mensual"]);
  }

  getAllTope() {
    this.topePresupuestal.getAllMarcoUGPFuente(this.id_ugp, this.user.codigo).subscribe(res => {
      this.lista_tope_ugp = res;
      for(let i = 0; i < this.lista_tope_ugp["length"];i++){
        this.lista_tope_ugp[i].saldo = this.lista_tope_ugp[i].tope - this.lista_tope_ugp[i].financiado_anual;

      }
    });
  }

  suma(){
    this.sumaPorcentaje = this.monto_ro + this.monto_rdr;
  }

  guardar() {
    this.suma();
    if(this.sumaPorcentaje<=100){
      this.bien.ro = this.monto_ro;
      this.bien.rdr = this.monto_rdr;
      console.log(this.bien);
      this.bienesService.guardarFinanciamientoBienesxUGP(this.bien).subscribe(res => {
          this.getAllBienesxUGP();
          this.toastService.showSuccess("Se guardó con éxito", "Correcto");
      });
    }
    else{
      this.toastService.showError("Se excede al 100%  el valor del porcentaje.")
    }
  }

  Todos(data){
    this.bienesService.guardarFinanciamientoBienesxUGP2(data).subscribe(res => {
      this.getAllBienesxUGP();
      this.toastService.showSuccess("Se guardó con éxito.", "Correcto");
    });

  }

  TodosRO(){
    let data ={
      anio_bienes: this.user.anio,
      id_ugp: this.id_ugp,
      tipo: 0
    }
    this.bienesService.guardarFinanciamientoBienes(data).subscribe(res => {
      this.getAllBienesxUGP();
      this.toastService.showSuccess("Se guardó con éxito", "Correcto");
    });
  }

  calcular(data,posicion){
    data.monto_rdr = (posicion==1) ? data.monto_rdr : (data.monto - data.monto_ro);
    data.monto_ro = (posicion==2) ? data.monto_ro : (data.monto - data.monto_rdr);
    data.rdr = (data.monto_rdr / data.monto) * 100;
    data.ro = (data.monto_ro / data.monto) * 100;
  }

  validarSoloNumeros(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }
    return true;
  }
}
