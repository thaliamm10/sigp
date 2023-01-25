import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class IndicadoresAccionEstrategicaService {
  constructor(private dataService: ApiService) {}

  getAllIndicadoresAE(id_ae) {
    return this.dataService.get("IndicadorAE/filtro?id_ae=" + id_ae);
  }

  eliminarIndicadoresAE(id) {
    return this.dataService.post("IndicadorAE/anular", id);
  }

  guardarIndicadoresAE(data) {
    return this.dataService.post("IndicadorAE/registrar", data);
  }

  editarIndicadoresAE(data) {
    return this.dataService.post("IndicadorAE/editar", data);
  }
}
