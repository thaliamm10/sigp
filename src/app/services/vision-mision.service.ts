import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class VisionMisionService {
  constructor(private dataService: ApiService) {}

  getPlaneamiento() {
    return this.dataService.get("planeamiento/vigente");
  }

  modificarPlaneamiento(data) {
    return this.dataService.post("planeamiento/editar", data);
  }
}
