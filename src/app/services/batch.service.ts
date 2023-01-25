import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private dataService: ApiService) { }

  realizarBatchEtapa(data) {
    return this.dataService.post("batch/etapa", data);
  }
}
