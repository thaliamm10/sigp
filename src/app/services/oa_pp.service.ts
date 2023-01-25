import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class PpService {
  constructor(private dataService: ApiService) {}

  getAllConcepto(id_plaza, anio) {
    return this.dataService.get(
      "OA_PP/lista?id_plaza=" + id_plaza + "&anio=" + anio
    );
  }
  //
  guardarPlaza(data) {
    return this.dataService.post("/OA_PP/registrar", data);
  }

  asignarPersonal(data) {
    return this.dataService.post("PPPersonal/asignar", data);
  }

  registrarAsignacion(data) {
    return this.dataService.post("PAPersonal/registrar", data);
  }

  vincularAccion(data) {
    return this.dataService.post("PAPersonal/vincular", data);
  }

  anularPersonalxAccion(data) {
    return this.dataService.post("PPPersonal/anular", data);
  }

  getAllAsignacionxPlaza(id_plaza) {
    return this.dataService.get("OA_PP/lista?id_plaza=" + id_plaza);
  }

  getAllAsignacion(id_plaza, id_accion) {
    return this.dataService.get(
      "PPPersonal/PersonalAccion?id_plaza=" +
        id_plaza +
        "&id_accion=" +
        id_accion
    );
  }

  getAllPeriodo() {
    return this.dataService.get("PPPersonal/periodo");
  }
}
