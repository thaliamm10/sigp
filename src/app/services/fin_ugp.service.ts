import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class FinalidadService {
  constructor(private dataService: ApiService) {}

  getFinxUGP(id_ugp) {
    return this.dataService.get("finugp/filtro?id_ugp=" + id_ugp);
  }

  guardarFinxUGP(data) {
    return this.dataService.post("finugp/editar", data);
  }
}
