import { Component, OnInit } from '@angular/core';
import { CicloService } from 'src/app/services/ciclo.service';
import { UgpService } from 'src/app/services/ugp.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { CicloInterface } from 'src/app/entities/ciclo-interface';
import { ProductoService } from 'src/app/services/producto.service';
import { PfaService } from 'src/app/services/pfa.service';

@Component({
  selector: 'app-programacion-fisica-accion',
  templateUrl: './programacion-fisica-accion.component.html',
  styleUrls: ['./programacion-fisica-accion.component.css']
})
export class ProgramacionFisicaAccionComponent implements OnInit {
  lista_ciclo: Object;
  lista_ugp: Object;
  lista_producto: Object;
  filtro_ciclo: CicloInterface;
  anio: number;
  etapa: string;
  id_ugp: number;
  id_producto: number;
  id_accion: number;
  condicion: boolean = false;
  pfa: any = Array();
  x_progreso: boolean;
  user: any;
  cantidad_lista: number;

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
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.pfa=null;
    this.lista_producto = null;
    this.x_progreso = true;
    //this.getAllCiclo();
    this.anio = this.user.anio;
    this.etapa =  this.user.nombre_etapa;
    this.getAllUGP();    
  }

  getAllUGP() {
    this.lista_ugp = null;
    this.lista_producto = null;
    this.pfa=null;
    this.x_progreso = true;
    this.ugpService.getAllUGPxProgramacion(this.user.codigo, this.user.id_ciclo, this.user.id_etapa, 0).subscribe(res => {
      this.lista_ugp = res;
      this.id_ugp = (res["length"]>0) ? this.lista_ugp[0].id :-1;
      this.getAllProducto();
    });
  }

  getAllProducto() {
    this.lista_producto = null;
    this.pfa=null;
    this.x_progreso = true;
    // console.log(this.user.id_estado);
    // if(this.user.id_estado != 3 && this.user.id_estado != 5){
    //   this.productoService.getProductoxFiltro(this.id_ugp, this.user.codigo).subscribe(res => {      
    //     this.lista_producto = res;
    //     this.id_producto = (res["length"]>0) ? this.lista_producto[0].id : 0;
    //     this.getAllPFAcciones();
    //   });
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
    this.pfaService.getAllPFAcciones(this.id_producto, this.user.anio, this.user.codigo, 0).subscribe(res => {
      this.pfa = res;
      this.cantidad_lista = res["length"];
      this.x_progreso = (this.cantidad_lista==0) ? true : false;    
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
    //(1) meta fisica programada
    let data = {
      id_accion: 0,
      adicional: 0,
      id_ciclo: this.user.id_ciclo,
      id_etapa: this.user.id_etapa,
      usuario: this.user.codigo,
      lista_ambito: this.pfa
    };
    console.log(data);
     this.pfaService.guardarPFAcciones(data).subscribe(res => {
       if (res["id_accion"] != null) {
         this.toastService.showSuccess("Se modificó la cantidad.", "Correcto");
         this.x_progreso =false;
         this.getAllPFAcciones();
       }
     });   
  }

  marca_flag_meta(pfpdt){
    pfpdt.flag_meta = (pfpdt.flag_meta==0) ? 1 : 0;
  }
}
