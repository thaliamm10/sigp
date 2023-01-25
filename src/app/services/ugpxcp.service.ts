import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class UgpxcpService {
  ///CPxUGP/anular
  constructor(private dataService: ApiService) {}

  getAllCPxUGP(data) {
    return this.dataService.get("ACxAP/lista?accion=" + data);
  }

  guardarCPxUGP(data) {
    return this.dataService.post("ACxAP/registrar", data);
  }

  editarCPxUGP(data) {
    return this.dataService.post("ACxAP/editar", data);
  }

  eliminarCPxUGP(data) {
    return this.dataService.post("ACxAP/anular", data);
  }
}
