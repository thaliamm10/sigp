import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class AperturaService {
  constructor(private dataService: ApiService) {}

  getAllApertura() {
    return this.dataService.get("Apertura/lista");
  }

  getAllEtapa(id_ciclo) {
    return this.dataService.get("Etapa/lista?id_ciclo=" + id_ciclo);
  }

  getAllEtapa2() {
    return this.dataService.get("Etapa/listar");
  }
}