import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: "root"
})

export class ComisionService {

  constructor(private dataService: ApiService) {
  }

  getAllComisionServicios() {
    return this.dataService.get("Com/lista");
  }

  editarComision(data) {
    return this.dataService.post("Com/editar", data);
  }

  guardarComisionServicios(data) {
    return this.dataService.post("Com/registrar", data);
  }

  eliminarComision(data) {
    return this.dataService.post("Com/anular", data);
  }

  //comision con vehiculo
  getAllComisionVehServicios(codigo_empleado, tipo_comision, adicional, id_ciclo, id_etapa) {
    return this.dataService.get("Comision/listar?codigo_empleado=" + codigo_empleado + "&tipo_comision=" + tipo_comision + "&adicional=" + adicional + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  //comision con vehiculo Reporte
  getAllComisionVehReporteServicios(codigo_empleado, tipo_comision, adicional, id_ciclo, id_etapa) {
    return this.dataService.get("Comision/lista_reporte?codigo_empleado=" + codigo_empleado + "&tipo_comision=" + tipo_comision + "&adicional=" + adicional + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  editarComisionVeh(data) {
    return this.dataService.post("Comision/editar", data);
  }

  guardarComisionVehServicios(data) {
    return (data.id == 0) ?
      this.dataService.post("Comision/registrar", data) :
      this.dataService.post("Comision/editar", data);
  }

  eliminarComisionVeh(data) {
    return this.dataService.post("Comision/anular", data);
  }

  guardarDestinoComision(data) {
    return this.dataService.post("Destino/registrar", data);
  }

  eliminarDestinoComision(data) {
    return this.dataService.post("Destino/anular", data);
  }

  getAllDestinoComision(id_comision, anio) {
    return this.dataService.get("Destino/listar?id_comision=" + id_comision + '&anio=' + anio);
  }
}
