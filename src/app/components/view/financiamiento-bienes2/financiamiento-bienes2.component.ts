import { Component, OnInit } from '@angular/core';
import { CicloService } from 'src/app/services/ciclo.service';
import { UgpService } from 'src/app/services/ugp.service';
import { BienesService } from 'src/app/services/bienes.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { ExcelServicesService } from 'src/app/services/excel-services.service';

@Component({
  selector: 'app-financiamiento-bienes2',
  templateUrl: './financiamiento-bienes2.component.html',
  styleUrls: ['./financiamiento-bienes2.component.css']
})
export class FinanciamientoBienes2Component implements OnInit {
  ugp: Object;
  id_ugp: number;
  listaCiclo: Object;
  listaBienes: any;
  lista_bienes: any = new Array();
  bien: any;
  monto_rdr: number;
  monto_ro: number;
  anio: number;
  etapa: string;
  id_anio: number;
  sumaPorcentaje: number;
  user: any;
  total_financiamiento:number=0;
  cantidad_lista: number;
  constructor(
    private cicloService: CicloService,
    private ugpService: UgpService,
    private bienesService: BienesService,
    private authService: AuthService,
    private toastService: ToastrServiceService,
    private excelService:ExcelServicesService
  ) {
    this.id_ugp = 0;
    this.monto_rdr = 0;
    this.monto_ro = 0;
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
    this.getAllCiclo();
  }

  getAllCiclo() {
    this.cicloService.getAllCicloActivos().subscribe(res => {
      this.listaCiclo = res;
      if(res["length"]>0){
        this.id_anio = this.listaCiclo[0].anio;
        this.getAllUBG();
      }
    });
  }

  getAllUBG() {
    this.ugpService.getAllUGPBienes(this.id_anio).subscribe(res => {
      this.ugp = res;
      this.id_ugp = (res["length"]>0) ? this.ugp[0].id : -1;
      this.getAllBienesxUGP();
    });
  }

  getAllBienesxUGP() {
    this.listaBienes = null;
    this.bienesService.getAllFinanciamientoBienesxUGP(this.id_ugp, this.id_anio, 1).subscribe(res => {
        this.listaBienes = res;
        this.lista_bienes = this.listaBienes.lista_bienes;
        this.cantidad_lista = this.listaBienes.lista_bienes["length"];
        this.total_financiamiento=0;
        for(let i=0; i< this.lista_bienes["length"];i++){
          this.total_financiamiento = this.total_financiamiento + this.lista_bienes[i].monto;
        }
      });
  }

  getElemento(elemento) {
    // console.log(elemento);
    this.bien = elemento;
    this.monto_rdr = this.bien.rdr;
    this.monto_ro = this.bien.ro;
    elemento.id_ugp = this.id_ugp;
    // console.log("0", elemento);
    this.sumaPorcentaje = this.monto_ro + this.monto_rdr;
  }

  suma(){
    this.sumaPorcentaje = this.monto_ro + this.monto_rdr;
    // console.log(this.sumaPorcentaje)
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
      anio_bienes: this.id_anio,
      id_ugp: this.id_ugp,
      tipo: 1
    }
    this.bienesService.guardarFinanciamientoBienes(data).subscribe(res => {
      this.getAllBienesxUGP();
      this.toastService.showSuccess("Se guardó con éxito", "Correcto");
    });
  }

  calcular(data){
    data.rdr = (data.monto_rdr / data.monto) * 100;
    data.ro = (data.monto_ro / data.monto) * 100;
  }

}
