import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class MetaXOrganoService {
  constructor(private dataService: ApiService) {}

  getAllMetaXOrgano(data) {
    return this.dataService.get("MetaxOrgano/lista?organo=" + data);
  }

  guardarMetaXOrgano(data) {
    return this.dataService.post("MetaxOrgano/registrar", data);
  }

  editarMetaXOrgano(data) {
    return this.dataService.post("MetaxOrgano/editar", data);
  }

  eliminarMetaXOrgano(data) {
    return this.dataService.post("MetaxOrgano/anular", data);
  }
}
