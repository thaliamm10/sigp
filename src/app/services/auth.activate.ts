import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivate } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthActivateService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.getUserLoggedIn()) {
      //console.log("No estás autorizado o tu sesión ha expirado.");
      this.router.navigate(["/"]);
      return false;
    }

    return true;
  }
}
