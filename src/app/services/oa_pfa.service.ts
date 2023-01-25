import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class PfaService {
  constructor(private dataService: ApiService) {}

  getAllPFAcciones(item, anio) {
    return this.dataService.get(
      "OA_PFA/lista?id_accion=" + item + "&anio=" + anio
    );
  }

  guardarPFAcciones(data) {
    return this.dataService.post("OA_PFA/registrar", data);
  }
}
