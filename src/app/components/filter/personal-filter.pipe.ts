import { Pipe, PipeTransform} from "@angular/core"

@Pipe(
    {
        name: "personalfilter"
    }
)
export class PersonalFilter implements PipeTransform{
    transform(values: any, filtro_nombre?:string): any{        
        if(!values || !filtro_nombre){
            return values;
        }
        return values.filter((item) => 
        item.nombre.toLowerCase().indexOf(filtro_nombre.toLowerCase())!==-1 ||
        item.aPaterno.toLowerCase().indexOf(filtro_nombre.toLowerCase())!==-1 ||
        item.aMaterno.toLowerCase().indexOf(filtro_nombre.toLowerCase())!==-1);
    }
}