import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class PropositoIndicadorService {
  constructor(private dataService: ApiService) {}

  getIndicadorPropositoxUGP(id_ugp) {
    return this.dataService.get("IndicadorProposito/filtro?id_ugp=" + id_ugp);
  }

  guardarIndicadorPropositoxUGP(data) {
    return this.dataService.post("IndicadorProposito/registrar", data);
  }

  eliminarIndicadorPropositoxUGP(data) {
    return this.dataService.post("IndicadorProposito/anular", data);
  }

  editarIndicadorPropositoxUGP(data) {
    return this.dataService.post("IndicadorProposito/editar", data);
  }
}
