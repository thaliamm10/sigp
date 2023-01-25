import { Pipe, PipeTransform} from "@angular/core"

@Pipe(
    {
        name: "descriptionfilter"
    }
)
export class DescriptionFilter implements PipeTransform{
    transform(values: any, filtro_nombre:string): any{
        if(!values || !filtro_nombre){
            return values;
        }
        return values.filter((item) => 
            item.descripcion.toLowerCase().indexOf(filtro_nombre.toLowerCase())!==-1
            || item.codigo.toLowerCase().indexOf(filtro_nombre.toLowerCase())!==-1);
    }
}