import { Pipe, PipeTransform} from "@angular/core"

@Pipe(
    {
        name: "namefilter"
    }
)
export class NameFilter implements PipeTransform{
    transform(values: any, filtro_nombre?:string): any{
        if(!values || !filtro_nombre){
            return values;
        }        
        return values.filter(item => item.nombre.toLowerCase().indexOf(filtro_nombre.toLowerCase())!==-1);
    }
}