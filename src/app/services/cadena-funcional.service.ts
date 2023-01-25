import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class CadenaFuncionalService {
  constructor(private dataService: ApiService) {}

  getFuncion(id, id_ciclo, id_etapa) {
    return this.dataService.get("Funcion/lista?id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }
  
  getDivisionFuncional(id_funcion, id_ciclo, id_etapa) {
    return this.dataService.get("DivisionFuncional/lista?id_funcion=" + id_funcion + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getGrupoFuncional(id_div_funcional, id_ciclo, id_etapa) {
    return this.dataService.get("GrupoFuncional/lista?id_div_funcional=" + id_div_funcional + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getFinalidad(id_gru_funcional, id_ciclo, id_etapa) {
    return this.dataService.get("Finalidad/lista?id_gru_funcional=" + id_gru_funcional + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  guardarFuncion(data) {
    return (data.id==0) ? 
    this.dataService.post("Funcion/registrar", data) : 
    this.dataService.post("Funcion/editar", data);
  }

  eliminarFuncion(data) {
    return this.dataService.post("Funcion/anular", data);
  }

  editarFuncion(data) {
    return this.dataService.post("Funcion/editar", data);
  }

  guardarDivisionFuncional(data) {
    return (data.id==0) ? 
    this.dataService.post("DivisionFuncional/registrar", data) : 
    this.dataService.post("DivisionFuncional/editar", data);
  }

  eliminarDivisionFuncional(data) {
    return this.dataService.post("DivisionFuncional/anular", data);
  }

  editarDivisionFuncional(data) {
    return this.dataService.post("DivisionFuncional/editar", data);
  }

  guardarGrupoFuncional(data) {
    return (data.id==0) ? 
    this.dataService.post("GrupoFuncional/registrar", data) : 
    this.dataService.post("GrupoFuncional/editar", data);
  }

  eliminarGrupoFuncional(data) {
    return this.dataService.post("GrupoFuncional/anular", data);
  }

  editarGrupoFuncional(data) {
    return this.dataService.post("GrupoFuncional/editar", data);
  }

  guardarFinalidad(data) {
    return (data.id==0) ? 
    this.dataService.post("Finalidad/registrar", data) : 
    this.dataService.post("Finalidad/editar", data);
  }

  eliminarFinalidad(data) {
    return this.dataService.post("Finalidad/anular", data);
  }

  editarFinalidad(data) {
    return this.dataService.post("Finalidad/editar", data);
  }
}
