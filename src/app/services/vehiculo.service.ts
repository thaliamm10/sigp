
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: "root"
  })
  export class VehiculoService{

    constructor(private dataService: ApiService) {}

    getAllVehiculoServicios() {
      return this.dataService.get("Vehiculo/lista");
    }
  
    editarVehiculo(data) {
      return this.dataService.post("Vehiculo/editar", data);
    }
  
    guardarVehiculoServicios(data) {
      return (data.id==0) ? 
      this.dataService.post("Vehiculo/registrar", data) : 
      this.dataService.post("Vehiculo/editar", data);
    }

    eliminarVehiculos(data) {
        return this.dataService.post("Vehiculo/anular", data);
    }

    listaMantenimiento(){
      return this.dataService.get("Mantenimiento/lista");
    }

    listaTipoVehiculo(){
      return this.dataService.get("TipoVehiculo/lista");
    }
  }
