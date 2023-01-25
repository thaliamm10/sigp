import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {ProgramaPresupuestalInterface} from 'src/app/entities/programa-presupuestal-interface';
import {ProductoPresupuestalInterface} from 'src/app/entities/producto-presupuestal-interface';
import {ActividadPresupuestalInterface} from 'src/app/entities/actividad-presupuestal-interface';
import {FuncionesInterface} from 'src/app/entities/funcion-interface';
import {divisionFuncionalInterface} from 'src/app/entities/divisionFuncional-interface';
import {GrupoFuncionalInterface} from 'src/app/entities/grupo-funcional-interface';
import {FinalidadInterface} from 'src/app/entities/finalidad-interface';
import {CadenaFuncionalService} from 'src/app/services/cadena-funcional.service';
import {RegionService} from 'src/app/services/region.service';
import {ActividadOperativaInterface} from 'src/app/entities/actividad-operativa-interface';
import {ActividadOperativaService} from 'src/app/services/actividad-operativa.service';
import {UbicacionInterface} from 'src/app/entities/ubicacion-interface';
import {CatagoriaPresupuestalInterface} from 'src/app/entities/categoria-presupuestal-interface';
import {CategoriaPresupuestalService} from 'src/app/services/categoria-presupuestal.service';
import {MetaxAoInterface} from 'src/app/entities/metaxao-interface';
import {MetaXAoService} from 'src/app/services/meta-x-ao.service';
import {AuthService} from 'src/app/services/auth.service';
import {UnidadMedidaService} from 'src/app/services/unidad-medida.service';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import {OrganoService} from 'src/app/services/organo.service';
import {ExcelServicesService} from 'src/app/services/excel-services.service';
import {FormGroup, FormControl} from '@angular/forms';
import {forEachComment} from 'tslint';

// import any = jasmine.any;

@Component({
  selector: 'app-meta-presupuestal',
  templateUrl: './meta-presupuestal.component.html',
  styleUrls: ['./meta-presupuestal.component.css']
})
export class MetaPresupuestalComponent implements OnInit {
  lista_meta: any = new Array();
  flagbtn = true;
  lista_categoria: Object;
  lista_programa: Object;
  lista_producto: Object;
  lista_actividad: Object;
  lista_funcion: Object;
  lista_division: Object;
  lista_grupo: Object;
  lista_final: Object;
  lista_dep: Object;
  lista_prov: Object;
  lista_dis: any;
  lista_ao: any = Array();
  lista1: any = Array();
  lista2: any = Array();
  listatemp: any = Array();
  listatemp2: any = Array();
  lista_meta_acc: any = Array();
  lista_organo: Object;
  cantidad_lista: number;
  programa: ProgramaPresupuestalInterface;
  producto: ProductoPresupuestalInterface;
  actividad: ActividadPresupuestalInterface;
  funcion: FuncionesInterface;
  division: divisionFuncionalInterface;
  grupo: GrupoFuncionalInterface;
  final: FinalidadInterface;
  operativa: ActividadOperativaInterface;
  ubicacion: UbicacionInterface;
  categoria: CatagoriaPresupuestalInterface;
  meta: MetaxAoInterface;
  fila: any;

  @ViewChild('closeModalMeta', {static: false})
  closeModalMeta: ElementRef;
  user: any;
  anio: number;
  etapa: string;
  lista_unidad: Object;
  filtro_organo: number;
  filtro_ao: string;
  filtro_ao2: string;
  id_categoria: number;
  id_programa: number;
  id_producto: number;
  id_actividad: number;
  id_meta: number = 0;
  id_funcion: number;
  id_division_funcional: number;
  id_grupo_funcional: number;
  id_finalidad: number;
  id_departamento: string;
  id_provincia: string;
  id_distrito: string;
  id_unidad: number;
  sec_func: string;
  p: any;
  p1: any;
  p2: any;

