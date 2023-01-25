import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class UgpService {
  constructor(private dataService: ApiService) {}

  getAllUGP() {
    /* return this.dataService.get("ugp/lista?id=0"); */
    return this.dataService.get("ugp/lista_ugp?id=0");
  }

  getAllUGPxlista(id_ciclo, id_etapa) {
    return this.dataService.get("ugp/lista?id=0" + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getAllUGPxFiltro(id_empleado, id_ciclo, id_etapa) {
    return this.dataService.get("ugp/fi?id_empleado=" + id_empleado + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getAllUGPxMarcoLogico(id_empleado, id_ciclo, id_etapa) {
    return this.dataService.get("ugp/ml?id_empleado=" + id_empleado + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getAllUGPxProgramacion(id_empleado, id_ciclo, id_etapa, adicional) {
    return this.dataService.get("ugp/pp?id_empleado=" + id_empleado + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa + "&adicional=" + adicional);
  }

  getUGPxId(id_ugp) {
    return this.dataService.get("ugp/lista?id=" + id_ugp);
  }

  getAllUGPBienes(anio) {
    return this.dataService.get("ugp/bienes?anio=" + anio);
  }

  guardarUGP(data) {
    return (data.id==0) ?
    this.dataService.post("ugp/registrar", data) :
    this.dataService.post("ugp/editar", data);
  }

  editarUGP(data) {
    return this.dataService.post("ugp/editar", data);
  }

  eliminarUGP(data) {
    return this.dataService.post("ugp/anular", data);
  }
}
