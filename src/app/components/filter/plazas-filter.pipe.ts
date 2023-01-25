import {Pipe, PipeTransform} from "@angular/core"

@Pipe(
  {
    name: "plazasfilter"
  }
)
export class PlazasFilterPipe implements PipeTransform {
  transform(values: any, filtro_plaza?: string): any {
    var resultado;
    filtro_plaza = (filtro_plaza == undefined) ? "" : filtro_plaza;
    resultado = values.filter(
      item => item.condicion.toLowerCase().indexOf(filtro_plaza.toLowerCase()) !== -1 ||
        // item.cod_cargo.toLowerCase().indexOf(filtro_plaza.toLowerCase()) !== -1 ||
        // item.cod_plaza.toLowerCase().indexOf(filtro_plaza.toLowerCase()) !== -1 ||
        item.regimen.toLowerCase().indexOf(filtro_plaza.toLowerCase()) !== -1 ||
        item.dependencia.toLowerCase().indexOf(filtro_plaza.toLowerCase()) !== -1 ||
        item.unidad.toLowerCase().indexOf(filtro_plaza.toLowerCase()) !== -1 ||
        item.nombre_cargo.toLowerCase().indexOf(filtro_plaza.toLowerCase()) !== -1);
    return resultado;
  }
}
