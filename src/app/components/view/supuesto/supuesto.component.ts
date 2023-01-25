import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {AccionesService} from 'src/app/services/acciones.service';
import {ProductoInterface} from 'src/app/entities/producto-interface';
import {AccionInterface} from 'src/app/entities/accion-interface';
import {ProductoService} from 'src/app/services/producto.service';
import {UGPInterface} from 'src/app/entities/ugp-interface';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {SupuestoInterface} from 'src/app/entities/supuesto-interface';
import {SupuestoService} from 'src/app/services/supuesto.service';

@Component({
  selector: 'app-supuesto',
  templateUrl: './supuesto.component.html',
  styleUrls: ['./supuesto.component.css']
})
export class SupuestoComponent implements OnInit {
  lista_producto: Object;
  lista_acciones: Object;
  lista_supuesto: any = Array();
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
  supuesto: SupuestoInterface;
  @ViewChild("closeModalSupuesto", {static: false})
  closeModalSupuesto: ElementRef;

  constructor(
    public activateRoute: ActivatedRoute,
    private productoService: ProductoService,
    private authService: AuthService,
    private accionesService: AccionesService,
    private toastService: ToastrServiceService,
    private supuestoService: SupuestoService
  ) {
    this.ugp = {
      id: this.activateRoute.snapshot.params["id"]
    };

    this.supuesto = {
      id: 0,
      id_accion: 0,
      id_estado: 0,
      id_producto: 0,
      tipo: 0,
      nombre: "",
      nombre_accion: "",
      nombre_estado: "",
      nombre_producto: "",
      codigo: 0,
      descripcion: "",
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllProducto();
    this.getAllAccionesxProducto();
    this.getAllSupuesto();
  }

  getAllProducto() {
    this.productoService.getProductoxUGP(this.ugp.id).subscribe(res => {
      this.lista_producto = res;
      //console.log(this.lista_producto,"prod")
    })
  }

  getAllAccionesxProducto() {
    console.log('hola3');
    this.lista_acciones = null;
    this.accionesService.getAllAccionesxIdProducto3(this.supuesto.id_producto, this.id_producto, this.user.codigo).subscribe(res => {
      this.lista_acciones = res;
      console.log('lista');
      console.log(res);
      this.id_accion = (res["length"] > 0) ? this.lista_acciones[0].id : -1;
    });
  }

  getAllSupuesto() {
    this.supuestoService.getAllSupuesto().subscribe(res => {
      this.lista_supuesto = res;
    })
  }

  getElemento(elemento) {
    this.supuesto = {
      id: (elemento != null) ? elemento.id : 0,
      nombre: (elemento != null) ? elemento.nombre : "",
      descripcion: (elemento != null) ? elemento.descripcion : "",
      codigo: (elemento != null) ? elemento.codigo : 0,
      id_estado: (elemento != null) ? elemento.id_estado : 1,
      usuario_registro: (elemento != null) ? elemento.usuario_registro : this.user.codigo,
      id_producto: (elemento != null) ? elemento.id_producto : 0,
      id_accion: (elemento != null) ? elemento.id_accion : 0,
      usuario_edicion: (elemento != null) ? elemento.usuario_edicion : this.user.codigo,
      tipo: (elemento != null) ? elemento.tipo : 0,
    }
  }

  guardarSupuesto() {
    if (this.supuesto.tipo == 1) {
      this.supuestoService.guardarSupuestoProd(this.supuesto).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto P");
            this.closeModalSupuesto.nativeElement.click();
            this.getAllSupuesto();
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
        },
        err => {
          this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message, "Error");
        });
    } else if (this.supuesto.tipo == 2) {
      this.supuestoService.guardarSupuestoAcc(this.supuesto).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
            this.closeModalSupuesto.nativeElement.click();
            this.getAllSupuesto();
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
        },
        err => {
          this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message, "Error");
        });
    }

  }

}
