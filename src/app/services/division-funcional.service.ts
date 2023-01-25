import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class DivisionFuncionalService {
  constructor(private dataService: ApiService) {}

  getAllDivisionFuncional(data = 0) {
    return this.dataService.get("DivisionFuncional/lista?funcion=" + data);
  }

  guardarDivisionFuncional(data) {
    return this.dataService.post("DivisionFuncional/registrar", data);
  }

  editarDivisionFuncional(data) {
    return this.dataService.post("DivisionFuncional/editar", data);
  }

  eliminarDivisionFuncional(data) {
    return this.dataService.post("DivisionFuncional/anular", data);
  }
}
