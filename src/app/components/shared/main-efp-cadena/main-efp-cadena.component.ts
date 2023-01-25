import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-efp-cadena',
  templateUrl: './main-efp-cadena.component.html',
  styleUrls: ['./main-efp-cadena.component.css']
})
export class MainEfpCadenaComponent implements OnInit {

  user:any;
  anio: number;
  etapa: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.anio = this.user.anio;
    this.etapa = this.user.nombre_etapa;
  }

}
