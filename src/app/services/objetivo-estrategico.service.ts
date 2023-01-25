import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: "root"
})
export class ObjetivoEstrategicoService {
  constructor(private dataService: ApiService) {
  }

  getAllObjetivoEstrategico(idCiclo, idApertura) {
    return this.dataService.get("ObjetivoEstrategico/lista?idCiclo=" + idCiclo + '&id_apertura=' + idApertura);
  }

  getAllObjetivoEstrategicoxId(id) {
    return this.dataService.get("ObjetivoEstrategico/item?id=" + id);
  }

  guardarObjetivoEstrategico(data) {
    return (data.id == 0) ?
      this.dataService.post("ObjetivoEstrategico/registrar", data) :
      this.dataService.post("ObjetivoEstrategico/editar", data);
  }

  guardarLogrosOE(data) {
    return this.dataService.post("ObjetivoEstrategico/logros", data);
  }

  editarObjetivoEstrategico(data) {
    return this.dataService.post("ObjetivoEstrategico/editar", data);
  }

  eliminarObjetivoEstrategico(data) {
    return this.dataService.post("ObjetivoEstrategico/anular", data);
  }

  guardarObjetivoEstrategicoxFin(data) {
    return this.dataService.post("fin_oe/registrar", data);
  }

  getOExFin(id_ugp, id_apertura) {
    return this.dataService.get("fin_oe/lista?id_ugp=" + id_ugp + '&id_apertura=' + id_apertura);
  }

  getObjetivoEstrategicoxFin(id_ugp) {
    return this.dataService.get("fin_oe/filtro?id_ugp=" + id_ugp);
  }

  getObjetivoEstrategicoxUGP(id_ugp) {
    //console.log("ingreso a ugp:" + id_ugp);
    return this.dataService.get("ObjetivoEstrategico/ugp?id_ugp=" + id_ugp);
  }


  eliminarObjetivoEstrategicoxFin(data) {
    return this.dataService.post("fin_oe/anular", data);
  }
}
