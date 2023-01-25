import {Component, OnInit, ElementRef, ViewChild, Output} from '@angular/core';
import {DemandaInterface} from 'src/app/entities/demanda-interface';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {AuthService} from 'src/app/services/auth.service';
import {DemandaAdicionalService} from 'src/app/services/demanda-adicional.service';
import {CategoriaPresupuestalService} from 'src/app/services/categoria-presupuestal.service';
import {PedidoInterface} from 'src/app/entities/pedido-interface';
import {PpaService} from 'src/app/services/ppa.service';
import {ExcelServicesService} from 'src/app/services/excel-services.service';

@Component({
  selector: 'app-bandeja-adicional',
  templateUrl: './bandeja-adicional.component.html',
  styleUrls: ['./bandeja-adicional.component.css']
})
export class BandejaAdicionalComponent implements OnInit {
  // bsModalRef: BsModalRef;
  lista_bandeja: any = new Array();
  lista_programa: Object;
  lista_actividad: Object;
  cantidad_lista: number;
  bienes_ppa: any = new Array();
  lista_comision: any = new Array();
  lista_rutas: any = new Array();
  bitacora: any = new Array();
  pedido: PedidoInterface;
  term: any;
  p: any;
  p1: any;
  p2: any;
  p3: any;
  user: any;
  x_habilitar_control: boolean;
  suma_bienes: number = 0;
  suma_comision: number = 0;
  suma_rutas: number = 0;
  @ViewChild("CloseModalDemanada", {static: false})
  CloseModalDemanada: ElementRef;

  constructor(
    private demandaService: DemandaAdicionalService,
    private toastService: ToastrServiceService,
    private authService: AuthService,
    private demandaservice: DemandaAdicionalService,
    private ppaService: PpaService,
    private programaService: CategoriaPresupuestalService,
    private excelService: ExcelServicesService,
  ) {
    this.pedido = {
      comentario: "",
      nombre_ugp: "",
      nombre_organo: "",
      flag_aprobado: 1
    }
  }


  ngOnInit() {
    this.bienes_ppa = null;
    this.x_habilitar_control = false;
    this.user = this.authService.getUserLoggedIn();
    this.getAllBandeja();
  }

  exportAsXLSXBienes() {
    var excel = [];
    this.bienes_ppa.forEach(row => {
      let data = {
        Bienes: row.nombre,
        Clasificador: row.nombre_clasificador,
        Producto: row.nombre_producto,
        Acción: row.nombre_accion,
        Precio: row.precio,
        Unidades: row.cantidad,
        Monto: row.costo
      };
      excel.push(data);
    });
    this.excelService.exportAsExcelFile(excel, 'Bienes-Bandeja-adicional');
  }

  exportAsXLSXComision() {
    var excel = [];
    this.lista_comision.forEach(row => {
      let data = {
        Código: row.generado,
        Tipo: row.nombre_tipo_comision,
        Producto: row.nombre_producto,
        Acción: row.nombre_accion,
        Fecha_salida: row.fecha_salida,
        Fecha_retorno: row.fecha_retorno,
        Tipo_viatico: row.nombre_tipo_viatico,
        Cantidad_personas: row.cantidad_persona,
        Monto_viatico: row.monto_viatico,
        Monto_pasaje: row.monto_pasaje,
        Monto_combustible: row.monto_combustible,
        Monto_almuerzo: row.monto_almuerzo,
        Monto: row.suma
      };
      excel.push(data);
    });
    this.excelService.exportAsExcelFile(excel, 'Comisiones-Bandeja-adicional');
  }

  exportAsXLSXRutas() {
    var excel = [];
    this.lista_rutas.forEach(row => {
      let data = {
        Código: row.generado,
        Producto: row.nombre_producto,
        Acción: row.nombre_accion,
        Origen: row.nombre_departamento + ' ' + row.nombre_provincia + ' ' + row.nombre_distrito,
        Fecha_salida: row.fecha_salida,
        Hora_salida: row.hora_salida,
        Cantidad_personas: row.cantidad_persona,
        Monto_viatico: row.monto_viatico,
        Monto_peaje: row.monto_peaje,
        Monto_combustible: row.monto_combustible,
        Monto: row.suma
      };
      excel.push(data);
    });
    this.excelService.exportAsExcelFile(excel, 'Rutas-Bandeja-adicional');
  }

