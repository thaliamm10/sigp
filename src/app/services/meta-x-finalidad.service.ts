import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class MetaXFinalidadService {
  constructor(private dataService: ApiService) {}

  getAllMetaxFinalidad(data) {
    return this.dataService.get("MetaxFinalidad/lista?finalidad=" + data);
  }

  guardarMetaxFinalidad(data) {
    return this.dataService.post("MetaxFinalidad/registrar", data);
  }

  editarMetaxFinalidad(data) {
    return this.dataService.post("MetaxFinalidad/editar", data);
  }

  eliminarMetaxFinalidad(data) {
    return this.dataService.post("MetaxFinalidad/anular", data);
  }
}
