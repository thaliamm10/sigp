import {Pipe, PipeTransform} from "@angular/core"
import {CargoplazaInterface} from "../../entities/cargoplaza-interface";

@Pipe(
  {
    name: "plazafilter"
  }
)
export class PlazaFilter implements PipeTransform {
  transform(values: CargoplazaInterface[], term?: string): any {
    if (!values || !term) {
      return values;
    }
    return values.filter(item => ((item.NOMBRE != null) && (
        ((item.NOMBRE != null) ? (item.NOMBRE).toLowerCase().indexOf(term.toLowerCase()) !== -1 : item) ||
        ((item.A_PATERNO != null) ? (item.NOMBRE + ' ' + item.A_PATERNO).toLowerCase().indexOf(term.toLowerCase()) !== -1 : item) ||
        ((item.A_MATERNO != null) ? (item.NOMBRE + ' ' + item.A_MATERNO + ' ' + item. A_MATERNO).toLowerCase().indexOf(term.toLowerCase()) !== -1 : item))
    ) || (item.CODIGO_PLAZA.indexOf(term.toLowerCase()) !== -1));
  }
}
