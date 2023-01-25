import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {AccionesService} from 'src/app/services/acciones.service';
import {ProductoInterface} from 'src/app/entities/producto-interface';
import {AccionInterface} from 'src/app/entities/accion-interface';
import {ProductoService} from 'src/app/services/producto.service';
import {UGPInterface} from 'src/app/entities/ugp-interface';
import {MediosVerificacionInterface} from 'src/app/entities/medios-verificacion-interface';
import {MediosVerificacionService} from 'src/app/services/medios-verificacion.service';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';

@Component({
  selector: 'app-medio-verificacion',
  templateUrl: './medio-verificacion.component.html',
  styleUrls: ['./medio-verificacion.component.css']
})
export class MedioVerificacionComponent implements OnInit {
  lista_producto: Object;
  lista_acciones: Object;
  lista_medios: any = Array();
  producto: ProductoInterface;
  accion: AccionInterface;
  id_producto: number = 0;
  id_accion: number;
  id_anio: number;
  lista_ugp: Object;
  user: any;
  ugp: UGPInterface;
  id_ugp: number;
  cantidad_lista: number;
  medios: MediosVerificacionInterface;
  @ViewChild("closeModalMedios", {static: false})
  closeModalMedios: ElementRef;

  constructor(
    public activateRoute: ActivatedRoute,
    private productoService: ProductoService,
    private authService: AuthService,
    private accionesService: AccionesService,
    private mediosService: MediosVerificacionService,
    private toastService: ToastrServiceService,) {
    this.ugp = {
      id: this.activateRoute.snapshot.params["id"]
    };
    this.medios = {
      id: 0,
      id_accion: 0,
      id_estado: 0,
      nombre: "",
      nombre_accion: "",
      nombre_producto: "",
      descripcion: "",
      nombre_estado: "",
      id_producto: 0,
      codigo: 0
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllProducto();
    this.getAllAccionesxProducto();
    this.getAllMedios();
    this.id_anio = this.user.anio;

  }

  getAllProducto() {
    this.productoService.getProductoxUGP(this.ugp.id).subscribe(res => {
      this.lista_producto = res;
    })
  }

  getAllAccionesxProducto() {
    console.log('hola1');
    this.lista_acciones = null;
    this.accionesService.getAllAccionesxIdProducto3(this.medios.id_producto, this.id_producto, this.user.codigo).subscribe(res => {
      this.lista_acciones = res;
      this.id_accion = (res["length"] > 0) ? this.lista_acciones[0].id : -1;


    });
  }

  getAllMedios() {
    this.mediosService.getAllMedios(this.ugp.id).subscribe(res => {
      this.lista_medios = res;
      this.cantidad_lista = res["length"];
    })
  }

  getElemento(elemento) {
    this.medios = {
      id: (elemento != null) ? elemento.id : 0,
      nombre: (elemento != null) ? elemento.nombre : "",
      descripcion: (elemento != null) ? elemento.descripcion : "",
      codigo: (elemento != null) ? elemento.codigo : 0,
      id_estado: (elemento != null) ? elemento.id_estado : 1,
      usuario_registro: (elemento != null) ? elemento.usuario_registro : this.user.codigo,
      usuario_edicion: (elemento != null) ? elemento.usuario_edicion : this.user.codigo,
      id_producto: (elemento != null) ? elemento.id_producto : 0,
      id_accion: (elemento != null) ? elemento.id_accion : 0,

    }
  }

  guardarMedios() {
    this.mediosService.guardarMedios(this.medios).subscribe(
      res => {
        if (res["id"] != null) {
          this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          this.closeModalMedios.nativeElement.click();
          this.getAllMedios();
        } else if (res["id"] == null) {
          this.toastService.showError("Se produjo un error al guardar.", "Error");
        }
      },
      err => {
        this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message, "Error");
      });
  }

}
