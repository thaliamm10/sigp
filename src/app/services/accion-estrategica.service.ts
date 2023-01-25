import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: "root"
})
export class AccionEstrategicaService {
  constructor(private dataService: ApiService) {
  }

  getAllAccionEstrategica(idApertura, idCiclo) {
    return this.dataService.get("AccionEstrategica/lista?id_apertura=" + idApertura + '&id_ciclo=' + idCiclo);
  }

  getRepAE() {
    return this.dataService.get("AccionEstrategica/reporte");
  }

  getRepMetaSubdirecion(id_ciclo, id_etapa) {
    return this.dataService.get("ActividadOperativa/reportemetasb?id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getRepMetaPersonal(id_ciclo, id_etapa) {
    return this.dataService.get("PFA/reporteservidores?ciclo=" + id_ciclo + "&etapa=" + id_etapa);
  }

  getRepMetaPersonal2(id_ciclo, id_etapa, codigo, id_centro_costo) {
    return this.dataService.get("PFA/reporteservidores?ciclo=" + id_ciclo + "&etapa=" + id_etapa + "&id_empleado=" + codigo + "&id_organo=" + id_centro_costo);
  }

  getAllAccionEstrategicaxUGP(id_ugp) {
    return this.dataService.get(
      "AccionEstrategica/filtro_ugp?id_ugp=" + id_ugp
    );
  }

  getAllAccionEstrategicaxId(id) {
    return this.dataService.get("AccionEstrategica/item?id=" + id);
  }

  guardarAccionEstrategica(data) {
    return (data.id == 0) ?
      this.dataService.post("AccionEstrategica/registrar", data) :
      this.dataService.post("AccionEstrategica/editar", data);
  }

  guardarLogrosAE(data) {
    return this.dataService.post("AccionEstrategica/logros", data);
  }

  editarAccionEstrategica(data) {
    return this.dataService.post("AccionEstrategica/editar", data);
  }

  eliminarAccionEstrategica(data) {
    return this.dataService.post("AccionEstrategica/anular", data);
  }

  getAllAccionEstrategicaxOE(id_oe) {
    return this.dataService.get("AccionEstrategica/filtro?id_oe=" + id_oe);
  }

  getAllAccionEstrategicaxUGP2(id_ugp) {
    return this.dataService.get("AccionEstrategica/ugp?id_ugp=" + id_ugp);
  }

  getAllAccionEstrategicaxOE2(id_oe) {
    return this.dataService.get("AccionEstrategica/oe?id_oe=" + id_oe);
  }

  getAllAccionEstrategicaxProposito(id_ugp) {
    return this.dataService.get("proposito_ae/filtro?id_ugp=" + id_ugp);
  }

  getAExProposito(id_ugp, id_apertura) {
    return this.dataService.get("proposito_ae/lista?id_ugp=" + id_ugp + '&id_apertura=' + id_apertura);
  }

  guardarAccionEstrategicaxProposito(data) {
    return this.dataService.post("proposito_ae/registrar", data);
  }

  getAllAccionesxProposito(id_proposito) {
    return this.dataService.get(
      "proposito_ae/filtro?id_proposito=" + id_proposito + "&id_ae=0"
    );
  }

  eliminarAccionEstrategicoxProposito(data) {
    return this.dataService.post("proposito_ae/anular", data);
  }
}
