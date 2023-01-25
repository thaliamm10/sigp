
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { VehiculoInterface } from 'src/app/entities/vehiculo-interface';
import { AuthService } from 'src/app/services/auth.service';
import { OrganoService } from 'src/app/services/organo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  lista_vehiculos: any = new Array();
  lista_organo: Object;
  objvehiculos: VehiculoInterface;
  cantidad_lista: number;
  p: any;
  user: any;

  @ViewChild("closeModalVehiculos", {static: false})
  closeModalVehiculos: ElementRef;
  filtro_estado: string;
  filtro_nombre: string;
  constructor(
    private vehiculosService : VehiculoService,
    private organoService: OrganoService,
    private toastService: ToastrServiceService,
    private authService: AuthService
  ){  
    this.objvehiculos = {
      id: 0,
      placa: "",
      descripcion: "",
      chasis: "",
      marca: "",
      codigo_patrimonial: "",
      peso_neto: 0,
      peso_bruto: 0,
      asientos: 0,
      anio_fabricacion: 0,
      modelo: "",
      color: "",
      cantidad_cilindro: 0,
      id_tipo_vehiculo: 0,
      nombre_vehiculo: "",
      id_tipo_combustible: 0,
      id_rendimiento: 0,
      numero_orden: "",
      fecha_compra: "",
      anio_compra: 0  ,
      valor_compra: 0  ,
      proveedor: "",
      usuario_registro: 0,
      nombre_usuario:"",
      nombre_estado: "",
      kilometraje:0,
      id_organo:0,
      responsable:"",
      estado: 0    
    };
      this.filtro_estado = "";
    }

    ngOnInit() {
      this.user = this.authService.getUserLoggedIn();
      this.getAllVehiculo();
      this.getAllOrgano();
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
    });
  }

  getAllVehiculo() {
    this.vehiculosService.getAllVehiculoServicios().subscribe(res => {
      this.lista_vehiculos = res;
      // console.log(res);
      this.cantidad_lista = res["length"];      
    });
  }
  
  getElemento(elemento) {
    this.objvehiculos = {
      id: (elemento!=null) ? elemento.id : 0,
      placa: (elemento!=null) ? elemento.placa : "",
      descripcion: (elemento!=null) ? elemento.descripcion : "",
      marca: (elemento!=null) ? elemento.marca : "",
      chasis: (elemento!=null) ? elemento.chasis : "",
      codigo_patrimonial: (elemento!=null) ? elemento.codigo_patrimonial: "",
      peso_bruto: (elemento!=null) ? elemento.peso_bruto: 0,
      peso_neto: (elemento!=null) ? elemento.peso_neto: 0,
      asientos: (elemento!=null) ? elemento.asientos: 0,
      anio_fabricacion: (elemento!=null) ? elemento.anio_fabricacion : 0,
      modelo: (elemento!=null) ? elemento.modelo : "",
      color: (elemento!=null) ? elemento.color : "",
      cantidad_cilindro: (elemento!=null) ? elemento.cantidad_cilindro : 0,
      id_tipo_vehiculo: (elemento!=null) ? elemento.id_tipo_vehiculo : 0,
      id_tipo_combustible:(elemento!=null) ? elemento.id_tipo_combustible : 0,
      id_rendimiento: (elemento!=null) ? elemento.id_rendimiento: 0,
      numero_orden: (elemento!=null) ? elemento.numero_orden: "",
      proveedor: (elemento!=null) ? elemento.proveedor : "",
      fecha_compra: (elemento!=null) ? elemento.fecha_compra : "",
      anio_compra: (elemento!=null) ? elemento.anio_compra : 0,
      valor_compra: (elemento!=null) ? elemento.valor_compra : 0,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      nombre_estado: (elemento!=null) ? elemento.nombre_estado : "",
      estado: (elemento!=null) ? elemento.estado: 1,
      kilometraje: (elemento!=null) ? elemento.kilometraje: 0,
      id_organo: (elemento!=null) ? elemento.id_organo: 1,
      responsable: (elemento!=null) ? elemento.responsable: ""
    };  
  }

  guardarvehiculos() {
    // console.log("registro",this.objvehiculos);
    var validacion = "";//this.validarcampos();
    if(validacion.length==0){
      this.vehiculosService.guardarVehiculoServicios(this.objvehiculos).subscribe(
        res => {
          //console.log("resp", res);
          if (res["id"] != null) {
            this.toastService.showSuccess("Se agregó con éxito", "Correcto");
            this.closeModalVehiculos.nativeElement.click();
            this.getAllVehiculo();
          } else if (res["id"] == null) {
            this.toastService.showError(
              "Se produjo un error al guardar.",
              "Error"
            );
          }
        },
        err => {
          this.toastService.showError(
            "Se produjo un error en el servicio. Error: " + err.message,
            "Error"
          );
        }
      );
    }
    else{
      this.toastService.showError(
        validacion,
        "Validación"
      );
    }    }}  
