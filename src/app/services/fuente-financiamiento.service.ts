import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FuenteFinanciamientoService {
  constructor(private dataService: ApiService) {}

  getAllCiclo() {
    return this.dataService.get('fuente_financiamiento/lista');
  }
}
