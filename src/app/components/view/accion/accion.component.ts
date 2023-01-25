import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AccionesService } from 'src/app/services/acciones.service';
import { ProductoInterface } from 'src/app/entities/producto-interface';
import { AccionInterface } from 'src/app/entities/accion-interface';
import { UGPInterface } from 'src/app/entities/ugp-interface';
import { AuthService } from 'src/app/services/auth.service';
import { OrganoService } from 'src/app/services/organo.service';
import { ProcesoService } from 'src/app/services/proceso.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import { ProductoService } from 'src/app/services/producto.service';
import { DefinicionProductoInterface } from 'src/app/entities/definicion-producto-interface';
import { ExcelServicesService } from 'src/app/services/excel-services.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.css']
})
export class AccionComponent implements OnInit {
  ugp: UGPInterface;
  producto: ProductoInterface;
  actividadOperativa: Object;
  lista_acciones: any= Array();
  lista_definicion: Object
  lista_producto: Object;
  lista_proceso: Object;

  lista_organo: Object;
  lista_organo_ugp: Object;
  lista_um: Object;
  accion: AccionInterface;
  unidadMedidas: Object;
  x_progreso: boolean;
  cantidad_lista: number;
  definicionProducto: DefinicionProductoInterface;
  user: any;
  @ViewChild("closeModalAccionP" , {static: false})
  closeModalAccionP: ElementRef;
  @ViewChild("closeModalDef" , {static: false})
  closeModalDef: ElementRef;

  constructor(
    public activateRoute: ActivatedRoute,
    private toastService: ToastrServiceService,
    private accionesService: AccionesService,
    private procesoService: ProcesoService,
    private organoService: OrganoService,
    private productoService: ProductoService,
    private unidadMedidaService: UnidadMedidaService,
    private authService: AuthService,
    private excelService:ExcelServicesService,
    private http: HttpClient
  ) {
 
    this.ugp = {
      id: this.activateRoute.snapshot.params["id"]
    }; 
    this.accion = {
      descripcion: "",
      id_producto: 0,
      id_unidad_medida: 0,
      id_organo:0,
      nombre: "",
      id_definicion:0,
      df1: "",
      df2: "",
      df3: "",
      df4: "",
      df5: "",
      df6: "",
      df7: "",
      df8:"",
      cr1: "",
      cr2: "",
      cr3: "",
      cr4: "",
      cr5: "",
    };  

    this.definicionProducto = {
      id_definicion: 0,
      id_accion: 0,
      id_ugp: 0,
      df1: "",
      df2: "",
      df3: "",
      df4: "",
      df5: "",
      df6: "",
      df7: "",
      df8:"",
      cr1: "",
      cr2: "",
      cr3: "",
      cr4: "",
      cr5: "",
    };
   }

