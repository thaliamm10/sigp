import {Pipe, PipeTransform} from '@angular/core';

@Pipe(
  {
    name: 'metafilter'
  }
)
export class MetaFilterPipe implements PipeTransform {
  transform(values: any, filtro_meta?: string): any {
    let resultado;
    filtro_meta = (filtro_meta === undefined || filtro_meta ===null ) ? '' : filtro_meta;
    resultado = values.filter(
      item =>
        // item.sec_func.toLowerCase().indexOf(filtro_meta.toLowerCase()) !== -1 ||
        item.nombre_categoria.toLowerCase().indexOf(filtro_meta.toLowerCase()) !== -1 ||
        item.nombre_programa.toLowerCase().indexOf(filtro_meta.toLowerCase()) !== -1 ||
        item.nombre_producto.toLowerCase().indexOf(filtro_meta.toLowerCase()) !== -1 ||
        item.nombre_actividad.toLowerCase().indexOf(filtro_meta.toLowerCase()) !== -1 ||
        item.nombre_funcion.toLowerCase().indexOf(filtro_meta.toLowerCase()) !== -1 ||
        item.nombre_finalidad.toLowerCase().indexOf(filtro_meta.toLowerCase()) !== -1 ||
        item.nombre_departamento.toLowerCase().indexOf(filtro_meta.toLowerCase()) !== -1 ||
        item.nombre_provincia.toLowerCase().indexOf(filtro_meta.toLowerCase()) !== -1 ||
        item.nombre_distrito.toLowerCase().indexOf(filtro_meta.toLowerCase()) !== -1 ||
        item.nombre_unidad.toLowerCase().indexOf(filtro_meta.toLowerCase()) !== -1
    );
    return resultado;
  }
}
