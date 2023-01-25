import { Pipe, PipeTransform} from "@angular/core"

@Pipe(
    {
        name: "pedidofilter"
    }
)
export class PedidoFilter implements PipeTransform{
    transform(values: any, term?:string): any{
        var resultado;
        term = (term==undefined) ? "" : term;
        resultado = values.filter(
            item => item.nombre_ugp.toLowerCase().indexOf(term.toLowerCase())!==-1 ||
            item.nombre_organo.toLowerCase().indexOf(term.toLowerCase())!==-1 ||
            item.nombre_situacion.toLowerCase().indexOf(term.toLowerCase())!==-1);
        return resultado;
    }
}