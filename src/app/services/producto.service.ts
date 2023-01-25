import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class ProductoService {
  constructor(private dataService: ApiService) {}

  getAllProducto() {
    return this.dataService.get("producto/lista?id=0");
  }

  getProductoxId(id_producto) {
    return this.dataService.get("producto/lista?id=" + id_producto);
  }

  getProductoxUGP(id_ugp) {
    return this.dataService.get("producto/filtro?id_ugp=" + id_ugp);
  }

  getProductoxFiltro(id_ugp, id_usuario) {
    return this.dataService.get("producto/fi?id_ugp=" + id_ugp + "&usuario=" + id_usuario);
  }

  getProductoxProgramacion(id_ugp, id_usuario, adicional) {
    return this.dataService.get("producto/pp?id_ugp=" + id_ugp + "&usuario=" + id_usuario + "&adicional=" +  adicional);
  }

  getProductoxOrgano(id_organo, id_ae, id_ao, id_ciclo, id_etapa) {
    return this.dataService.get("producto/organo?id_organo=" + id_organo + "&id_ae=" + id_ae + "&id_ao=" + id_ao + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  guardarProducto(data) {
    return (data.id==0) ?
    this.dataService.post("producto/registrar", data) :
    this.dataService.post("producto/editar", data);
  }

  editarProducto(data) {
    return this.dataService.post("producto/editar", data);
  }

  eliminarProducto(data) {
    return this.dataService.post("producto/anular", data);
  }

  getDefinicionProductoxUGP(id_definicion, id_ugp, id_producto) {
    return this.dataService.get(
      "DefinicionProducto/lista?definicion=" +
        id_definicion +
        "&ugp=" +
        id_ugp +
        "&producto=" +
        id_producto
    );
  }

  guardarDefinicionProductoxUGP(data) {
    return this.dataService.post("DefinicionProducto/registrar", data);
  }

  editarDefinicionProductoxUGP(data) {
    return this.dataService.post("DefinicionProducto/editar", data);
  }

  /*
  getObjetivoEstrategicoxUGP(id_ugp) {
    return this.dataService.get("ObjetivoEstrategico/ugp?id_ugp=" + id_ugp);
  }

  getAccionEstrategicaxOE(id_oe) {
    return this.dataService.get("AccionEstrategica/oe?id_oe=" + id_oe);
  }

  getAllUnidadMedida() {
    return this.dataService.get("UnidadMedida/lista");
  }
  */
}
