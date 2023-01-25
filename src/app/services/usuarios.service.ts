import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class UsuariosService {
  constructor(private dataService: ApiService) {}

  getAllUsuarios() {
    return this.dataService.get("Personal/lista");
  }

  getAllUsuarios2(id_ugp) {
    return this.dataService.get("Personal/lista2?id_ugp=" + id_ugp);
  }

  getAllUsuarios3(id_usuario) {
    return this.dataService.get("Personal/lista3?usuario=" + id_usuario);
  }

  getPersonalProgramado() {
    return this.dataService.get("Personal/programado");
  }

  guardarUsuariosxUGP(data) {
    return this.dataService.post("PersonalUGP/registrar", data);
  }

  eliminarUsuariosxUGP(data) {
    return this.dataService.post("PersonalUGP/anular", data);
  }

  getAllUsuariosxUGP(id_ugp) {
    return this.dataService.get("PersonalUGP/filtro?id_ugp=" + id_ugp);
  }

  guardarEstado(data) {
    return this.dataService.post("Personal/perfil", data);
  }

  sincronizar() {
    return this.dataService.get("Personal/sincronizar");
  }

  /*
  getAllUsuarios() {
    return this.dataUsuarioService.get("employees");
  }
  */
}
