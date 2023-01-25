import { Pipe, PipeTransform} from "@angular/core"

@Pipe(
    {
        name: "accionfilter"
    }
)
export class AccionFilter implements PipeTransform{
    transform(values: any, filtro_estado?: number): any{
        var resultado;
        filtro_estado = (filtro_estado==undefined) ? 0 : filtro_estado;
        resultado = values.filter((item) => item.id_estado==filtro_estado);
        return resultado;
    }
}