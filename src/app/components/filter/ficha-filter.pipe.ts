import { Pipe, PipeTransform} from "@angular/core"

@Pipe(
    {
        name: "fichafilter"
    }
)
export class FichaFilter implements PipeTransform{
    transform(values: any, term?:string): any{
        var resultado;
        term = (term==undefined) ? "" : term;
        resultado = values.filter(
            item => item.nombre_ugp.toLowerCase().indexOf(term.toLowerCase())!==-1 ||
            item.programa_presupuestal.toLowerCase().indexOf(term.toLowerCase())!==-1 ||
            item.actv_presupuestal.toLowerCase().indexOf(term.toLowerCase())!==-1 ||
            item.nombre_finalidad.toLowerCase().indexOf(term.toLowerCase())!==-1 ||
            item.nombre_situacion.toLowerCase().indexOf(term.toLowerCase())!==-1 ||
            item.id.toString().toLowerCase().indexOf(term.toLowerCase())!==-1);
        return resultado;
    }
}