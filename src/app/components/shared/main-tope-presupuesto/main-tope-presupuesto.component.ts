import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-tope-presupuesto',
  templateUrl: './main-tope-presupuesto.component.html',
  styleUrls: ['./main-tope-presupuesto.component.css']
})
export class MainTopePresupuestoComponent implements OnInit {
  user: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
  }

}
