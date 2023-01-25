import { PipeTransform, Pipe } from "@angular/core";
import { UGPInterface } from "../../entities/ugp-interface";

@Pipe(
    {
        name: "ugpfilter"
    }
)
export class UgpFilterPipe implements PipeTransform{
    transform(listaUGP: UGPInterface[], searchTerm : string) : UGPInterface[]{
        if(!listaUGP || !searchTerm){
            return listaUGP;
        }
        return listaUGP.filter(ugp=>ugp.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1);
    }
}