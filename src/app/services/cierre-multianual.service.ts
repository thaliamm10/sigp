import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class CierreMultianualService {
  constructor(private dataService: ApiService) {}

  getAllPFP(id_organo) {
    return this.dataService.get("CM/lista_pfp?id_organo=" + id_organo);
  }

  getAllPFA(id_organo) {
    return this.dataService.get("CM/lista_pfa?id_organo=" + id_organo);
  }

  getAllPPA(id_organo) {
    return this.dataService.get("CM/lista_ppa?id_organo=" + id_organo);
  }

  cerrar(data) {
    return this.dataService.post("CM/cierre", data);
  }

  replicar(data) {
    return this.dataService.post("CM/replicar", data);
  }
}
