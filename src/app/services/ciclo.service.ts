import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class CicloService {
  constructor(private dataService: ApiService) {}

  getAllCiclo() {
    return this.dataService.get("ciclo/lista?id=" + 0);
  }

  getAllCicloActivos() {
    return this.dataService.get("ciclo/listaActivo");
  }

  guardarCiclo(data) {
    //console.log(data);
    return (data.id==0) ? 
      this.dataService.post("ciclo/registrar", data) : 
      this.dataService.post("ciclo/editar", data);
  }


  /*  eliminarCiclo(data) {
     return this.dataService.post("Ciclo/anular", data);
   } */
}
