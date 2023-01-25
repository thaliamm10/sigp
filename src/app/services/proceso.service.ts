import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class ProcesoService {
  constructor(private dataService: ApiService) {}

  getAllProcesos() {
    return this.dataService.get("Proceso/lista");
  }

  getAllProcesosxId(id_padre) {
    return this.dataService.get("Proceso/nivel1?id="+id_padre);
  }

  getAllProcesosJSON() {
    return this.dataService.get("Proceso/lista_json");
  }

  guardarProceso(data) {
    return (data.id==0) ? 
    this.dataService.post("Proceso/registrar", data) : 
    this.dataService.post("Proceso/editar", data);
    //return this.dataService.post("Proceso/registrar", data);
  }

  eliminarProceso(data) {
    return this.dataService.post("Proceso/anular", data);
  }

  editarProceso(data) {
    return this.dataService.post("Proceso/editar", data);
  }
}
