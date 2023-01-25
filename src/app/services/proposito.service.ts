import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class PropositoService {
  constructor(private dataService: ApiService) {}

  getPropositoxUGP(id_ugp) {
    return this.dataService.get("propositougp/filtro?id_ugp=" + id_ugp);
  }

  guardarPropositoxUGP(data) {
    return this.dataService.post("propositougp/editar", data);
  }
}
