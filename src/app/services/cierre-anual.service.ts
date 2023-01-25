import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class CierreAnualService {
  constructor(private dataService: ApiService) {}

  getAllPFP(id_organo, id_ugp) {
    return this.dataService.get(
      "CA/lista_pfp?id_organo=" + id_organo + "&id_ugp" + id_ugp
    );
  }

  getAllPFA(id_organo, id_ugp) {
    return this.dataService.get(
      "CA/lista_pfa?id_organo=" + id_organo + "&id_ugp" + id_ugp
    );
  }

  getAllPPA(id_organo, id_ugp) {
    return this.dataService.get(
      "CA/lista_ppa?id_organo=" + id_organo + "&id_ugp" + id_ugp
    );
  }

  cerrarUGP(data) {
    return this.dataService.post("CA/cierre", data);
  }

  replicar(data) {
    return this.dataService.post("CA/replicar", data);
  }
}
