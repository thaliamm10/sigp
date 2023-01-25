import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  constructor(private dataService: ApiService) {}

  getCeplan(anio, id_organo, id_ciclo, id_etapa) {
    return this.dataService.get('Reporte/ceplan2?id_organo=' + id_organo + '&anio=' + anio + '&id_ciclo=' + id_ciclo + '&id_etapa=' + id_etapa);
  }

  getPfpMensual(idProducto, idAnio) {
    return this.dataService.get(
      'Reporte/PfpMensual?id_producto=' + idProducto + '&anio=' + idAnio
    );
  }

  getPfpMultianual(idProducto, idAnio) {
    return this.dataService.get(
      'Reporte/PfpMultianual?id_producto=' + idProducto + '&anio=' + idAnio
    );
  }

  getPfMensual(id_ugp, idAnio) {
    return this.dataService.get(
      'Reporte/PfMensual?id_ugp=' + id_ugp + '&anio=' + idAnio
    );
  }

  getPfMultianual(id_ugp, idAnio) {
    return this.dataService.get(
      'Reporte/PfMultianual?id_ugp=' + id_ugp + '&anio=' + idAnio
    );
  }

  getPpaMensual(id_accion, idAnio) {
    return this.dataService.get(
      'Reporte/PpaMensual?id_accion=' + id_accion + '&anio=' + idAnio
    );
  }

  getPpaMultianual(id_accion, idAnio) {
    return this.dataService.get(
      'Reporte/PpaMultianual?id_accion=' + id_accion + '&anio=' + idAnio
    );
  }

  getReportePrep(id_ciclo, id_etapa){
    return this.dataService.get('Reporte/Presupuestal2?id_ciclo=' + id_ciclo + '&id_etapa=' + id_etapa);
  }

  getReportePrepSIGA(anio, id_usuario){
    return this.dataService.get('Opp8/siga?anio=' + anio + '&id_usuario=' + id_usuario);
  }

  getReporteFinanciado(anio, id_usuario){
    return this.dataService.get('Opp8/financiado?anio=' + anio + '&id_usuario=' + id_usuario);
  }

  getReporteFinanciado2(id_ciclo, id_etapa){
    return this.dataService.get('Opp8/financiado_v2?id_ciclo=' + id_ciclo + '&id_etapa=' + id_etapa);
  }

  getReporteFinanciamientoMasPersonal(id_ciclo, id_etapa) {
    return this.dataService.get('Opp8/financiamiento_mas_empleado?id_ciclo=' + id_ciclo + '&id_etapa=' + id_etapa);
  }

  getReporteFinanciamientoMasPersonalUA(id_ciclo, id_etapa) {
    return this.dataService.get('Opp8/financiamiento_empleado_ua?id_ciclo=' + id_ciclo + '&id_etapa=' + id_etapa);
  }

  getReporteFinancMasPersonalDemandaAdicional(id_ciclo, id_etapa) {
    return this.dataService.get('Opp8/financiamiento_mas_empleado_adiccional?id_ciclo=' + id_ciclo + '&id_etapa=' + id_etapa);
  }

}