  getAllBandeja() {
    this.lista_bandeja = null;
    this.demandaService.getAllPedidoDemanda(this.user.codigo, this.user.id_ciclo, this.user.id_etapa).subscribe(
      res => {
        //  console.log(res);
        this.lista_bandeja = res;
        this.cantidad_lista = res["length"];
      });
  }

  getElemento(elemento) {
    this.pedido = {
      id: (elemento != null) ? elemento.id : 0,
      // comentario: (elemento!=null) ? elemento.comentario : "",
      estado: (elemento != null) ? elemento.estado : 0,
      id_ugp: (elemento != null) ? elemento.id_ugp : 0,
      id_organo: (elemento != null) ? elemento.id_organo : 0,
      nombre_ugp: (elemento != null) ? elemento.nombre_ugp : "",
      nombre_organo: (elemento != null) ? elemento.nombre_organo : "",
      flag_aprobado: (elemento != null) ? elemento.flag_aprobado : 1
    };
    this.suma_bienes = elemento.suma_bienes;
    this.suma_comision = elemento.suma_comision;
    this.suma_rutas = elemento.suma_rutas;

    this.bienes_ppa = null;
    this.demandaservice.getAllPedidoBienes(this.pedido.id_organo, this.pedido.id_ugp, this.user.codigo).subscribe(
      res => {
        // console.log(res);
        this.bienes_ppa = res;
      },
      err => {
        this.toastService.showError("Problemas para conectar al servidor.", "Error");
      }
    );

    this.lista_comision = null;
    this.demandaservice.getAllPedidoComision(this.pedido.id_organo, this.pedido.id_ugp, this.user.codigo).subscribe(
      res => {
        this.lista_comision = res;
      },
      err => {
        this.toastService.showError("Problemas para conectar al servidor.", "Error");
      }
    );

    this.lista_rutas = null;
    this.demandaservice.getAllPedidoRutas(this.pedido.id_organo, this.pedido.id_ugp, this.user.codigo).subscribe(
      res => {
        this.lista_rutas = res;
      },
      err => {
        this.toastService.showError("Problemas para conectar al servidor.", "Error");
      }
    );

    switch (this.pedido.estado) {
      case 0:
        this.x_habilitar_control = (this.user.id_estado == 4);
        break;
      case 1:
        this.x_habilitar_control = (this.user.id_estado == 5);
        break;
      case 2:
        this.x_habilitar_control = (this.user.id_estado == 3);
        break;
      case 3:
        this.x_habilitar_control = false;
        break;
    }
    // console.log(this.x_habilitar_control);
  }

  getBitacora(elemento) {
    this.bitacora = null;
    this.demandaservice.getAllPedidoBitacora(elemento.id).subscribe(
      res => {
        this.bitacora = res;
      },
      err => {
        this.toastService.showError("Problemas para conectar al servidor.", "Error");
      }
    );

  }

  guardarDemanda() {
    // console.log(this.pedido,"pedido");
    this.pedido.usuario = this.user.codigo;
    this.lista_bandeja = null;
    this.demandaservice.guardarPedidoDemanda(this.pedido).subscribe(
      res => {
        if (res["id"] != null) {
          this.CloseModalDemanada.nativeElement.click();
          switch (res["id"]) {
            case -1:
              this.toastService.showSuccess("Se guardó con éxito, tiene pendiente pedidos para generar la ficha", "Mensaje");
              break;
            case 0:
              this.toastService.showSuccess("Se guardó con éxito, se genero la ficha de la demanda adicional", "Mensaje");
              break;
            default:
              this.toastService.showSuccess("Se guardó con éxito la aprobación del pedido", "Mensaje");
              break;
          }
        } else if (res["id"] == null) {
          this.toastService.showError("Se produjo un error al guardar.", "Error");
        }
        this.getAllBandeja();
      },
      err => {
        this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message, "Error");
        this.getAllBandeja();
      });
  }


}
