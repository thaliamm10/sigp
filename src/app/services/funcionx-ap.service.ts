import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class FuncionxAPService {
  constructor(private dataService: ApiService) {}

  getAllFuncionxAP(actividad) {
    return this.dataService.get("FuncionxAP/lista?ap=" + actividad);
  }

  guardarFuncionxAP(data) {
    return this.dataService.post("FuncionxAP/registrar", data);
  }

  editarFuncionxAP(data) {
    return this.dataService.post("FuncionxAP/editar", data);
  }

  eliminarFuncionxAP(data) {
    return this.dataService.post("FuncionxAP/anular", data);
  }
}
