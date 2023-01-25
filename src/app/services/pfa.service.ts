import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class PfaService {
  constructor(private dataService: ApiService) {}

  getAllPFAcciones(id_producto, anio, id_usuario, adicional) {
    return this.dataService.get(
      "PFA/lista?id_producto=" + id_producto + "&anio=" + anio + "&usuario=" + id_usuario + "&adicional=" + adicional);
  }

  getAllPFAcciones2(id_producto, anio, id_usuario) {
    return this.dataService.get(
      "PFA/lista2?id_producto=" + id_producto + "&anio=" + anio + "&usuario=" + id_usuario);
  }

  getAllPFAcciones3(id_accion, anio, id_usuario, adicional) {
    return this.dataService.get(
      "PFA/lista3?id_accion=" + id_accion + "&anio=" + anio + "&usuario=" + id_usuario + "&adicional=" + adicional);
  }

  guardarPFAcciones(data) {
    return this.dataService.post("PFA/registrar", data);
  }
}
