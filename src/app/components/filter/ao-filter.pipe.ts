import { Pipe, PipeTransform} from "@angular/core"

@Pipe(
    {
        name: "aofilter"
    }
)
export class AOFilter implements PipeTransform{
    // transform(values: any, filtro_organo?: number, filtro_ao?:string): any{
    transform(values: any, filtro_ao?:string): any{
        var resultado;
        filtro_ao = (filtro_ao==undefined) ? "" : filtro_ao;
        // filtro_organo = (filtro_organo==undefined) ? 0 : filtro_organo;      
        // resultado = values.filter(
        //     item => item.id_organo==filtro_organo && 
        //     item.descripcion.toLowerCase().indexOf(filtro_ao.toLowerCase())!==-1 ||
        //     item.codigo.toLowerCase().indexOf(filtro_ao.toLowerCase())!==-1);
        resultado = values.filter(
            item => item.descripcion.toLowerCase().indexOf(filtro_ao.toLowerCase())!==-1 ||
            item.codigo.toLowerCase().indexOf(filtro_ao.toLowerCase())!==-1);
        return resultado;
    }
}