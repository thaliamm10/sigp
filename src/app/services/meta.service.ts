import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class MetaService {
  constructor(private dataService: ApiService) {}

  getAllMeta() {
    return this.dataService.get("Meta/lista");
  }

  guardarMeta(data) {
    return this.dataService.post("Meta/registrar", data);
  }

  editarMeta(data) {
    return this.dataService.post("Meta/editar", data);
  }

  eliminarMeta(data) {
    return this.dataService.post("Meta/anular", data);
  }
}
