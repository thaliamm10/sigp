import { Component, OnInit, ElementRef, ViewChild, Input, TemplateRef, ɵConsole } from '@angular/core';
import { DemandaAdicionalService } from 'src/app/services/demanda-adicional.service';
// import { BsModalRef ,BsModalService} from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { DemandaInterface } from 'src/app/entities/demanda-interface';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';

@Component({
  selector: 'app-ficha-adicional',
  templateUrl: './ficha-adicional.component.html',
  styleUrls: ['./ficha-adicional.component.css']
})
export class FichaAdicionalComponent implements OnInit {
  // @Input() id: number;
  demanda: DemandaInterface;
  lista_bandeja: any;
  lista_clasificador: object;
  lista_unidad: Object;
  cantidad_lista:number;
  id_unidad: number;
  total:number;
  anio_actual:number;
  user: any;
  @ViewChild("CloseModalDemanda", {static: false})
CloseModalDemanda: ElementRef;
  @ViewChild("CloseModalObs", {static: false})
  CloseModalObs: ElementRef;

  private cerrarModal: Subject<any> = new Subject();

  constructor(
    private demandaService : DemandaAdicionalService,
    private toastService: ToastrServiceService,
    private authService: AuthService,
    public activateRoute: ActivatedRoute,
    private unidadMedidaService: UnidadMedidaService,
  ) { 
    // this.cerrarModal.subscribe({next: data => setTimeout(() => this.bsModalRef.hide(), 2 * 1000)});
    this.demanda= {
      id: 0,
      situacion: 0,
      observacion:"",
      id_ugp:0
    }
    this.total = 0;
    this.anio_actual = new Date().getFullYear();

    this.demanda = {
      id: this.activateRoute.snapshot.params["id"],
    }; 
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllBandeja();
  }

  getAllBandeja(){
    this.lista_bandeja=null;
    console.log(this.demanda);
    this.demandaService.getAllDemanda(this.user.codigo, this.demanda.id, this.user.id_ciclo, this.user.id_etapa).subscribe( res => {
      this.lista_bandeja = res;
      this.demanda = this.lista_bandeja[0];
      this.getElemento();
    });
  }

  getElemento(){

    this.ListarClasificadores(this.demanda.id);
    this.getAllUnidadMedida();
  }

  ListarClasificadores(id_demanda) {
    this.total = 0;
    this.demandaService.listarClasificador(id_demanda).subscribe(
      res =>{
        this.lista_clasificador = res;
        for(let i=0; i < this.lista_clasificador["length"]; i++){
          this.total = this.total + this.lista_clasificador[i].monto;
        }
      }
    );
  }

  getAllUnidadMedida() {
    this.unidadMedidaService.getAllUnidadMedida().subscribe(res => {
      this.lista_unidad = res;
      window.print();
    });
  }

  printHTML() { 
    window.print();
  } 

}
