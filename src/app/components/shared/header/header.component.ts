import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {GastosPersonalServiceService} from "../../../services/gastos-personal-service.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  username: any;
  estado: any;
  responsablesorgano: any = [];
  flagactivacionfrm: boolean = false;

  @ViewChild("closeModalPass", {static: false})
  closeModalPass: ElementRef;

  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastrServiceService,
    public router: Router,
    public gastosPersonal: GastosPersonalServiceService
  ) {
  }

  ngOnInit() {
    this.username = this.authService.getUserLoggedIn();
    this.organopersonal();
  }

  cerrarSesion() {
    localStorage.removeItem("userAuth");
    this.router.navigate(["/"]);
  }

  filtrarresponsable(codigo) {
    return this.responsablesorgano.filter(
      responsables => responsables.id_responsable === codigo
    );
  }

  organopersonal() {
    this.gastosPersonal.getOrganoPersonal().subscribe(res => {
      this.responsablesorgano = res;

      console.log(this.responsablesorgano);
      console.log(this.username);
      const responsable = this.filtrarresponsable(this.username.codigo.toString());
      console.log(responsable);
      // console.log(responsable.length);
      if (responsable.length > 0) {
        this.flagactivacionfrm = true;

        // this.dependencia = this.username.dependencia;
        // this.unidad = this.username.unidad;

      }
      console.log(this.flagactivacionfrm);


    })
  }

  editarPass() {

    // console.log(data);
    if (this.username.clave == this.username.clave2) {
      this.authService.setPassword2(this.username.dni, this.username.clave).subscribe(
        res => {
          this.toastService.showSuccess("Su clave ha sido cambiada.", "Correcto");
          this.closeModalPass.nativeElement.click();
        },
        err => {
          this.toastService.showError("Problemas para modificar la clave.", "Error");
        });
    } else {
      this.toastService.showError("Ingrese la misma clave en ambos campos por favor.", "Validación");
    }
  }
}
