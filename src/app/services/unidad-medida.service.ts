import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class UnidadMedidaService {
  constructor(private dataService: ApiService) {}

  getAllUnidadMedida() {
    return this.dataService.get("UnidadMedida/lista");
  }

  getAllClasificador() {
    return this.dataService.get("Clasificador/lista");
  }
}
