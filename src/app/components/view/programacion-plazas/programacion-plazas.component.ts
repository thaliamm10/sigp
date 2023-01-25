import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {GastosPersonalServiceService} from '../../../services/gastos-personal-service.service';
import {AuthService} from '../../../services/auth.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MetaXAoService} from '../../../services/meta-x-ao.service';
import {element} from "protractor";
import {ToastrServiceService} from "../../../services/toastr-service.service";
import {ExcelServicesService} from "../../../services/excel-services.service";


@Component({
  selector: 'app-programacion-plazas',
  templateUrl: './programacion-plazas.component.html',
  styleUrls: ['./programacion-plazas.component.css']
})
export class ProgramacionPlazasComponent implements OnInit {
  user: any;
  plazas: any;
  formPlazaCargo: FormGroup;
  form: FormGroup;
  p: any;
  p1: any;
  plazaid: any;
  cargos: any = [];
  data: any = {id: null, id_meta_presupuestal: null};
  // tslint:disable-next-line:variable-name
  lista_meta: any = new Array();
  // tslint:disable-next-line:variable-name
  filtro_plaza: string;
  regimen: string = null;
  dependencia: string = null;
  unidad: string;
  filtro_meta: string;
  personalActivoSenamhi: any = [];
  personalInactivoSenamhi: any = [];
  responsablesorgano: any = [];
  dependencias: any = [];
  unidades: any = [];
  disable: boolean = false;

  datoSelectReporte: any = -1;
  d_regimen: any = 0;
  d_tipo_regimen: any = 0;
  dataReporteTitulo: any = [];
  cantidadesRegimenReporte: any = [];
  cantidadTipoGastoReporte: any = [];
  concetoGastoReporte: any = [];
  mesesReporte: any = [];
  gastosPermanentesReporte: any = [];
  cuerpoReporte: any = [];
  estadoBoton: boolean = true;
  spinerReporte: boolean = false;

  constructor(
    private gastosplazasService: GastosPersonalServiceService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private metaService: MetaXAoService,
    private toastService: ToastrServiceService,
    private excelService: ExcelServicesService,
  ) {
    this.organopersonal();
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();

    this.formulario();
    this.personalactivo();

    this.getdependencias();
    // this.getunidades();
    console.log(this.user.id_estado);
  }

  limpiar() {
    this.regimen = '';
    this.dependencia = '';
    this.unidad = '';
  }

  saveid_plaza(id_plaza) {
    // let id_plaza = elem ? elem.id : null;
    if (this.id_plazaformulario.value == id_plaza) {
      this.id_plazaformulario.setValue(null);
      this.id_metaformulario.setValue(null);
    } else {
      this.id_plazaformulario.setValue(id_plaza);
      this.id_metaformulario.setValue(this.filtrarplaza(id_plaza)[0] ? this.filtrarplaza(id_plaza)[0].id_meta_presupuestal : null ? this.filtrarplaza(id_plaza)[0].id_meta_presupuestal : null);
      // let meta = this.filtrarMeta(elem ? elem.id_meta_presupuestal : null);
      // // // this.id_metaformulario.setValue(meta.id);
      // // let j = this.lista_meta.indexOf(meta);
      // // this.lista_meta.splice(j, 1);

    }
  }

  saveid_meta(id) {
    if (this.id_metaformulario.value == id) {
      this.id_metaformulario.setValue(null);
    } else {
      this.id_metaformulario.setValue(id);
    }
  }

  formulario() {
    this.form = this.formBuilder.group(
      {
        // regimen: 'CAS',
        // dependencia: null,
        // unidad: null,
        id_plaza: null,
        id_meta: null,
        plazas: this.formBuilder.array([])
      }
    );
  }

  save() {

    this.data.id = this.id_plazaformulario.value;
    this.data.id_meta_presupuestal = this.id_metaformulario.value;
    if (this.data.id == null) {
      this.toastService.showError("Seleccione una plaza", "Error!");
    }
    if (this.data.id_meta_presupuestal == null) {
      this.toastService.showError("Seleccione una meta", "Error!");
    }
    this.gastosplazasService.putplazacargo(this.data).subscribe(res => {
      this.listcargos();
      this.toastService.showSuccess("Se guardó con éxito", "Correcto");
      console.log(this.data);
      this.saveid_plaza({id: this.data.id});
      this.saveid_meta(this.data.id_meta_presupuestal);

    });
    // console.log(id_plaza, id_meta);
  }

  get id_plazaformulario() {
    return this.form.get('id_plaza');
  }

