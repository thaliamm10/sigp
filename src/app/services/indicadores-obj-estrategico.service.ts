import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class IndicadoresObjEstrategicoService {
  constructor(private dataService: ApiService) {}

  getAllIndicadoresOE(id_oe) {
    return this.dataService.get("IndicadorOE/filtro?id_oe=" + id_oe);
  }

  eliminarIndicadoresOE(id) {
    return this.dataService.post("IndicadorOE/anular", id);
  }

  guardarIndicadoresOE(data) {
    return this.dataService.post("IndicadorOE/registrar", data);
  }

  editarIndicadoresOE(data) {
    return this.dataService.post("IndicadorOE/editar", data);
  }
}
