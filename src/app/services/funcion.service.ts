import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class FuncionService {
  constructor(private dataService: ApiService) {}

  getAllFuncion() {
    return this.dataService.get("Funcion/lista");
  }

  guardarFuncion(data) {
    return this.dataService.post("Funcion/registrar", data);
  }

  editarFuncion(data) {
    return this.dataService.post("Funcion/editar", data);
  }

  eliminarFuncion(data) {
    return this.dataService.post("Funcion/anular", data);
  }
}
