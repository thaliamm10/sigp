import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(
    private dataService: ApiService
    ) { }

  registrarRuta(data){
    return (data.id==0) ?
     this.dataService.post("Rutas/registrar", data):
     this.dataService.post("Rutas/editar", data);
  }

  editarRuta(data){
    return this.dataService.post("Rutas/editar", data);
  }

  eliminarRuta(data){
    return this.dataService.post("Rutas/anular",data);
  }

  listarRutas(codigo_empleado, adicional, id_ciclo, id_etapa){
    return this.dataService.get("Rutas/listar?codigo_empleado="+ codigo_empleado + "&adicional=" + adicional + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa );
  }

  listarRutasReporte(codigo_empleado, adicional, id_ciclo, id_etapa){
    return this.dataService.get("Rutas/listar_reporte?codigo_empleado="+ codigo_empleado + "&adicional=" + adicional + "&id_ciclo=" + id_ciclo + "&id_etapa=" + id_etapa );
  }

  guardarDestinoRuta(data) {
    return this.dataService.post("DestinoRuta/registrar", data);
  }

  eliminarDestinoRuta(data) {
    return this.dataService.post("DestinoRuta/anular", data);
  }

  getAllDestinoRuta(id_ruta) {
    return this.dataService.get("DestinoRuta/listar?id_ruta="+id_ruta);
  }

  getAllEstacion(){
    return this.dataService.get("Estacion/lista");
  }

  getAllEstacionOTI(){
    return this.dataService.getEstaciones();
  }

  getAllEstacionLocal(){
    return this.dataService.get("Kits/estaciones");
  }
}
