import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';

import {BienesService} from 'src/app/services/bienes.service';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {BienesInterface} from 'src/app/entities/bienes-servicios-interface';
import {AuthService} from 'src/app/services/auth.service';
import {UnidadMedidaService} from 'src/app/services/unidad-medida.service';
import {OrganoService} from 'src/app/services/organo.service';
import {ExcelServicesService} from 'src/app/services/excel-services.service';

@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html',
  styleUrls: ['./bienes.component.css']
})
export class BienesComponent implements OnInit {
  lista_bienes: any = new Array();
  lista_organo: Object;
  lista_um: Object;
  lista_clasificador: Object;
  objbienes: BienesInterface;
  cantidad_lista: number;
  p: any;
  user: any;
  term: string;

  @ViewChild("closeModalBienes", {static: false})
  closeModalBienes: ElementRef;

  constructor(
    private bienesService: BienesService,
    private toastService: ToastrServiceService,
    private unidadMedidaService: UnidadMedidaService,
    private organoService: OrganoService,
    private authService: AuthService,
    private excelService: ExcelServicesService
  ) {
    this.objbienes = {
      id: 0,
      nombre: "",
      nombre_estado: "",
      nombre_usuario: "",
      id_estado: 1,
      id_tipo: "B",
      id_grupo: "",
      id_clase: "",
      id_familia: "",
      id_item: "",
      id_unidad_medida: 0,
      id_clasificador: 0,
      precio: 0,
      canalizado: 0,
      id_kit: 0
    };
  }

  exportAsXLSX(): void {
    var excel = [];
    this.lista_bienes.forEach(row => {
      let data = {
        CODIGO: row.codigo,
        NOMBRE: row.nombre,
        GRUPO: row.id_grupo,
        CLASE: row.id_clase,
        ITEM: row.id_item,
        FAMILIA: row.id_familia,
        PRECIO: row.precio,
        TIPO: row.id_tipo,
        CANALIZADO: (row.canalizado == 1) ? "SI" : "NO",
        CLASIFICADOR: row.nombre_clasificador,
        UNIDAD_MEDIDA: row.nombre_unidad_medida,
        ORGANO: row.nombre_organo
      }
      excel.push(data);
    });
    this.excelService.exportAsExcelFile(excel, 'bienes');
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllBienes();
    this.getAllUnidadMedida();
    this.getAllClasificador();
    this.getAllOrgano();
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
      if (res["length"] != 0) {
        this.objbienes.id_organo = this.lista_organo[0].id;
      }
    });
  }

  getAllBienes() {
    this.lista_bienes = null;
    this.bienesService.getAllBienesServicios(this.user.anio).subscribe(res => {
      this.lista_bienes = res;
    });
  }

  getElemento(elemento) {
    this.objbienes = {
      id: (elemento != null) ? elemento.id : 0,
      nombre: (elemento != null) ? elemento.nombre : "",
      nombre_estado: (elemento != null) ? elemento.nombre_estado : "",
      id_estado: (elemento != null) ? elemento.id_estado : 1,
      id_clasificador: (elemento != null) ? elemento.id_clasificador : 0,
      id_unidad_medida: (elemento != null) ? elemento.id_unidad_medida : 0,
      id_grupo: (elemento != null) ? elemento.id_grupo : "",
      id_clase: (elemento != null) ? elemento.id_clase : "",
      id_item: (elemento != null) ? elemento.id_item : "",
      id_familia: (elemento != null) ? elemento.id_familia : "",
      precio: (elemento != null) ? elemento.precio.replace('.', ',') : 0,
      id_tipo: (elemento != null) ? elemento.id_tipo : "B",
      canalizado: (elemento != null) ? elemento.canalizado : 1,
      id_organo: (elemento != null) ? elemento.id_organo : 0,
      id_kit: (elemento != null) ? elemento.id_kit : 0,
      anio: (elemento != null) ? elemento.anio : this.user.anio
    };

  }

  public validarSoloNumeros(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      if (charCode != 44)
        return false;
    }
    return true;
  }

  guardarbienes() {
    //console.log("registro",this.objbienes);
    var validacion = "";//this.validarcampos();
    if (validacion.length == 0) {
      this.bienesService.guardarBienesServicios(this.objbienes).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardo con éxito", "Correcto");
            this.closeModalBienes.nativeElement.click();
            this.getAllBienes();
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
        },
        err => {
          this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message, "Error");
        }
      );
    } else {
      this.toastService.showError(validacion, "Validación");
    }
  }

  getAllUnidadMedida() {
    this.unidadMedidaService.getAllUnidadMedida().subscribe(res => {
      this.lista_um = res;
    });
  }

  getAllClasificador() {
    this.unidadMedidaService.getAllClasificador().subscribe(res => {
      this.lista_clasificador = res;
    });
  }


}
