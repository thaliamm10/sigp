import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class AOxFinalidadService {
  constructor(private dataService: ApiService) {}

  getAllAOxFinalidad(data) {
    return this.dataService.get("AOxFinalidad/lista?ao=" + data);
  }

  guardarAOxFinalidad(data) {
    return this.dataService.post("AOxFinalidad/registrar", data);
  }

  editarAOxFinalidad(data) {
    return this.dataService.post("AOxFinalidad/editar", data);
  }

  eliminarAOxFinalidad(data) {
    return this.dataService.post("AOxFinalidad/anular", data);
  }
}
