import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class PfpService {
  constructor(private dataService: ApiService) {}

  getAllPFProducto(item, anio) {
    return this.dataService.get(
      "OA_PFP/lista?id_producto=" + item + "&anio=" + anio
    );
  }

  guardarPFProducto(data) {
    return this.dataService.post("OA_PFP/registrar", data);
  }
}
