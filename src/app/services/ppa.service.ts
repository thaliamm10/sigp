import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class PpaService {
  constructor(private dataService: ApiService) {}

  getAllPPAcciones(id_accion, id_bienes, anio) {
    return this.dataService.get(
      "PPA/lista?id_accion=" + id_accion + "&id_bienes=" + id_bienes + "&anio=" + anio);
  }

  getAllBienesPPAcciones(id_accion, anio, id_usuario, adicional) {
    return this.dataService.get(
      "PPA/lista2?id_accion=" + id_accion + "&anio=" + anio + "&id_usuario=" + id_usuario + "&adicional=" + adicional);
  }

  getAllBienesAdicional(id_accion, id_usuario) {
    return this.dataService.get(
      "PPA/lista_adicional?id_accion=" + id_accion + "&id_usuario=" + id_usuario);
  }

  getAllReporteOPP1(id_ugp, id_empleado, id_centro_costo, id_ciclo, id_etapa) {
    return this.dataService.get(
      "Reporte/meta_fisica?id_ugp=" + id_ugp + "&id_empleado=" + id_empleado + "&id_organo=" + id_centro_costo + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getAllReporteOPP2(id_empleado, id_centro_costo, id_ciclo, id_etapa) {
    return this.dataService.get(
      "Reporte/reporteOP2?id_empleado=" + id_empleado  +  "&id_organo=" + id_centro_costo + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getAllReporteOPP3(id_empleado, id_centro_costo, id_ciclo, id_etapa) {
    return this.dataService.get(
      "Reporte/reporteOP3?id_empleado=" + id_empleado +  "&id_organo=" + id_centro_costo + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getAllReporteOPP4(id_empleado, id_centro_costo, id_ugp, id_ciclo, id_etapa) {
    return this.dataService.get(
      "Reporte/reporteOP4?id_empleado=" + id_empleado +  "&id_organo=" + id_centro_costo + "&id_ugp=" + id_ugp + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }
  getAllReporteOPP5(id_empleado, id_centro_costo, id_ugp, id_ciclo, id_etapa) {
    return this.dataService.get(
      "Reporte/reporteOP5?id_empleado=" + id_empleado +  "&id_organo=" + id_centro_costo + "&id_ugp=" + id_ugp + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }
  getAllReporteOPP6(anio, id_empleado, canalizador, id_ugp, id_ciclo, id_etapa) {
    return this.dataService.get(
      "Reporte/reporteOP6?anio=" + anio +  "&id_usuario=" + id_empleado + "&canalizador=" + canalizador + "&id_ugp=" + id_ugp + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }  
  getAllReporteOPP7(id_centro_costo, anio, id_empleado, id_ciclo, id_etapa) {
    return this.dataService.get(
      "Reporte/reporteOP7?id_organo=" + id_centro_costo +"&anio=" + anio +  "&id_usuario=" + id_empleado + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }
  getAllReporteOPP10(anio, id_empleado, canalizador, id_ugp, id_ciclo, id_etapa) {
    return this.dataService.get(
      "PPA/reporteOP10?anio=" + anio +  "&id_usuario=" + id_empleado + "&canalizador=" + canalizador + "&id_ugp=" + id_ugp + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }
  getAllReporteOPP11(id_ugp, id_ciclo, id_usuario) {
    return this.dataService.get(
      "PPA/reporteOP11?id_usuario=" + id_usuario + "&canalizador=" + id_ugp);
  }  
  guardarPPAcciones(data) {
    return this.dataService.post("PPA/registrar2", data);
  }

  guardarPPAccionesAdicional(data) {
    return this.dataService.post("PPA/registrar_adi", data);
  }
}
