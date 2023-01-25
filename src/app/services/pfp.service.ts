import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class PfpService {
  constructor(private dataService: ApiService) {}

  getAllPFProducto(item, anio) {
    return this.dataService.get(
      "PFP/lista?id_producto=" + item + "&anio=" + anio
    );
  }

  guardarPFProducto(data) {
    return this.dataService.post("PFP/registrar", data);
  }


  guardarReporteOpp8(data) {
    return (data.id==0) ? 
    this.dataService.post("Opp8/registrar", data):
    this.dataService.post("Opp8/editar", data);
  }

  getAllReporteOpp8(id_organo,id_usuario){
    return this.dataService.get("Opp8/listar?id_organo="+ id_organo +"&id_usuario=" + id_usuario);
  }
}