  exportAsXLSX():void {  
    var excel=[]; 
    this.lista_acciones.forEach(row => {  
      let data = {
        PRODUCTO: row.nombre_producto,
        ACCION: row.nombre,
        ORGANO: row.nombre_organo,
        UNIDAD_ORGANICA: row.nombre_organo_ugp,
        PROCEDIMIENTO: row.nombre_proceso,
        UNIDAD_MEDIDA: row.nombre_unidad_medida
      }
      excel.push(data);  
    });
    this.excelService.exportAsExcelFile(excel, 'acciones');  
  } 

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllAcciones();
    this.getAllProcesos();
    this.getAllProducto();
    this.getAllOrgano();    
    this.getAllUnidadMedida();    
  }

  getAllProducto() {
    this.productoService.getProductoxUGP(this.ugp.id).subscribe(res => {
      this.lista_producto = res;
    });
  }

  getAllUnidadMedida() {
    this.unidadMedidaService.getAllUnidadMedida().subscribe(res => {
      this.lista_um = res;
    });
  }

  getAllProcesos() {
    this.procesoService.getAllProcesos().subscribe(res => {
      this.lista_proceso = res;
    });
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
      if(res["length"]!=0){
        this.accion.id_organo = this.lista_organo[0].id;
        this.getAllUGPxOrgano();
      }
    });
  }

  getAllUGPxOrgano() {
    //console.log(this.accion.id_organo);  
    this.organoService.getAllUGPxOrgano(this.accion.id_organo).subscribe(res => {
      this.lista_organo_ugp = res;   
      if(res["length"]!=0){
        this.accion.id_organo_ugp = this.lista_organo_ugp[0].id;
      }        
    });
  }

  getAllAcciones() {
    this.lista_acciones = null;
    this.accionesService.getAllAccionesxIdUGP(this.ugp.id).subscribe(res => {
        this.lista_acciones = res;
      });
  }

  getElemento(elemento) {
    //console.log("elemento",elemento);
    this.accion = {
      id: (elemento!=null) ? elemento.id : 0,
      nombre: (elemento!=null) ? elemento.nombre : "",
      descripcion: (elemento!=null) ? elemento.descripcion : "",
      id_proceso: (elemento!=null) ? elemento.id_proceso : 0,
      id_estado: (elemento!=null) ? elemento.id_estado : 1,
      id_organo: (elemento!=null) ? elemento.id_organo : 0,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      id_producto: (elemento!=null) ? elemento.id_producto : 0,
      id_unidad_medida: (elemento!=null) ? elemento.id_unidad_medida : 0,
      id_organo_ugp: (elemento!=null) ? elemento.id_organo_ugp : 0,
      id_definicion: (elemento!=null) ? elemento.id_definicion : 0,
      df1: (elemento!=null) ? elemento.df1 : "",
      df2: (elemento!=null) ? elemento.df2 : "",
      df3: (elemento!=null) ? elemento.df3 : "",
      df4: (elemento!=null) ? elemento.df4 : "",
      df5: (elemento!=null) ? elemento.df5 : "",
      df6: (elemento!=null) ? elemento.df6 : "",
      df7: (elemento!=null) ? elemento.df7 : "",
      df8: (elemento!=null) ? elemento.df8 : "",
      cr1: (elemento!=null) ? elemento.cr1 : "",
      cr2: (elemento!=null) ? elemento.cr2 : "",
      cr3: (elemento!=null) ? elemento.cr3 : "",
      cr4: (elemento!=null) ? elemento.cr4 : "",
      cr5: (elemento!=null) ? elemento.cr5 : ""
    }

    this.definicionProducto = {
      id_accion: this.accion.id,
      id_definicion:(elemento!=null) ? elemento.id_definicion : 0,
      df1: (elemento!=null) ? elemento.df1 : "",
      df2: (elemento!=null) ? elemento.df2 : "",
      df3: (elemento!=null) ? elemento.df3 : "",
      df4: (elemento!=null) ? elemento.df4 : "",
      df5: (elemento!=null) ? elemento.df5 : "",
      df6: (elemento!=null) ? elemento.df6 : "",
      df7: (elemento!=null) ? elemento.df7 : "",
      df8: (elemento!=null) ? elemento.df8 : "",
      cr1: (elemento!=null) ? elemento.cr1 : "",
      cr2: (elemento!=null) ? elemento.cr2 : "",
      cr3: (elemento!=null) ? elemento.cr3 : "",
      cr4: (elemento!=null) ? elemento.cr4 : "",
      cr5: (elemento!=null) ? elemento.cr5 : ""
    };
    
    this.organoService.getAllUGPxOrgano(this.accion.id_organo).subscribe(res => {
      this.lista_organo_ugp = res;
      if(this.accion.id_organo_ugp==0 && res["length"]!=0){
        this.accion.id_organo_ugp = this.lista_organo_ugp[0].id;
      }          
    });
  }

  selectProceso(elemento) {
    this.accion.id_proceso = elemento.id;
  }

  guardarAccion() {    
    // console.log(this.accion);
    this.x_progreso = true;
    var resultado = this.validacion();
    if(resultado.length==0){
      this.accionesService.guardarAccionProducto(this.accion).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
            this.closeModalAccionP.nativeElement.click();
            this.getAllAcciones();
            this.x_progreso = false;            
          } else if (res["id"] == null) {
            this.x_progreso = false;
            this.toastService.showError(
              "Se produjo un error al guardar.",
              "Error"
            );
          }
        },
        err => {
          this.x_progreso = false;
          this.toastService.showError(
            "Se produjo un error en el servicio. Error: " + err.message,
            "Error"
          );
        }
      );
    }
    else{
      this.toastService.showError(
        "Se produjo un error en el servicio. Error: " + resultado,
        "Error"
      );
      this.x_progreso = false;
    }
  }

  validacion(){
    var output = "";
    if(this.accion.descripcion.length>400){
      output = "Máximo contenido en Descripción es 400 caracteres, ahora estas cargando " + 
      this.producto.descripcion.length + " caracteres";
      return output;
    }
    if(this.accion.nombre.length>400){
      output = "Máximo contenido en Nombre es 200 caracteres, ahora estas cargando " + 
      this.producto.descripcion.length + " caracteres";
      return output;
    }
    if(this.accion.id_proceso==0){
      output = "Debe seleccionar un Proceso";
      return output;
    }
    if(this.accion.id_unidad_medida==0){
      output = "Debe seleccionar una Unidad de Medida";
      return output;
    }
    if(this.accion.id_producto==0){
      output = "Debe seleccionar un Producto";
      return output;
    }
    return output;
  }

  getAccion(elemento) {
    this.accion = elemento;
  }

  getDefinicionAccion(elemento) {
    this.accion = elemento;
    this.definicionProducto.id_accion = elemento.id;

    this.accionesService.listarDef(
        this.definicionProducto.id_definicion,
        this.definicionProducto.id_ugp,
        this.definicionProducto.id_accion
      ).subscribe(res => {
        // console.log("Definicion", res);
        let rpta: any = res;
        let tamaño;
        tamaño = rpta.length;
        if (tamaño != 0) {
          this.definicionProducto = rpta[0];
          // console.log("EDITAR");
        } else {
          // console.log("GUARDAR");
          this.definicionProducto = {
            id_ugp: this.ugp.id,
            id_accion: this.definicionProducto.id_accion,
            id_definicion: 0,
            df1: "",
            df2: "",
            df3: "",
            df4: "",
            df5: "",
            df6: "",
            df7: "",
            df8: "",
            cr1: "",
            cr2: "",
            cr3: "",
            cr4: "",
            cr5: ""
          };
          // console.log("LISTO PARA GUARDAR", this.definicionProducto);
        }
      });
  }

  guardarDefinicionAccion() {
    this.definicionProducto.id_accion = this.accion.id;
    // console.log("Antes de enviar", this.definicionProducto);
    this.accionesService.guardarDef(this.definicionProducto).subscribe(res => {
      this.toastService.showSuccess(
        "Se guardó la definición y criterios de programación."
      );
      this.getAllAcciones();
    });
  }


    
}
