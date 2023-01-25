import { Component, OnInit } from "@angular/core";
import { UgpService } from "../../../services/ugp.service";
import { ToastrServiceService } from "../../../services/toastr-service.service";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-main-marco-logico",
  templateUrl: "./main-marco-logico.component.html",
  styleUrls: ["./main-marco-logico.component.css"]
})
export class MainMarcoLogicoComponent implements OnInit {
  listaUGP: any;
  searchTerm: string;
  term: any;
  cantidad_lista: number;
  user: any;
  constructor(
    private ugpService: UgpService,
    private toastService: ToastrServiceService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllUGP();
  }

  getAllUGP() {
    this.ugpService.getAllUGPxMarcoLogico(this.user.codigo, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.listaUGP = res;
      this.cantidad_lista = res["length"];
    });  
  }
}
