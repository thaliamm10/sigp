import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comisionFilter'
})
export class ComisionFilterPipe implements PipeTransform {

  transform(lista: any, term : string): any {
    if(!lista || !term){
      return lista;
    }
    return lista.filter(
        item=>(item.generado + item.nombre_organo + item.nombre_ugp + 
          item.nombre_producto + item.nombre_accion + 
          item.nombre_departamento + item.nombre_provincia +
          item.nombre_distrito).toLowerCase().indexOf(
            term.toLowerCase()) !==-1);
  }
}
