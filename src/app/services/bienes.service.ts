import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class BienesService {
  constructor(private dataService: ApiService) {}

  getAllBienesServicios(anio) {
    return this.dataService.get("Bienes/lista?anio=" + anio);
  }

  getAllBienesServiciosMantenimiento(anio) {
    return this.dataService.get("Bienes/lista4?anio=" + anio);
  }

  getAllBienesServiciosAccion(anio, id_accion) {
    return this.dataService.get("Bienes/lista3?id_accion=" + id_accion + "&anio=" + anio);
  }

  getAllBienesServiciosPPA(anio, id_empleado, id_accion, adicional) {
    return this.dataService.get("Bienes/lista2?id_accion=" + id_accion + "&id_empleado=" + id_empleado + "&adicional=" + adicional + "&anio=" + anio);
  }

  editarBienes(data) {
    return this.dataService.post("Bienes/editar", data);
  }

  guardarBienesxAccion(data) {
    return this.dataService.post("Bienes/vincular", data);
  }

  eliminarBienesxAccion(data) {
    return this.dataService.post("Bienes/desvincular", data);
  }

  //guardar bienes
  guardarBienesServicios(data) {
    return (data.id==0) ?
      this.dataService.post("Bienes/registrar", data) :
      this.dataService.post("Bienes/editar", data);
  }

  getAllFinanciamientoBienesxUGP(data, anio_bienes, tipo) {
    return this.dataService.get(
      "FinanciamientoBienes/lista?id_ugp=" + data + "&anio=" + anio_bienes + "&tipo=" + tipo
    );
  }

  getAllFinanciamientoMensualxUGP(id_ugp, tipo , id_ciclo, id_etapa) {
    return this.dataService.get(
      "FinanciamientoBienes/lista_mensual?id_ugp=" + id_ugp + "&tipo=" + tipo
    );
  }

  guardarFinanciamientoBienesxUGP(data) {
    return this.dataService.post("FinanciamientoBienes/registrar", data);
  }

  guardarFinanciamientoBienesxUGP2(data) {
    return this.dataService.post("FinanciamientoBienes/registrar2", data);
  }

  guardarFinanciamientoBienes(data) {
    return this.dataService.post("FinanciamientoBienes/registrarTodo", data);
  }

  guardarFinanciamientoMensualxUGP(data) {
    return this.dataService.post("FinanciamientoBienes/registrar_mensual", data);
  }

  getAllClasificador() {
    return this.dataService.get("Clasificador/lista");
  }

  getAllKit(data) {
    return this.dataService.post("Kit/registrar",data);
  }

  getAllBienesKit(id_kit) {
    return this.dataService.get("Bienes/listakit?id_kit="+id_kit);
  }

}
