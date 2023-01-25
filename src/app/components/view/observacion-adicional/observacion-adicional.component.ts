import { Component, OnInit, Input } from '@angular/core';
import { DemandaAdicionalService } from 'src/app/services/demanda-adicional.service';
// import { BsModalRef } from 'ngx-bootstrap';
import { DemandaInterface } from 'src/app/entities/demanda-interface';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-observacion-adicional',
  templateUrl: './observacion-adicional.component.html',
  styleUrls: ['./observacion-adicional.component.css']
})
export class ObservacionAdicionalComponent implements OnInit {
  @Input() id: number;
  lista_bandeja: Object;
  user: any;
demanda: DemandaInterface;
  constructor(
    private demandaService : DemandaAdicionalService,
    // public bsModalRef: BsModalRef,    
    private toastService: ToastrServiceService,
    private authService: AuthService,
  ) { 
    this.demanda= {
      id: 0,
      situacion: 0,
      observacion:""
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllBandeja();
  }

  getAllBandeja(){
    this.demandaService.getAllDemanda(this.user.codigo,this.id,this.user.id_ciclo,this.user.id_etapa).subscribe( res => {
      this.lista_bandeja = res;
    });
  }

  getElemento(elemento){
    this.demanda={
      id: (elemento!=null) ? elemento.id :this.id,
      situacion: (elemento!=null) ? elemento.situacion :0,
      observacion: (elemento!=null) ? elemento.observacion :""
    }

  }

  cerrarSesion() {
    this.demanda.id=this.id;
    this.demanda.situacion=4;
    this.demandaService.situacion(this.demanda).subscribe(res => {
      if (res["id"] != null) {
        this.toastService.showSuccess("Su Demanda a sido rechazada", "Observado");
        //  this.bsModalRef.hide();
      } else if (res["id"] == null) {
        this.toastService.showError(
          "Se produjo un error al guardar.",
          "Error"
        );
      }
    })
  }

}
