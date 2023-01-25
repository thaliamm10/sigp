import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Subject } from 'rxjs';
import { UbicacionInterface } from '../entities/ubicacion-interface';

@Injectable({
  providedIn: "root"
})
export class RegionService {
  // lista_departamento : Subject<any> = new Subject;
  // lista_provincia : Subject<any> = new Subject;
  // lista_distrito : Subject<any> = new Subject;
  constructor(private dataService: ApiService) {}
  
  // get listaDepartamento(){
  //   return this.lista_departamento.asObservable();
  // }

  // get listaProvincia(){
  //   return this.lista_provincia.asObservable();
  // }

  // get listaDistrito(){
  //   return this.lista_distrito.asObservable();
  // }

  getAllDepartarmento() {
     return this.dataService.get("departamento/lista");     
  }

  getAllDepartarmentoOrgano(id_organo) {
    return this.dataService.get("departamento/lista2?id_organo=" + id_organo);    
 }

  getAllProvincia(id_departamento) {
    return this.dataService.get("provincia/lista?id_departamento=" + id_departamento);
  }

  getAllDistrito(id_departamento, id_provincia) {
    return this.dataService.get("distrito/lista?id_departamento=" + id_departamento + "&id_provincia=" +id_provincia);
  }

  // getAllDepartarmento2() {
  //    return this.dataService.get("departamento/lista")
  //    .subscribe(data=>(this.lista_departamento.next(data)));   
  // }

  // getAllProvincia2(id_departamento) {
  //   return this.dataService.get("provincia/lista?id_departamento=" + id_departamento)
  //   .subscribe(data=>(this.lista_provincia.next(data)));
  // }

  // getAllDistrito2(id_departamento, id_provincia) {
  //   return this.dataService.get("distrito/lista?id_departamento=" + id_departamento + "&id_provincia=" +id_provincia)
  //   .subscribe(data=>(this.lista_distrito.next(data)));
  // }
}
