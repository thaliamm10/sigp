import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class FinalidadService {
  constructor(private dataService: ApiService) {}

  getAllFinalidad(data) {
    return this.dataService.get("Finalidad/lista?gru_funcional=" + data);
  }

  guardarFinalidad(data) {
    return this.dataService.post("Finalidad/registrar", data);
  }

  editarFinalidad(data) {
    return this.dataService.post("Finalidad/editar", data);
  }

  eliminarFinalidad(data) {
    return this.dataService.post("Finalidad/anular", data);
  }
}
