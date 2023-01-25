import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class TopePresupuestalService {
  constructor(private dataService: ApiService) {}

  //lista de topes
  getAllTopeCC(id_ugp, anio, id_etapa) {
    return this.dataService.get("tope_cc/lista?id_ugp=" + id_ugp + "&anio=" + anio + "&id_etapa=" + id_etapa);
  }
  getAllTopeGenerica(anio, id_etapa) {
    return this.dataService.get("tope_generica/lista?anio="+anio + "&id_etapa=" + id_etapa);
  }
  getAllTopeFuente(anio, id_etapa) {
    return this.dataService.get("tope_fuente/lista?anio="+anio + "&id_etapa=" + id_etapa);
  }
  getAllTopeCanalizadora(anio, id_etapa) {
    return this.dataService.get("tope_canalizadora/lista?anio="+anio + "&id_etapa=" + id_etapa);
  }
  getAllTopeIntegral(anio, id_etapa){
    return this.dataService.get("tope_integral/lista?anio="+anio + "&id_etapa=" + id_etapa);
  }

  //registro de topes
  guardarTopeCC(data) {
    return this.dataService.post("tope_cc/registrar", data);
  }
  guardarTopeFuente(data) {
    return this.dataService.post("tope_fuente/registrar", data);
  }
  guardarTopeGenerica(data) {
    return this.dataService.post("tope_generica/registrar", data);
  }
  guardarTopeCanalizadora(data) {
    return this.dataService.post("tope_canalizadora/registrar", data);
  }
  guardarTopeIntegral(data){
    return this.dataService.post("tope_integral/registrar",data);
  }
  
  //Marco Presupuestal
  getAllMarcoUGP(id_ugp,id_usuario,adicional) {
    return this.dataService.get("marco_ugp/lista?id_ugp=" +  id_ugp + "&id_usuario=" +id_usuario + "&adicional=" + adicional);
  }
  getAllMarcoUGPOrgano(id_ugp,id_usuario) {
    return this.dataService.get("marco_ugp/lista_organo?id_ugp=" +  id_ugp + "&id_usuario=" +id_usuario);
  }
  getAllMarcoUGPFuente(id_ugp,id_usuario) {
    return this.dataService.get("marco_ugp/lista_fuente?id_ugp=" +  id_ugp + "&id_usuario=" +id_usuario);
  }
}