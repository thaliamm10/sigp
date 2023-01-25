import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class ProductoIndicadorService {
  constructor(private dataService: ApiService) {}

  getIndicadorProductoxUGP(id_ugp) {
    return this.dataService.get("IndicadorProducto/filtro?id_ugp=" + id_ugp);
  }

  guardarIndicadorProductoxUGP(data) {
    return this.dataService.post("IndicadorProducto/registrar", data);
  }

  eliminarIndicadorProductoxUGP(data) {
    return this.dataService.post("IndicadorProducto/anular", data);
  }

  editarIndicadorProductoxUGP(data) {
    return this.dataService.post("IndicadorProducto/editar", data);
  }
}
