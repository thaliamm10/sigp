import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class ToastrServiceService {
  constructor(private toastrService: ToastrService) {}

  showSuccess(mensaje, titulo = "Correcto") {
    this.toastrService.success(mensaje, titulo);
  }

  showError(mensaje, titulo = "Error") {
    this.toastrService.error(mensaje, titulo);
  }
}