  get id_metaformulario() {
    return this.form.get('id_meta');
  }

  get plazasformulario() {
    return this.form.get('plazas') as FormArray;
  }

  frmplazameta() {
    this.formPlazaCargo = this.formBuilder.group(
      {
        id: null,
        regimen: 'CAS',
        cod_plaza: null,
        cod_cargo: null,
        nombre_cargo: null,
        id_meta_presupuestal: null,
        fech_reg: null,
        dependencia: null,
        unidad: null,
        condicion: null,
        cod_personal: null,
        personal: null,
        flag: 0
      }
    );
  }

  get idplazafrmplazameta() {
    return this.formPlazaCargo.get('id');
  }

  get id_meta_presupuestalfrmplazameta() {
    return this.formPlazaCargo.get('id_meta_presupuestal');
  }

  get codplazafrmplazameta() {
    return this.formPlazaCargo.get('cod_plaza');
  }

  get codcargofrmplazameta() {
    return this.formPlazaCargo.get('cod_cargo');
  }

  get nombreplazafrmplazameta() {
    return this.formPlazaCargo.get('nombre_cargo');
  }

  get regimenfrmplazameta() {
    return this.formPlazaCargo.get('regimen');
  }

  get dependenciafrmplazameta() {
    return this.formPlazaCargo.get('dependencia');
  }

  get unidadfrmplazameta() {
    return this.formPlazaCargo.get('unidad');
  }

  get condicionfrmplazameta() {
    return this.formPlazaCargo.get('condicion');
  }

  get cod_personalfrmplazameta() {
    return this.formPlazaCargo.get('cod_personal');
  }

  get personalfrmplazameta() {
    return this.formPlazaCargo.get('personal');
  }

  get flagfrmplazameta() {
    return this.formPlazaCargo.get('flag');
  }


  listcargos() {
    this.gastosplazasService.getcargos().subscribe(res => {
      this.cargos = res;
      // console.log(this.cargos);
      this.frmplazameta();
      this.formulario();
      this.regimenfrmplazameta.setValue('CAS');
      this.getlistaplazacargos();
      // console.log(this.data);
      this.saveid_plaza(this.data.id ? this.data.id : null);
      this.saveid_meta(this.data.id_meta_presupuestal ? this.data.id_meta_presupuestal : null);
      this.getAllMeta();
    });
  }

  getdependencias() {
    this.gastosplazasService.getDependencias().subscribe(res => {
      this.dependencias = res;
    })
  }

  getunidades() {
    this.gastosplazasService.getUnidades(this.dependencia).subscribe(res => {
      this.unidades = res;
    })
  }

  getAllMeta() {
    this.lista_meta = [];
    this.metaService.getAllMetaxUnindad(0, this.user.id_ciclo, this.user.id_etapa, this.dependencia, this.unidad ? this.unidad : null).subscribe(res => {
      // console.log(res);
      this.lista_meta = res;
      // this.cantidad_lista = res['length'];
    });
  }

  getlistaplazacargos() {
    this.getunidades();
    // const regimen = this.form.get('regimen').value;
    this.plazas = [];
    this.formulario();
    this.gastosplazasService.getplazacargo(this.user.id_ciclo, this.user.id_etapa, this.regimen ? this.regimen : null, this.dependencia ? this.dependencia : null, this.unidad ? this.unidad : null).subscribe(res => {
      // console.log(res);
      // this.plazasformulario.setValue(res);
      this.plazas = res;

      this.plazas.forEach((data, index) => {
        this.frmplazameta();
        this.idplazafrmplazameta.setValue(data.id);
        this.id_meta_presupuestalfrmplazameta.setValue(data.id_meta_presupuestal);
        this.regimenfrmplazameta.setValue(data.regimen);
        this.codcargofrmplazameta.setValue(data.cod_cargo);
        this.codplazafrmplazameta.setValue(data.cod_plaza);
        const cargo = this.filtrarcargo(data.cod_cargo);
        this.nombreplazafrmplazameta.setValue(cargo[0] ? cargo[0].nombre : null);
        this.dependenciafrmplazameta.setValue(data.dependencia);
        this.unidadfrmplazameta.setValue(data.unidad);
        this.condicionfrmplazameta.setValue(data.condicion);
        this.cod_personalfrmplazameta.setValue(data.cod_personal);
        let codigo = data.cod_personal;

        if (codigo != null) {
          // console.log(codigo);
          let personal = this.filtrarpersonalActivo(data.cod_personal);
          // console.log(personal);
          if (personal.length > 0) {
            this.personalfrmplazameta.setValue(personal[0].a_paterno + ' ' + personal[0].a_materno + ' ' + personal[0].nom_emp);
          }
        }

        this.flagfrmplazameta.setValue(0);
        this.plazasformulario.push(this.formPlazaCargo);

      });
      this.getAllMeta();
      // console.log(this.formPlazaCargo);
    });
  }

