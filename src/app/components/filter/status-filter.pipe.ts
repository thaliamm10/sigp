import { Pipe, PipeTransform} from "@angular/core"

@Pipe(
    {
        name: "statusfilter"
    }
)
export class StatusFilter implements PipeTransform{
    transform(values: any, filtro_estado?: number, filtro_nombre?:string): any{
        var resultado;
        filtro_nombre = (filtro_nombre==undefined) ? "" : filtro_nombre;
        filtro_estado = (filtro_estado==undefined) ? 0 : filtro_estado;
        if(!filtro_estado){
            resultado = values.filter((item) => item.nombre.toLowerCase().indexOf(filtro_nombre.toLowerCase())!==-1);
        }
        else{
            resultado = values.filter((item) => item.id_estado==filtro_estado && 
            item.nombre.toLowerCase().indexOf(filtro_nombre.toLowerCase())!==-1);
        }
        return resultado;
    }
}