  constructor(
    private categoriaService: CategoriaPresupuestalService,
    private cadenaService: CadenaFuncionalService,
    private regionService: RegionService,
    private actividadService: ActividadOperativaService,
    private metaService: MetaXAoService,
    private toastService: ToastrServiceService,
    private unidadMedidaService: UnidadMedidaService,
    private organoService: OrganoService,
    private excelService: ExcelServicesService,
    private authService: AuthService
  ) {
    this.lista_meta = null;
    this.meta = {
      id_categoria: 0,
      id_programa: 0,
      id_producto: 0,
      id_actividad: 0,
      id_funcion: 0,
      id_division_funcional: 0,
      id_grupo_funcional: 0,
      id_finalidad: 0,
      id_departamento: '',
      id_provincia: '',
      id_distrito: '',
      sec_func: '',
      estado: 1
    };
    this.filtro_organo = 0;
    this.filtro_ao = '';
    this.filtro_ao2 = '';
    this.id_unidad = 0;
  }

  exportAsXLSX(): void {
    this.flagbtn = false;
    var excel = [];
    this.metaService.getAllMetaXAoo(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      // console.log(res);

      this.lista_meta_acc = res;
      console.log(this.lista_meta_acc);
      this.lista_meta_acc.forEach(row => {
        let data = {
          SEC_FUNC: row.sec_func,
          COD_CATEGORIA: row.codigo_categoria,
          CATEGORIA: row.nombre_categoria,
          COD_PROGRAMA: row.codigo_programa,
          PROGRAMA: row.nombre_programa,
          COD_PRODUCTO: row.codigo_producto,
          PRODUCTO: row.nombre_producto,
          COD_ACTIVIDAD: row.codigo_actividad,
          ACTIVIDAD: row.nombre_actividad,
          COD_FUNCION: row.codigo_funcion,
          FUNCION: row.nombre_funcion,
          COD_DIVISION: row.codigo_division,
          DIVISION: row.nombre_division,
          COD_GRUPO: row.codigo_grupo,
          GRUPO: row.nombre_grupo,
          COD_FINALIDAD: row.codigo_finalidad,
          FINALIDAD: row.nombre_finalidad,
          DEPARTAMENTO: row.nombre_departamento,
          PROVINCIA: row.nombre_provincia,
          DISTRITO: row.nombre_distrito,
          UNIDAD: row.nombre_unidad,
          UGP: row.ugp,
          PRODUCTO_UGP: row.producto_ugp,
          UMPRODUCTO: row.producto_um,
          ACCION: row.accion_ugp,
          UM_ACCION: row.accion_um,
          AO: row.ao_ugp,
          UM_AO: row.ao_um
        };
        excel.push(data);
      });
      this.flagbtn = true;
      this.excelService.exportAsExcelFile(excel, 'lista-meta-presdupuestal');
    });
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.meta.id_unidad = 0;
    this.meta.id = 0;
    this.anio = this.user.anio;
    this.etapa = this.user.nombre_etapa;
    this.getAllCategoria();
    this.getAllFuncion();
    this.getAllRegion();
    this.getAllUnidadMedida();
    this.getAllMeta();
    this.getAllAO();
    this.getAllOrgano();
  }

  getAllUnidadMedida() {
    this.unidadMedidaService.getAllUnidadMedida().subscribe(res => {
      this.lista_unidad = res;
      if (res['length'] > 0) {
        this.id_unidad = this.lista_unidad[0].id;
      }
    });
  }

  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
      this.lista_organo = res;
      if (res['length'] > 0) {
        this.filtro_organo = this.lista_organo[0].id;
      }
    });
  }

  getAllMeta() {
    this.metaService.getAllMetaXAo(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      // console.log(res);
      this.lista_meta = res;
      this.cantidad_lista = res['length'];
    });
  }

  getAllCategoria() {
    this.categoriaService.getCategoriaPresupuestal(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_categoria = res;
      this.lista_programa = null;
      this.lista_producto = null;
      this.lista_actividad = null;
      if (res['length'] > 0) {
        this.id_categoria = this.lista_categoria[0].id;
        this.getAllPrograma();
      }
    });
  }

  getAllPrograma() {
    this.categoriaService.getProgramaPresupuestal(0, this.id_categoria, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_programa = res;
      this.lista_producto = null;
      this.lista_actividad = null;
      if (res['length'] > 0) {
        this.id_programa = this.lista_programa[0].id;
        this.getAllProducto();
      }
    });
  }

  getAllProducto() {
    this.categoriaService.getProductoPresupuestal(0, this.id_programa, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_producto = res;
      this.lista_actividad = null;
      if (res['length'] > 0) {
        this.id_producto = this.lista_producto[0].id;
        this.getAllActividad();
      }
    });
  }

  getAllActividad() {
    this.categoriaService.getActividadPresupuestal(0, this.id_producto, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_actividad = res;
      if (res['length'] > 0) {
        this.id_actividad = this.lista_actividad[0].id;
      }
    });
  }

  getAllFuncion() {
    this.cadenaService.getFuncion(0, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_funcion = res;
      this.lista_division = null;
      this.lista_grupo = null;
      this.lista_final = null;
      if (res['length'] > 0) {
        this.id_funcion = this.lista_funcion[0].id;
        this.getAllDivision();
      }
    });
  }

  getAllDivision() {
    this.cadenaService.getDivisionFuncional(this.id_funcion, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_division = res;
      this.lista_grupo = null;
      this.lista_final = null;
      if (res['length'] > 0) {
        this.id_division_funcional = this.lista_division[0].id;
        this.getAllGrupo();
      }
    });
  }

  getAllGrupo() {
    this.cadenaService.getGrupoFuncional(this.id_division_funcional, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_grupo = res;
      this.lista_final = null;
      if (res['length'] > 0) {
        this.id_grupo_funcional = this.lista_grupo[0].id;
        this.getAllFinal();
      }
    });
  }

  getAllFinal() {
    this.cadenaService.getFinalidad(this.id_grupo_funcional, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_final = res;
      if (res['length'] > 0) {
        this.id_finalidad = this.lista_final[0].id;
      }
    });
  }

  getAllRegion() {
    this.regionService.getAllDepartarmento().subscribe(res => {
      this.lista_dep = res;
      this.lista_prov = null;
      this.lista_dis = null;
      if (res['length'] > 0) {
        this.id_departamento = this.lista_dep[0].CODI_DEPA_DPT;
        this.getAllProv();
      }
    });
  }

  getAllProv() {
    this.regionService.getAllProvincia(this.id_departamento).subscribe(res => {
      this.lista_prov = res;
      this.lista_dis = null;
      if (res['length'] > 0) {
        this.id_provincia = this.lista_prov[0].CODI_PROV_TPR;
        this.getAllDis();
      }
    });
  }

  getAllDis() {
    this.regionService.getAllDistrito(this.id_departamento, this.id_provincia).subscribe(res => {
      this.lista_dis = res;
      this.lista_dis.push({CODI_DIST_TDI: '99', NOMB_DIST_TDI: 'MULTIDISTRITO'});
      if (res['length'] > 0) {
        this.id_distrito = this.lista_dis[0].CODI_DIST_TDI;
      }
    });
  }

  getAllAO() {
    this.actividadService.getAllActividadOperativa2(this.id_meta, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      console.log('hola');
      // this.lista_ao = res;
    });
  }

  getElemento(elemento) {
    this.fila = elemento;
    this.meta = {
      id: (elemento != null) ? elemento.id : 0,
      sec_func: (elemento != null) ? elemento.sec_func : '',
      id_ao: (elemento != null) ? elemento.id_ao : 0,
      id_meta: (elemento != null) ? elemento.id_meta : 0,
      estado: (elemento != null) ? elemento.estado : 1,
      id_categoria: (elemento != null) ? elemento.id_categoria : 0,
      id_programa: (elemento != null) ? elemento.id_programa : 0,
      id_producto: (elemento != null) ? elemento.id_producto : 0,
      id_actividad: (elemento != null) ? elemento.id_actividad : 0,
      id_division_funcional: (elemento != null) ? elemento.id_division : 0,
      id_funcion: (elemento != null) ? elemento.id_funcion : 0,
      id_grupo_funcional: (elemento != null) ? elemento.id_grupo : 0,
      id_finalidad: (elemento != null) ? elemento.id_finalidad : 0,
      id_departamento: (elemento != null) ? elemento.id_departamento : '',
      id_provincia: (elemento != null) ? elemento.id_provincia : '',
      id_distrito: (elemento != null) ? elemento.id_distrito : '',
      id_unidad: (elemento != null) ? elemento.id_unidad : 0,
      trama_ao: (elemento != null) ? elemento.trama_ao : ''
    };
    this.id_meta = this.meta.id;
    this.sec_func = this.meta.sec_func;
    this.id_categoria = this.meta.id_categoria;
    this.id_programa = this.meta.id_programa;
    this.id_producto = this.meta.id_producto;
    this.id_actividad = this.meta.id_actividad;
    // console.log('producto' + this.id_producto);
    this.id_funcion = this.meta.id_funcion;
    this.id_division_funcional = this.meta.id_division_funcional;
    this.id_grupo_funcional = this.meta.id_grupo_funcional;
    this.id_finalidad = this.meta.id_finalidad;
    this.id_unidad = this.meta.id_unidad;
    this.id_departamento = this.meta.id_departamento;
    this.id_provincia = this.meta.id_provincia;
    this.id_distrito = this.meta.id_distrito;
    this.lista1 = [];
    this.listatemp = [];
    this.listatemp2 = [];

    this.categoriaService.getProgramaPresupuestal(0, this.id_categoria, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_programa = res;
      this.categoriaService.getProductoPresupuestal(0, this.id_programa, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
        this.lista_producto = res;
        this.categoriaService.getActividadPresupuestal(0, this.id_producto, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
          this.lista_actividad = res;
        });
      });
    });

    this.cadenaService.getDivisionFuncional(this.id_funcion, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_division = res;
      this.cadenaService.getGrupoFuncional(this.id_division_funcional, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
        this.lista_grupo = res;
        this.cadenaService.getFinalidad(this.id_grupo_funcional, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
          this.lista_final = res;
        });
      });
    });

    this.lista_prov = null;
    this.regionService.getAllProvincia(this.id_departamento).subscribe(res => {
      this.lista_prov = res;
      this.lista_dis = null;
      this.regionService.getAllDistrito(this.id_departamento, this.id_provincia).subscribe(res => {
        this.lista_dis = res;
        this.lista_dis.push({CODI_DIST_TDI: '99', NOMB_DIST_TDI: 'MULTIDISTRITO'});
      });
    });

    this.lista_ao = null;
    this.actividadService.getAllActividadOperativa2(this.id_meta, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.lista_ao = res;
      // arr = this.performFilter('0');

      // console.log(this.lista_ao);
      this.lista1 = [];
      this.lista2 = [];

      for (let i = 0; i < this.lista_ao.length; i++) {
        if (this.lista_ao[i].flag === 1) {
          this.lista1.push(this.lista_ao[i]);
        } else {
          this.lista2.push(this.lista_ao[i]);
        }
      }
    });


    // if(this.meta.trama_ao.length>0){
    //   for (let i = 0; i < this.lista_ao["length"]; i++) {
    //     for (let j = 0; j < this.meta.trama_ao.split('|').length; j++) {
    //       if((this.meta.trama_ao.split('|')[j].split('/')[0]==this.lista_ao[i].id)){
    //         this.lista_ao[i].flag = 1;
    //       }
    //     }
    //   }
    // }
  }

  // performFilter(filterBy: string): any[] {
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return this.lista_ao.filter((fila: any) =>
  //     fila.flag.toLocaleLowerCase().indexOf(filterBy) !== -1);
  // }

  selectAO(elemento) {
    elemento.flag = !elemento.flag;
    if (elemento.flag) {
      this.listatemp.push(elemento);
    } else {
      let j = this.listatemp.indexOf(elemento);
      this.listatemp.splice(j, 1);
    }
    console.log(this.listatemp);
  }

  selectAO2(elemento) {
    elemento.flag = !elemento.flag;
    if (!elemento.flag) {
      this.listatemp2.push(elemento);
    } else {
      let j = this.listatemp2.indexOf(elemento);
      this.listatemp2.splice(j, 1);
    }
    console.log(this.listatemp2);
  }

  // f
  izquierda(): void {
    // this.filtro_ao = null;
    // console.log(this.lista2.length);
    // for (let i = 0; i < this.lista2.length; i++) {
    //   let flag = this.lista2[i].flag;
    //   if (flag === true || flag === 1 || flag === null || flag === '') {
    //     console.log(this.lista2[i]);
    // this.lista2[i].flag = 1;
    for (let i = 0; i < this.listatemp.length; i++) {
      this.lista1.push(this.listatemp[i]);
      let j = this.lista2.indexOf(this.listatemp[i]);
      this.lista2.splice(j, 1);

    }
    console.log('izquierda');
    console.log(this.lista1);
    console.log(this.lista2);
    this.filtro_ao = null;
    this.listatemp = [];
    this.listatemp2 = [];
    // }
    // }
  }

  derecha(): void {
    // this.filtro_ao = null;

    // for (let i = 0; i < this.lista1.length; i++) {
    //   let flag = this.lista1[i].flag;
    //   if (flag === false || flag === 0 || flag === null || flag === '') {
    //     console.log(this.lista1[i]);
    // this.lista1[i].flag = 0;
    for (let i = 0; i < this.listatemp2.length; i++) {
      this.lista2.push(this.listatemp2[i]);
      let j = this.lista1.indexOf(this.listatemp2[i]);
      this.lista1.splice(j, 1);
    }
    console.log('derecha');

    this.filtro_ao = null;
    console.log(this.lista1);
    console.log(this.lista2);
    this.listatemp = [];
    this.listatemp2 = [];
    //   }
    // }
  }

  // end f

  graba() {
    this.meta.id_actividad = this.id_actividad;
    this.meta.sec_func = this.sec_func;
    this.meta.id_finalidad = this.id_finalidad;
    this.meta.id_distrito = this.id_distrito;
    this.meta.id_provincia = this.id_provincia;
    this.meta.id_departamento = this.id_departamento;
    this.meta.id_unidad = this.id_unidad;

    var trama_xml = '<ao>';
    for (let i = 0; i < this.lista_ao["length"]; i++) {
      trama_xml = trama_xml + '<r>';
      trama_xml = trama_xml + '<ID>' + this.lista_ao[i].id + '</ID>';
      trama_xml = trama_xml + '<FLAG>' + ((this.lista_ao[i].flag) ? 1 : 0) + '</FLAG>';
      trama_xml = trama_xml + '</r>';
    }
    trama_xml = trama_xml + '</ao>';
    this.meta.trama_ao = trama_xml;

    // console.log(this.meta);
  }

  guardarAO() {
    this.graba();

    // console.log(this.meta);
    if (this.valida(this.meta)) {
      this.metaService.guardarMetaXAo(this.meta).subscribe(
        res => {
          if (res['id'] == 0) {
            this.toastService.showError(
              'Error: Estructura repetida ',
              'Error'
            );
          } else if (res['id'] != null) {
            this.toastService.showSuccess('Se guardó con éxito', 'Correcto');
            this.closeModalMeta.nativeElement.click();
            this.getAllMeta();
          } else if (res['id'] == null) {
            this.toastService.showError('Se produjo un error al guardar.', 'Error');
          }
        },
        err => {
          this.toastService.showError(
            'Se produjo un error en el servicio. Error: ' + err.message,
            'Error'
          );
        });
    } else {
      this.toastService.showError('Formato de Fecha Incorrecto', 'Validación');
    }

  }

  valida(data) {
    return true;
  }
}
