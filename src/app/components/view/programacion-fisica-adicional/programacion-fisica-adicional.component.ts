import { Component, OnInit } from '@angular/core';
import { CicloService } from 'src/app/services/ciclo.service';
import { UgpService } from 'src/app/services/ugp.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { CicloInterface } from 'src/app/entities/ciclo-interface';
import { ProductoService } from 'src/app/services/producto.service';
import { PfaService } from 'src/app/services/pfa.service';

@Component({
  selector: 'app-programacion-fisica-adicional',
  templateUrl: './programacion-fisica-adicional.component.html',
  styleUrls: ['./programacion-fisica-adicional.component.css']
})
export class ProgramacionFisicaAdicionalComponent implements OnInit {
  lista_ciclo: Object;
  lista_ugp: Object;
  lista_producto: Object;
  filtro_ciclo: CicloInterface;
  id_anio: number;
  id_ugp: number;
  id_producto: number;
  id_accion: number;
  condicion: boolean = false;
  pfa: any = Array();
  pfa1: any = Array();
  x_progreso: boolean;
  user: any;
  cantidad_lista: number;
  anio: number;
  etapa: string;
  
  constructor(
    private cicloService: CicloService,
    private ugpService: UgpService,
    private productoService: ProductoService,
    private toastService: ToastrServiceService,
    private pfaService: PfaService,
    private authService: AuthService
  ) { 
    this.filtro_ciclo= {
      id: null,
      anio:0,
      id_apertura:0
    };
    this.pfa = {
      lista_periodo: Array()
    };
    this.pfa1 = {
      lista_periodo: Array()
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.pfa=null;
    this.lista_producto = null;
    this.x_progreso = true;
    this.id_anio = this.user.anio;
    this.anio = this.user.anio;
    this.etapa =  this.user.nombre_etapa;
    this.getAllUGP();
    // this.getAllUGP();    
  }

  getAllUGP() {
    this.lista_ugp = null;
    this.lista_producto = null;
    this.pfa=null;
    this.x_progreso = true;
    this.ugpService.getAllUGPxProgramacion(this.user.codigo,this.user.id_ciclo, this.user.id_etapa,1).subscribe(res => {
      this.lista_ugp = res;
      this.id_ugp = (res["length"]>0) ? this.lista_ugp[0].id : -1;
      this.getAllProducto();
    });
  }

  getAllProducto() {
    this.lista_producto = null;
    this.pfa=null;
    this.x_progreso = true;
    // console.log(this.user.id_estado);
    // if(this.user.id_estado != 3 && this.user.id_estado != 5){
      // this.productoService.getProductoxProgramacion(this.id_ugp, this.user.codigo,0).subscribe(res => {      
      //   this.lista_producto = res;
      //   this.id_producto = (res["length"]>0) ? this.lista_producto[0].id : 0;
      //   this.getAllPFAcciones();
      // });
    // }
    // else{
    //   this.productoService.getProductoxUGP(this.id_ugp).subscribe(res => {      
    //     this.lista_producto = res;
    //     this.id_producto = (res["length"]>0) ? this.lista_producto[0].id : 0;
    //     this.getAllPFAcciones();
    //   });
    // }
    this.productoService.getProductoxProgramacion(this.id_ugp, this.user.codigo,0).subscribe(res => {      
      this.lista_producto = res;
      this.id_producto = (res["length"]>0) ? this.lista_producto[0].id : 0;
      this.getAllPFAcciones();
    });
  }

  getAllPFAcciones() {
    this.pfa=null;
    this.x_progreso = true;
    this.pfaService.getAllPFAcciones(this.id_producto, this.user.anio, this.user.codigo, 1).subscribe(res => {
      this.pfa = res;
      this.cantidad_lista = res["length"];
      this.x_progreso = (this.cantidad_lista==0) ? true : false;    
    });
    this.pfaService.getAllPFAcciones(this.id_producto, this.user.anio, this.user.codigo, 0).subscribe(res => {
      this.pfa1 = res;  
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
    for (let k = 0; k < this.pfa.length; k++) {
      var lista_valores = this.pfa[k].lista_periodo;
      var suma=0;
      for (let n = 0; n < lista_valores.length; n++) {
        suma = suma + lista_valores[n].cantidad;
      }
      this.pfa[k].suma = suma;
    }
  }

  guardarPFAccion() {
    this.x_progreso =true;
    //(2) meta fisica adicional
    let data = {
      id_accion: 0,
      adicional: 1,
      id_ciclo: this.user.id_ciclo,
      id_etapa: this.user.id_etapa,
      usuario: this.user.codigo,
      lista_ambito: this.pfa
    };
    // console.log(data);
    this.pfaService.guardarPFAcciones(data).subscribe(res => {
      if (res["id_accion"] != null) {
        this.toastService.showSuccess("Se modificó la programación adicional.", "Correcto");
        this.x_progreso =false;
        this.getAllPFAcciones();
      }
    });   
  }

  marca_flag_meta(pfpdt){
    pfpdt.flag_meta = (pfpdt.flag_meta==0) ? 1 : 0;
  }

}
