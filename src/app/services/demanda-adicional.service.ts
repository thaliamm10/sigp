import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class DemandaAdicionalService {

  constructor(private dataService: ApiService) { }


  getAllDemanda(id_usuario, id, id_ciclo, id_etapa) {
    return this.dataService.get("Demanda/listar?id_usuario=" + id_usuario + "&id=" + id + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getAllPedidoDemanda(usuario, id_ciclo, id_etapa) {
    return this.dataService.get("Demanda/listar_pedido?usuario="+ usuario + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getAllPedidoBienes(id_organo, id_ugp, id_usuario) {
    return this.dataService.get("Demanda/lista_bienes?id_usuario="+ id_usuario + "&id_ugp=" + id_ugp + "&id_organo=" + id_organo);
  }
  getAllPedidoComision(id_organo, id_ugp, id_usuario) {
    return this.dataService.get("Demanda/lista_comision?id_usuario="+ id_usuario + "&id_ugp=" + id_ugp + "&id_organo=" + id_organo);
  }
  getAllPedidoRutas(id_organo, id_ugp, id_usuario) {
    return this.dataService.get("Demanda/lista_rutas?id_usuario="+ id_usuario + "&id_ugp=" + id_ugp + "&id_organo=" + id_organo);
  }

  getAllPedidoBitacora(id_pedido) {
    return this.dataService.get("Demanda/lista_bitacora?id_pedido="+ id_pedido);
  }

  guardarPedidoDemanda(data) {
    return this.dataService.post("Demanda/registrar_pedido", data);
  }

  guardarDemanda(data) {
    return this.dataService.post("Demanda/editar", data);
  }
  situacion(data) {
    return this.dataService.post("Demanda/situacion", data);
  }
  registrarDemanda(data) {
    return this.dataService.post("Demanda/registrar", data);
  }

  listarClasificador(id_demanda) {
    return this.dataService.get("Demanda/listar_clasificador?id_demanda="+id_demanda);
  }

  lista_reporte(id_ciclo, id_etapa) {
    return this.dataService.get("Demanda/reporte_adicional?id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }
}
