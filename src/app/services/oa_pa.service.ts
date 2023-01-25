import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class PaService {
  constructor(private dataService: ApiService) {}

  getAllConcepto(id_plaza) {
    return this.dataService.get("OA_PA/lista?id_plaza=" + id_plaza);
  }
  //
  guardarPlaza(data) {
    return this.dataService.post("/PPPersonal/registrar", data);
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

  getAllAsignacionxPlaza(id_plaza, anio, id_etapa) {
    return this.dataService.get(
      "PAPersonal/lista?id_plaza=" + id_plaza + "&anio=" + anio + "&id_etapa=" + id_etapa
    );
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
