import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-efp-programa',
  templateUrl: './main-efp-programa.component.html',
  styleUrls: ['./main-efp-programa.component.css']
})
export class MainEfpProgramaComponent implements OnInit {

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
