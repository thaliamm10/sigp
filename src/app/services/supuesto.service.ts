import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupuestoService {

  constructor(private dataService: ApiService) { }

  getAllSupuesto() {
    return this.dataService.get(
      "Supuesto/filtro"  );
  }

  guardarSupuestoProd(data) {
    return (data.id==0) ? 
    this.dataService.post("Supuesto/registrar_p", data) : 
    this.dataService.post("Supuesto/editar_p", data);
  }
  guardarSupuestoAcc(data) {
    return (data.id==0) ? 
    this.dataService.post("Supuesto/registrar", data) : 
    this.dataService.post("Supuesto/editar", data);
  }

}
