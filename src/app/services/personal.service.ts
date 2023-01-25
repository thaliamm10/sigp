import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: "root"
  })
  export class PersonalService {
    constructor(private dataService: ApiService) {}
  
    getEmployees() {
      return this.dataService.getPersonal("employees");
    }
  
    getPersonal() {
      return this.dataService.getPersonal("personal728?anio=2018&mes=02");
    }
  
    getPersonalNombrado() {
      return this.dataService.getPersonal("personal276nombrado?anio=2018&mes=02");
    }
  
    getPersonalObservador() {
      return this.dataService.getPersonal(
        "personal276observador?anio=2018&mes=02"
      );
    }
  
    getPersonalCAS() {
      return this.dataService.getPersonal("personalcas?anio=2018&mes=02");
    }
  
    getAllFinanciamientoPersonalxUGP(id_plaza, anio) {
      return this.dataService.get("FinanciamientoPersonal/lista?plaza=" + id_plaza + '&anio=' + anio);
    }
  
    guardarFinanciamientoPersonalxUGP(data) {
      return this.dataService.post("/FinanciamientoPersonal/registrar", data);
    }

    editarPass(data){
      return this.dataService.post("Personal/editar",data)
    }
  }
  