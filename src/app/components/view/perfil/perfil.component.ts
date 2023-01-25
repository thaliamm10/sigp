import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioInterface } from 'src/app/entities/usuario-interface';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  listaUsuarios:  any = [];
  seleccionado: any = 0;
  usuario: UsuarioInterface;
  term: any;
  p: any;
  user: any;
  x_bloqueo: number = 0;
  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private toastService: ToastrServiceService
  ) { 
    this.usuario ={
      trama_usuario:"",
      ESTADO:0
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllUsuarios();
  }

  getAllUsuarios() {
    this.listaUsuarios=null;
    this.usuariosService.getAllUsuarios().subscribe(res => {
      this.listaUsuarios = res;
      //console.log(res);
      for (let i = 0; i < this.listaUsuarios.length; i++) {
        this.listaUsuarios[i].SELECCION = false;
        switch(this.listaUsuarios[i].ESTADO)
        {
          case 1: this.listaUsuarios[i].NOMBRE_ESTADO = "Sin Acceso"; break;
          case 3: this.listaUsuarios[i].NOMBRE_ESTADO = "Personal OPP"; break;
          case 4: this.listaUsuarios[i].NOMBRE_ESTADO = "Responsable CC"; break;
          case 5: this.listaUsuarios[i].NOMBRE_ESTADO = "Responsable UGP"; break;
          case 6: this.listaUsuarios[i].NOMBRE_ESTADO = "Servidor Civil"; break;
          case 7: this.listaUsuarios[i].NOMBRE_ESTADO = "Canalizador"; break;
          case 8: this.listaUsuarios[i].NOMBRE_ESTADO = "Demanda Adicional"; break;
        }
      }
    });
  }

  selectUser(elemento) {
    elemento.SELECCION = !elemento.SELECCION;
  }

  revertirClave(user){
    if(confirm("¿Estás seguro(a) de revertir la clave a DNI?"))
    {
      // console.log(user);
      this.authService.setPassword2(user.dni,user.dni).subscribe(
        res => {
          this.toastService.showSuccess("Su clave ha sido cambiada.", "Correcto");
        },
        err => {
          this.toastService.showError("Problemas para modificar la clave.","Error");
        });
    }
  }

  cambiarEstado() {
    // this.listaUsuarios=null;
    var trama_xml = "<USUARIO>";
    for (let i = 0; i < this.listaUsuarios["length"]; i++) {
      if (this.listaUsuarios[i].SELECCION == true) {
        trama_xml =  trama_xml + "<r>";
        trama_xml =  trama_xml + "<DNI>" + this.listaUsuarios[i].dni + "</DNI>";
        trama_xml =  trama_xml + "</r>";
      }      
    }
    trama_xml =  trama_xml + "</USUARIO>";
    this.usuario.trama_usuario = trama_xml;
    //console.log("usuario",this.usuario);
    this.listaUsuarios=null;
    this.usuariosService.guardarEstado(this.usuario).subscribe(res => {
      //console.log(res);   
      this.toastService.showSuccess("Se guardaron los cambios", "Correcto");   
      this.getAllUsuarios();
    });

  }

  sincronizar(){
    this.x_bloqueo = 1;
    this.listaUsuarios=null;
    this.usuariosService.sincronizar().subscribe(
      res => {  
        this.getAllUsuarios();
        this.toastService.showSuccess("Personal sincronizado: " + res, "Correcto");
        this.x_bloqueo = 0;
      },
      err => {
        console.log(err.name + ' : ' + err.message);
        this.toastService.showError("Problemas al sincronizar.","Error");
        this.x_bloqueo = 0;
      });
  }
}
