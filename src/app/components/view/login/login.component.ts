import {ToastrServiceService} from "../../../services/toastr-service.service";
import {UserAuntentication} from "../../../entities/UserAuntentication.entity";
import {AuthService} from "../../../services/auth.service";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CicloService} from 'src/app/services/ciclo.service';
import {AperturaService} from 'src/app/services/apertura-service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  lista_ciclo: Object;
  txtUsuario: string;
  txtContrasenia: string;
  ingreso: boolean;
  id_ciclo: number = 0;
  lista_etapa: Object;
  id_etapa: number = 0;

  constructor(
    public router: Router,
    private authService: AuthService,
    private toastService: ToastrServiceService,
    private cicloService: CicloService,
    private aperturaService: AperturaService,
  ) {
    // this.txtContrasenia = "NORA1";
    // this.txtUsuario = "41588313";
    this.ingreso = false;
  }

  ngOnInit() {
    this.getAllCiclo();
    this.getAllEtapa();
  }

  getAllCiclo() {
    this.cicloService.getAllCicloActivos().subscribe(res => {
      console.log(res);
      this.lista_ciclo = res;
      if (res["length"] > 0) {
        this.id_ciclo = this.lista_ciclo[1].id;
      }
    });
  }

  getAllEtapa() {
    this.aperturaService.getAllEtapa2().subscribe(res => {
      this.lista_etapa = res;
      if (res["length"] > 0) {
        this.id_etapa = this.lista_etapa[2].id;
      }
    });
  }

  validacion(txtUsuario, txtContrasenia,id_ciclo) {
    this.ingreso = true;
    this.authService.getLogin(txtUsuario, txtContrasenia, id_ciclo).subscribe(
      data => {
        if (data["codigo"] != null) {
          let id_etapa = 0, anio = 0;
          let nombre_etapa: '';
          for (let n = 0; n < this.lista_ciclo["length"]; n++) {
            if (this.lista_ciclo[n].id == this.id_ciclo) {
              //id_etapa = this.lista_ciclo[n].id_etapa;
              anio = this.lista_ciclo[n].anio;
              //nombre_etapa = this.lista_ciclo[n].nombre_etapa;
            }
          }
          for (let n = 0; n < this.lista_etapa["length"]; n++) {
            if (this.lista_etapa[n].id == this.id_etapa) {
              //id_etapa = this.lista_ciclo[n].id_etapa;
              //anio = this.lista_ciclo[n].anio;
              nombre_etapa = this.lista_etapa[n].nombre;
            }
          }
          let u: UserAuntentication = {
            username: data["nombre"] + " " + data["aPaterno"] + " " + data["aMaterno"],
            codigo: data["codigo"],
            dni: data["dni"],
            cod_depedencia: data["codDependencia"],
            dependencia: data["dependencia"],
            cod_unidad: data["codUnidad"],
            unidad: data["unidad"],
            cod_cargo: data["codCargo"],
            cargo: data["cargo"],
            id_apertura: data["ID_APERTURA"],
            id_estado: data["ESTADO"],
            nombre_estado: data["NOMBRE_ESTADO"],
            clave: "",
            clave2: "",
            anio: anio,
            id_ciclo: this.id_ciclo,
            id_etapa: this.id_etapa,
            nombre_etapa: nombre_etapa
          };
          // console.log(u);
          this.authService.setUserLoggedIn(u);
          this.router.navigate([(u.id_estado == 8) ? "/programacion-fisica-adicional" : "/home-marco-logico"]);
        } else {
          this.toastService.showError(
            "Datos incorrectos. Vuelva a ingresar",
            "Error de auntenticación"
          );
          this.ingreso = false;
        }
      },
      err => {
        this.ingreso = false;
        this.toastService.showError(err.name + err.message, "Error de Servidor");
      },
      () => {
      }
    );
  }
}
