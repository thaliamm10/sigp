import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class PpPersonalService {
  constructor(private dataService: ApiService) {}

  getAllPlaza(id_plaza) {
    return this.dataService.get(
      "Plaza/lista?id_plaza=" + id_plaza);
  }

  getAllPlazaAsignacion(id_usuario) {
    return this.dataService.get(
      "Plaza/lista_asignacion?id_responsable=" + id_usuario);
  }

  getAllConceptoxTipo(id_tipo_contrato, id_plaza) {
    return this.dataService.get(
      "Plaza/lista_concepto?id_tipo_contrato=" + id_tipo_contrato + "&id_plaza=" + id_plaza);
  }

  getAllConcepto(id_plaza, anio) {
    return this.dataService.get(
      "Plaza/lista_remuneracion?id_plaza=" + id_plaza + "&anio=" + anio
    );
  }
  //
  guardarPlaza(data) {
    return (data.ID==0) ? 
    this.dataService.post("Plaza/registrar", data) : 
    this.dataService.post("Plaza/editar", data);
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

  getAllAsignacionxPlaza(id_plaza, id_ciclo, id_etapa) {
    return this.dataService.get(
      "PAPersonal/lista?id_plaza=" + id_plaza + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa
    );
  }

  aprobarAsignacion(data) {
    return this.dataService.post("PAPersonal/aprobar", data);
  }

  devolverAsignacion(data) {
    return this.dataService.post("PAPersonal/devolver", data);
  }

  getAllAsignacion(id_plaza, id_accion) {
    return this.dataService.get("PPPersonal/PersonalAccion?id_plaza=" + id_plaza + "&id_accion=" + id_accion);
  }

  getAllPeriodo() {
    return this.dataService.get("PPPersonal/periodo");
  }
}
