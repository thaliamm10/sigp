import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MantenimientoVehiculoInterface } from 'src/app/entities/mantenimiento-vehiculo-interface';
import { MantenimientoVehiculoService } from 'src/app/services/mantenimiento-vehiculo.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { BienesService } from 'src/app/services/bienes.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-mantenimientos-vehiculo',
  templateUrl: './mantenimientos-vehiculo.component.html',
  styleUrls: ['./mantenimientos-vehiculo.component.css']
})
export class MantenimientosVehiculoComponent implements OnInit {
lista_mantenimiento: any=[];
lista_bienes: Object;
lista_vehiculo:Object;
mantenimiento: MantenimientoVehiculoInterface;
p: any;
user: any;
  
@ViewChild("closeModalMante", {static: false})
closeModalMante: ElementRef;
  constructor(
    private manteSrv: MantenimientoVehiculoService,
    private toastService: ToastrServiceService,
    private bienesservice: BienesService,
    private authService: AuthService,
    private vehiculoservice: VehiculoService) {
    this.mantenimiento={
      id:0,
      id_bienes:0,
      id_vehiculo:0,
      estado:0,
      nombre_estado:"",
      nombre_bienes: "",
    nombre_vehiculo: "",
    km:0
    }
   }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllBienes();
    this.getAllMantenimiento();
    this.getAllVehiculo();
  }

  getElemento(elemento){
    this.mantenimiento={
    id :(elemento!= null)? elemento.id : 0,
    id_bienes: (elemento!= null)? elemento.id_bienes : 0,
    id_vehiculo: (elemento!= null)? elemento.id_vehiculo : 0,
    estado: (elemento!= null)? elemento.estado : 0,
    nombre_estado: (elemento!= null)? elemento.nombre_estado : "",
    nombre_bienes: (elemento!= null)? elemento.nombre_bienes : "",
    nombre_vehiculo: (elemento!= null)? elemento.nombre_vehiculo : "",
    km: (elemento!= null)? elemento.km : 0,

    }
    }

getAllVehiculo(){
this.vehiculoservice.getAllVehiculoServicios().subscribe(res => {
  this.lista_vehiculo = res;
})
}

    getAllMantenimiento(){
      this.manteSrv.listarMantenimiento().subscribe( res => {
        this.lista_mantenimiento= res;
      })
    }

guardarMantenimiento(){
  this.manteSrv.guadarMantenimiento(this.mantenimiento).subscribe( res => {
    if (res["id"]!= null) {
      this.toastService.showSuccess("Se guardó con éxito", "Correcto");
      this.closeModalMante.nativeElement.click();
      this.getAllMantenimiento();          
    } else if (res["id"] == null) {
      this.toastService.showError("Se produjo un error al guardar.","Error");
    } 
  },
  err => {
    this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message,"Error");
  
  });
}

    getAllBienes() {
      this.bienesservice.getAllBienesServiciosMantenimiento(this.user.anio).subscribe(res => {
        this.lista_bienes = res;
      });
    }
}
