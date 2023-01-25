import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: "root"
})
export class MetaXAoService {
  constructor(private dataService: ApiService) {
  }

  getAllMetaXAo(id, id_ciclo, id_etapa) {
    return this.dataService.get("MetaxAO/lista?id=" + id + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getAllMetaXAoo(id, id_ciclo, id_etapa) {
    return this.dataService.get("MetaxAO/listaaa?id=" + id + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getAllMetaxUnindad(id, id_ciclo, id_etapa, dependencia, unidad) {
    return this.dataService.get("MetaxAOxUnidad/lista?id=0&id_ciclo=" + id_ciclo + "+&id_etapa=" + id_etapa + "&dependencia=" + dependencia + "&unidad=" + unidad);
  }

  guardarMetaXAo(data) {
    return (data.id_meta == 0) ?
      this.dataService.post("MetaxAO/registrar", data) :
      this.dataService.post("MetaxAO/editar", data);
  }

  eliminarMetaXAo(data) {
    return this.dataService.post("MetaxAO/anular", data);
  }
}
