import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { ApiService } from "./api.service";
import { CatagoriaPresupuestalInterface } from "src/app/entities/categoria-presupuestal-interface"
import { from } from 'rxjs';
 
@Injectable({
  providedIn: "root"
})
export class CategoriaPresupuestalService {
  lista: Subject<CatagoriaPresupuestalInterface[]> = new Subject();
  constructor(private dataService: ApiService) {}

  get listar() {
    return this.lista.asObservable();
  }

  getCategoriaPresupuestal(id, id_ciclo, id_etapa) {
    return this.dataService.get(
      "CategoriaPresupuestal/lista?id=" + id + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }
  
  getProgramaPresupuestal(id, id_categoria, id_ciclo, id_etapa) {
    return this.dataService.get(
      "ProgramaPresupuestal/lista?id=" + id + "&id_categoria=" + id_categoria + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa);
  }

  getProductoPresupuestal(id, id_programa, id_ciclo, id_etapa) {
    return this.dataService.get(
      "ProductoPresupuestal/lista?id=" + id + "&id_programa=" + id_programa + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa
    );
  }

  getActividadPresupuestal(id, id_producto, id_ciclo, id_etapa) {
    return this.dataService.get(
      "ActividadPresupuestal/lista?id=" + id + "&id_producto=" + id_producto + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa
    );
  }

  guardarCategoriaPresupuestal(data) {
    return (data.id==0) ? 
    this.dataService.post("CategoriaPresupuestal/registrar", data) : 
    this.dataService.post("CategoriaPresupuestal/editar", data);
  }

  eliminarCategoriaPresupuestal(data) {
    return this.dataService.post("CategoriaPresupuestal/anular", data);
  }

  editarCategoriaPresupuestal(data) {
    return this.dataService.post("CategoriaPresupuestal/editar", data);
  }

  guardarProgramaPresupuestal(data) {
    return (data.id==0) ? 
    this.dataService.post("ProgramaPresupuestal/registrar", data) : 
    this.dataService.post("ProgramaPresupuestal/editar", data);
  }

  guardarProductoPresupuestal(data) {
    return (data.id==0) ? 
    this.dataService.post("ProductoPresupuestal/registrar", data) : 
    this.dataService.post("ProductoPresupuestal/editar", data);
  }

  eliminarProductoPresupuestal(data) {
    return this.dataService.post("ProductoPresupuestal/anular", data);
  }

  editarProductoPresupuestal(data) {
    return this.dataService.post("ProductoPresupuestal/editar", data);
  }

  guardarActividadPresupuestal(data) {
    return (data.id==0) ? 
    this.dataService.post("ActividadPresupuestal/registrar", data) : 
    this.dataService.post("ActividadPresupuestal/editar", data);
  }

  eliminarActividadPresupuestal(data) {
    return this.dataService.post("ActividadPresupuestal/anular", data);
  }

  editarActividadPresupuestal(data) {
    return this.dataService.post("ActividadPresupuestal/editar", data);
  }
}