  filtrarplaza(id) {
    return this.plazas.filter(
      plaza => plaza.id === id
    );
  }

  filtrarresponsable(codigo) {
    return this.responsablesorgano.filter(
      responsables => responsables.id_responsable === codigo
    );
  }

  filtrarcargo(codig) {
    return this.cargos.filter(
      cargo => cargo.codigo === codig);
  }

  filtrarpersonalActivo(codigo) {
    return this.personalActivoSenamhi.filter(
      person => person.cod_emp === codigo.toString());
  }

  filtrarpersonalInacActivo(codigo) {
    return this.personalInactivoSenamhi.filter(
      person => person.cod_emp === codigo);
  }

  filtrarMeta(id) {
    return this.lista_meta.filter(
      meta => meta.id === id);
  }

  personalactivo() {
    this.gastosplazasService.getpersonalactivo().subscribe(res => {
      this.personalActivoSenamhi = res;
      this.listcargos();

    });
  }

  organopersonal() {
    this.gastosplazasService.getOrganoPersonal().subscribe(res => {
      this.responsablesorgano = res;
      let responsable = this.filtrarresponsable(this.user.codigo);
      // console.log(responsable.length);
      if (responsable.length > 0) {
        this.dependencia = this.user.dependencia;
        this.unidad = this.user.unidad;
        this.disable = true;

      }
    });
  }

  personalinactivo() {
    this.gastosplazasService.getpersonalinactivo().subscribe(res => {
      this.personalInactivoSenamhi = res;
    });
  }


  exportAsXLSX() {
    switch (this.datoSelectReporte) {
      case '1':
        this.d_regimen = 0;
        this.d_tipo_regimen = 0;
        break;
      case '2':
        this.d_regimen = 'CAS';
        this.d_tipo_regimen = 0;
        break;
      case '3':
        this.d_regimen = '276';
        this.d_tipo_regimen = 'NOMBRADO';
        break;
      case '4':
        this.d_regimen = '276';
        this.d_tipo_regimen = 'OBSERVADOR';
        break;
      case '5':
        this.d_regimen = '728';
        this.d_tipo_regimen = 0;
        break;
    }
    this.estadoBoton = true;
    this.cantidadesRegimenReporte = [];
    this.cantidadTipoGastoReporte = [];
    this.concetoGastoReporte = [];
    this.gastosPermanentesReporte = [];
    this.mesesReporte = [];
    this.dataReporteTitulo = [];

    this.gastosplazasService.getTituloReporte(this.user.id_ciclo, this.d_regimen, this.d_tipo_regimen).subscribe(res => {
      this.spinerReporte = true;
      this.dataReporteTitulo = res;
      if (res) {
        this.dataReporteTitulo.forEach(value => {
          let sumaAux = 0;
          value.tipoGastos.forEach(value2 => {
            let sumaAux2 = 0;
            value2.conceptoGastos.forEach(value3 => {
              if (value2.nombre === 'GASTO PERMANENTE') { this.gastosPermanentesReporte.push(value3.descripcion); }
              sumaAux += value3.cantidad + 1;
              sumaAux2 += value3.cantidad + 1;
              this.concetoGastoReporte.push({
                codigo: value3.codigo,
                descripcion: value3.descripcion,
                cantidad: value3.cantidad + 1,
              });
              this.mesesReporte = this.mesesReporte.concat(value3.meses);
              this.mesesReporte.push(value3.descripcion);
            });
            this.cantidadTipoGastoReporte.push({
              tipo: value2.nombre,
              cantidad: sumaAux2,
            });
          });
          this.cantidadesRegimenReporte.push(sumaAux);
        });
      }

      this.gastosplazasService.getReporteGastoPersonal(this.user.id_ciclo, this.user.id_etapa, this.d_regimen, this.d_tipo_regimen).subscribe(respuesta => {
        this.cuerpoReporte = respuesta;
        this.estadoBoton = false;
        this.spinerReporte = false;
      });
    });
  }

  descargarXls() {
    this.estadoBoton = true;
    this.spinerReporte = true;
    this.excelService.exportTableAsExcelFile(document.getElementById('tablaReporte'), 'gasto_personal');
    this.estadoBoton = false;
    this.spinerReporte = false;
  }
}
