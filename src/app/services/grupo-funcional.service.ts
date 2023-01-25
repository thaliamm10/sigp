import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class GrupoFuncionalService {
  constructor(private dataService: ApiService) {}

  getAllGrupoFuncional(data = 0) {
    return this.dataService.get("GrupoFuncional/lista?div_funcional=" + data);
  }

  guardarGrupoFuncional(data) {
    return this.dataService.post("GrupoFuncional/registrar", data);
  }

  editarGrupoFuncional(data) {
    return this.dataService.post("GrupoFuncional/editar", data);
  }

  eliminarGrupoFuncional(data) {
    return this.dataService.post("GrupoFuncional/anular", data);
  }
}
