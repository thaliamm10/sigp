import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class PpaService {
  constructor(private dataService: ApiService) {}

  getAllPPAcciones(id_accion, id_bienes, anio) {
    return this.dataService.get(
      "OA_PPA/lista?id_accion=" +
        id_accion +
        "&id_bienes=" +
        id_bienes +
        "&anio=" +
        anio
    );
  }

  guardarPPAcciones(data) {
    return this.dataService.post("OA_PPA/registrar", data);
  }
}
