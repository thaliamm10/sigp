import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class FinIndicadorService {
  constructor(private dataService: ApiService) {}

  getFinxUGP(id_ugp) {
    return this.dataService.get("IndicadorFin/filtro?id_ugp=" + id_ugp);
  }

  guardarFinxUGP(data) {
    return this.dataService.post("IndicadorFin/registrar", data);
  }

  eliminarFinxUGP(data) {
    return this.dataService.post("IndicadorFin/anular", data);
  }

  editarFinxUGP(data) {
    return this.dataService.post("IndicadorFin/editar", data);
  }
}
