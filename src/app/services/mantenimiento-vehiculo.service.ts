import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class MantenimientoVehiculoService {

  constructor( private dataService: ApiService) { }

  guadarMantenimiento(data){
   return( data.id==0) ?
   this.dataService.post("Mante/registrar",data):
   this.dataService.post("Mante/editar",data)
  }

  listarMantenimiento(){
    return this.dataService.get("Mante/listar");
  }
}
