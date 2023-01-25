import {UserAuntentication} from "../entities/UserAuntentication.entity";
import {Injectable} from "@angular/core";
import {ApiService} from "../services/api.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isUserLoggedIn;
  public usserLogged: UserAuntentication;

  constructor(private dataService: ApiService) {
    this.isUserLoggedIn = false;
  }

  getLogin(usuario, pass, idCiclo) {
    return this.dataService.get(
      "Seguridad/login?usu=" + usuario + "&pass=" + pass + "&id_ciclo=" + idCiclo
    );
  }

  setPassword(data) {
    return this.dataService.post("Seguridad/cambiar_clave", data);
  }

  setPassword2(dni, pass) {
    return this.dataService.get("Seguridad/cambiar_clave2?dni=" + dni + "&pass=" + pass);
  }

  /*
  setUserLoggedIn(user: UserAuntentication, estado) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem("userAuth", JSON.stringify(user));
    localStorage.setItem("estado", JSON.stringify(estado));
  }
  */
  setUserLoggedIn(user: UserAuntentication) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem("userAuth", JSON.stringify(user));
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem("userAuth"));
  }
}
