import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

//const apiURL: string = 'http://sigp.senamhi.gob.pe:2020/wsigp3/api/'; // oficial
//const apiURL: string = 'http://sigp.senamhi.gob.pe:2020/sigpapi-desarrollo/api/'; // desarrollo
const apiURL = 'http://localhost:8080/api/';
//const apiURL = 'http://localhost:8080/sigp_back-08052020/api/';
// const apiURL: string   =   'http://172.25.13.15:8081/api/';
const apiPersonal: string = 'http://172.25.0.247:9091/api/';
const apiEstaciones: string = 'http://172.25.0.247:9091/ws-personal-ws/api/estaciones';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  constructor(private http: HttpClient) {
  }

  get(ruta) {
    return this.http.get(apiURL + ruta);
  }

  getCEPLAN(ruta) {
    return this.http.get(apiURL + ruta, {responseType: 'text'});
  }

  getPersonal(ruta) {
    return this.http.get(apiPersonal + ruta);
  }

  getEstaciones() {
    return this.http.get(apiEstaciones);
  }

  post(ruta, data) {
    return this.http.post(apiURL + ruta, data, {headers: headers}).pipe(
      map(res => {
        return res;
      })
    );
  }

  getarray(ruta) {
    return this.http.get<any[]>(apiURL + ruta);
  }

}
