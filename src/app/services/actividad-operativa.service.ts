import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: "root"
})
export class ActividadOperativaService {
  constructor(private dataService: ApiService) {
  }

  getAllActividadOperativa(id = 0) {
    return this.dataService.get("ActividadOperativa/lista?id=" + id);
  }

  getAllActividadOperativa2(id_meta, id_ciclo, id_etapa) {
    return this.dataService.get("ActividadOperativa/lista2?id_meta=" + id_meta + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getAllActividadOperativaxUGP(id_ugp) {
    return this.dataService.get(
      "ActividadOperativa/filtro_ugp?id_ugp=" + id_ugp
    );
  }

  getAllActividadOperativaxAE(id_ae, id_ciclo, id_etapa) {
    return this.dataService.get("ActividadOperativa/filtro?id_ae=" + id_ae + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  guardarActividadOperativa(data) {
    return (data.id == 0) ?
      this.dataService.post("ActividadOperativa/registrar", data) :
      this.dataService.post("ActividadOperativa/editar", data);
  }

  editarActividadOperativa(data) {
    return this.dataService.post("ActividadOperativa/editar", data);
  }

  eliminarActividadOperativa(data) {
    return this.dataService.post("ActividadOperativa/anular", data);
  }
}
