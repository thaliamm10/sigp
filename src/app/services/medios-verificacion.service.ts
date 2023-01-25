import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class MediosVerificacionService {

  constructor(private dataService: ApiService) { }

  getAllMedios(id_ugp) {
    return this.dataService.get(
      "MediosVerificacion/filtro?id_ugp=" + id_ugp
    );
  }

  guardarMedios(data) {
    return (data.id==0) ? 
    this.dataService.post("MediosVerificacion/registrar", data) : 
    this.dataService.post("MediosVerificacion/editar", data);
  }

 
}
