import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class OrganoService {
  constructor(private dataService: ApiService) {}

  getAllOrgano(id = 0) {
    return this.dataService.get("organo/lista?id_organo=" + id);
  }

  getAllResponsableOrgano(codigo_organo) {
    return this.dataService.get("organo/lista_responsable?codigo=" + codigo_organo);
  }

  getAllOrganoxUGP(id_ugp) {
    return this.dataService.get("CA/lista_organo?id_ugp=" + id_ugp);
  }

  getAllOrganoxAE(id_ae) {
    return this.dataService.get("CA/AE?id_ae=" + id_ae);
  }


  getAllOrganoxProducto(id_producto, id_organo) {
    return this.dataService.get("OrganoxProducto/filtro?id_producto=" + id_producto + "&id_organo=" + id_organo);
  }

  guardarOrgano(data) {
    return (data.id==0) ? 
    this.dataService.post("organo/registrar", data) : 
    this.dataService.post("organo/editar", data);
  }

  editarOrgano(data) {
    return this.dataService.post("organo/editar", data);
  }

  eliminarOrgano(data) {
    return this.dataService.post("organo/anular", data);
  }

  guardarOrganoxProducto(data) {
    return this.dataService.post("OrganoxProducto/registrar", data);
  }

  eliminarOrganoxProducto(data) {
    return this.dataService.post("OrganoxProducto/anular", data);
  }
  guardarOrganoxAccion(data) {
    return this.dataService.post("OrganoxAccion/registrar", data);
  }

  eliminarOrganoxAccion(data) {
    return this.dataService.post("OrganoxAccion/anular", data);
  }

  getAllUGPxOrgano(id) {
    return this.dataService.get("ugp_organo/lista?id=" + id);
  }

  guardarUGPxOrgano(data) {
    return (data.id==0) ? 
    this.dataService.post("ugp_organo/registrar", data) : 
    this.dataService.post("ugp_organo/editar", data);
  }
}
