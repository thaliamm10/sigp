import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class GastosPersonalServiceService {
  constructor(private dataService: ApiService) {
  }

  getcargos() {
    return this.dataService.get("Cargo/listar");
  }

  getOrganoPersonal() {
    return this.dataService.get("OrganoPersonal/listar");
  }

  getDependencias() {
    return this.dataService.get("Dependencias/listar");
  }

  getUnidades(dependencia) {
    return this.dataService.get("Unidades/listar?dependencia=" + dependencia);
  }

  getpersonalactivo() {
    return this.dataService.get("PersonalActivo/listar");
  }

  getpersonalinactivo() {
    return this.dataService.get("PersonalInactivo/listar");
  }

  creategastos(data) {
    return this.dataService.post("GastosPlaza/registrar", data);
  }

  getplazacargo(id_ciclo, id_etapa, regimen, dependencia, unidad) {
    return this.dataService.getarray("PlazaCargo/listar?id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa + "&regimen=" + regimen + "&dependencia=" + dependencia + "&unidad=" + unidad);
  }

  putplazacargo(data) {
    return this.dataService.post("PlazaCargo/editar", data);
  }

  getGastosPlazas(id_personal_plaza, id_ciclo, id_etapa) {
    return this.dataService.get('personal/gasto?id_personal_plaza=' + id_personal_plaza + '&id_ciclo=' + id_ciclo + '&id_etapa=' + id_etapa);
  }

  getPeriodos(id_ciclo) {
    return this.dataService.get("Periodo/listar?id_ciclo=" + id_ciclo);
  }

  getConceptoPeriodo(id_ciclo, regimen, tipo_regimen) {
    return this.dataService.get("ConceptoPeriodo/listar?id_ciclo=" + id_ciclo + '&regimen=' + regimen + '&tipo_regimen=' + tipo_regimen);
  }

  getTituloReporte(idCiclo, regimen, tipoRegimen) {
    return this.dataService.get('personal/reporte/titulo?id_ciclo=' + idCiclo + '&regimen=' + regimen + '&tipo_regimen=' + tipoRegimen);
  }

  getReporteGastoPersonal(idCiclo, idEtapa, regimen, tipoRegimen) {
    return this.dataService.get('personal/reporte/cuerpo?id_ciclo=' + idCiclo + '&id_etapa=' + idEtapa + '&regimen=' + regimen + '&tipo_regimen=' + tipoRegimen);
  }

}
