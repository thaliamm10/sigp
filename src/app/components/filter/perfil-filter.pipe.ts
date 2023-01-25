import { PipeTransform, Pipe } from "@angular/core";
import { UsuarioInterface } from 'src/app/entities/usuario-interface';

@Pipe(
    {
        name: "usuariofilter"
    }
)
export class PerfilFilterPipe implements PipeTransform{
    transform(listaUsuarios: UsuarioInterface[], term : string) : UsuarioInterface[]{
        if(!listaUsuarios || !term){
            return listaUsuarios;
        }
        return listaUsuarios.filter(
            user=>(user.nombre + user.aPaterno + user.aMaterno).toLowerCase().indexOf(
                term.toLowerCase()) !==-1);
    }
}