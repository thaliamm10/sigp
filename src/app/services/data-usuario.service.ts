import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

const rutaUsuarios: string = "http://172.25.0.250:3000/api/";

const headers = new HttpHeaders({
  "Content-Type": "application/json"
});
@Injectable({
  providedIn: "root"
})
export class DataUsuarioService {
  constructor(private http: HttpClient) {}

  get(ruta) {
    return this.http.get(rutaUsuarios + ruta);
  }
}
