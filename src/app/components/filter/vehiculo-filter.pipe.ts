import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehiculoFilter'
})
export class VehiculoFilterPipe implements PipeTransform {

  transform(values: any, filtro_estado?: number, filtro_nombre?:string): any {
    var resultado;
    filtro_nombre = (filtro_nombre==undefined) ? "" : filtro_nombre;
    filtro_estado = (filtro_estado==undefined) ? 0 : filtro_estado;
    if(!filtro_estado){
      resultado = values.filter((item) => item.descripcion.toLowerCase().indexOf(filtro_nombre.toLowerCase())!==-1);
  }
  else{
    resultado = values.filter((item) => item.estado==filtro_estado && 
    item.descripcion.toLowerCase().indexOf(filtro_nombre.toLowerCase())!==-1);
}
return resultado;
}

}
