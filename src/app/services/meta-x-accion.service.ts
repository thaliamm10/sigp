import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class MetaXAccionService {
  constructor(private dataService: ApiService) {}

  getAllMetaxAccion(data) {
    return this.dataService.get("MetaxAccion/lista?accion=" + data);
  }

  guardarMetaxAccion(data) {
    return this.dataService.post("MetaxAccion/registrar", data);
  }

  eliminarMetaxAccion(data) {
    return this.dataService.post("MetaxAccion/anular", data);
  }
}
