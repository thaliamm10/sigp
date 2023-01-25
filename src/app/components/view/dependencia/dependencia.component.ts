import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { UGPInterface } from 'src/app/entities/ugp-interface';
import { UsuarioInterface } from 'src/app/entities/usuario-interface';

@Component({
  selector: 'app-dependencia',
  templateUrl: './dependencia.component.html',
  styleUrls: ['./dependencia.component.css']
})
export class DependenciaComponent implements OnInit {
  ugp: UGPInterface;
  listaUsuarios: Object;
  listaAsignados: Object;
  user: any;
  x_progreso: boolean;
  usuario: UsuarioInterface;
  filtro_nombre:any;
  p:any;
  cantidad_lista:number;
  
  @ViewChild("closeModalUsuario", {static: false})
  closeModalUsuario: ElementRef;

  constructor(
    public activateRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private authService: AuthService
  ) { 
    this.usuario = {
      id_ugp: 0,
      trama_xml:""
    };
    this.ugp = {
      id: this.activateRoute.snapshot.params["id"]
    }; 
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.listaUsuarios = null;
    this.getAllAsignados();
    this.getAllUsuarios();
  }

  getAllAsignados() {
    this.usuariosService.getAllUsuariosxUGP(this.ugp.id).subscribe(res => {
      this.listaAsignados = res;
    });
  }

  getAllUsuarios(){
    this.usuariosService.getAllUsuarios2(this.ugp.id).subscribe(res => {
      this.listaUsuarios = res;
    });
  }

  select(elemento) {
    elemento.flag = !elemento.flag;
  }

  guardarUsuariosxUGP(){
    this.x_progreso = true;
    this.usuario.id_ugp = this.ugp.id;
    var trama_xml = "<RESPONSABLE>";
    for (let i = 0; i < this.listaUsuarios["length"]; i++) {
      if(this.listaUsuarios[i].flag==1){
        trama_xml =  trama_xml + "<r>";
        trama_xml =  trama_xml + "<ID_PERSONAL>" + this.listaUsuarios[i].codigo + "</ID_PERSONAL>";
        trama_xml =  trama_xml + "<FLAG>" + ((this.listaUsuarios[i].flag) ? 1 : 0) + "</FLAG>";
        trama_xml =  trama_xml + "</r>";
      }      
    }
    trama_xml =  trama_xml + "</RESPONSABLE>";
    this.usuario.trama_xml = trama_xml;
    console.log(this.usuario);

    this.usuariosService.guardarUsuariosxUGP(this.usuario).subscribe(res => {
      this.closeModalUsuario.nativeElement.click();
      this.x_progreso = false;
      this.getAllAsignados();
    });
  }
  
}
