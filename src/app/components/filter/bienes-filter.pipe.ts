import { Pipe, PipeTransform} from "@angular/core"
import { BienesInterface } from 'src/app/entities/bienes-servicios-interface';

@Pipe(
    {
        name: "bienesfilter"
    }
)
export class BienesFilter implements PipeTransform{
    transform(values: BienesInterface[], term?:string): any{
        if(!values || !term){
            return values;
        }        
        return values.filter((item) => item.nombre.toLowerCase().indexOf(term.toLowerCase())!==-1);
    }
}