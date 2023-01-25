import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class AccionesService {
  constructor(private dataService: ApiService) {}

  getAllAccionesxIdProducto(id_producto) {
    return this.dataService.get(
      "AccionProducto/filtro?id_producto=" + id_producto
    );
  }

  getAllAccionesxFiltro(id_producto, id_usuario, adicional) {
    return this.dataService.get(
      "AccionProducto/fi?id_producto=" + id_producto + "&usuario=" + id_usuario + "&adicional=" + adicional);
  }

  getAllAccionesxMetaFisica(id_producto, id_usuario, adicional) {
    return this.dataService.get(
      "AccionProducto/meta?id_producto=" + id_producto + "&usuario=" + id_usuario + "&adicional=" + adicional);
  }

  getAllAccionesxIdProducto3(id_producto,id, id_usuario) {
    return this.dataService.get(
      "AccionProducto/filtro3?id_producto=" + id_producto + "&id="+ id+ "&usuario=" + id_usuario);
  }

  getAllAccionesxProgramacion(id_producto, id_usuario, adicional) {
    return this.dataService.get(
      "AccionProducto/pp?id_producto=" + id_producto + "&usuario=" + id_usuario + "&adicional=" + adicional);
  }

  getAllAccionesxIdUGP(id_ugp) {
    return this.dataService.get(
      "AccionProducto/filtro_ugp?id_ugp=" + id_ugp
    );
  }

  getProductoxUGP(id_ugp) {
    return this.dataService.get("producto/filtro?id_ugp=" + id_ugp);
  }

  guardarAccionProducto(data) {
    return (data.id==0) ? 
    this.dataService.post("AccionProducto/registrar", data) : 
    this.dataService.post("AccionProducto/editar", data);
  }

  editarAccionProducto(data) {
    return this.dataService.post("AccionProducto/editar", data);
  }

  eliminarAccionProducto(data) {
    return this.dataService.post("AccionProducto/anular", data);
  }

  guardarDef(data) {
    return (data.id_definicion==0) ? 
    this.dataService.post("DefinicionProducto/registrar", data) : 
    this.dataService.post("DefinicionProducto/editar", data);
  }

  listarDef(id_definicion,id_ugp,id_accion) {
    return this.dataService.get("/DefinicionProducto/lista?id=" + id_definicion + "&id_ugp=" + id_ugp + "&id_accion=" + id_accion )
  }

  editarDef(data) {
    return this.dataService.post("DefinicionProducto/editar", data);
  }
}
