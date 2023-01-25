import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class KitsService {

  constructor(    private dataService: ApiService) { }


  
  registrarKits(data){
    return (data.id==0) ? 
     this.dataService.post("Kits/registrar", data):
     this.dataService.post("Kits/editar", data);
  }

  editarKits(data){
    return this.dataService.post("Kits/editar", data);
  }


  listarKits(){
    return this.dataService.get("Kits/listar" );
  }

  listarMantenimiento(){
    return this.dataService.get("TipoMantenimiento/listar");
  }

  registrarBienKits(data){
    return this.dataService.post("BienesKit/registrar",data);
  }
}
