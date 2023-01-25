import {Component, OnInit} from '@angular/core';
import {ExcelServicesService} from '../../../services/excel-services.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {ToastrServiceService} from "../../../services/toastr-service.service";
import {concat} from "rxjs";
import {error, log} from "util";
import {element} from "protractor";
import {GastosPersonalServiceService} from "../../../services/gastos-personal-service.service";

@Component({
  selector: 'app-import-gastos-plaza',
  templateUrl: './import-gastos-plaza.component.html',
  styleUrls: ['./import-gastos-plaza.component.css']
})
export class ImportGastosPlazaComponent implements OnInit {
  data: any;
  formmarca: FormGroup;
  lista: FormGroup;
  hidebutoon = new FormControl(false);
  datos: any = {lista: '', msg: '', error: ''};
  formulario: FormGroup;
  formPlazaCargo: FormGroup;
  formconcepto: FormGroup;
  formconceptoperiodo: FormGroup;
  formgasto: FormGroup;
  formpersonal: FormGroup;
  namefile = null;
  cargosSenamhi: any = [];
  periodosSenamhi: any = [];
  conceptosperiodos: any = [];
  personalActivoSenamhi: any = [];
  personalInactivoSenamhi: any = [];
  cargo: any = [];
  personainactivo: any = [];
  user: any;
  periodo: any;
  conceptoperiodo: any;
  gasto_m: any = [];
  d_cod_emp: number = null;
  d_cargo: any = '';
  d_regimen: any = '';
  d_tipo_regimen: any = '';
  d_inicio: any = 3;
  d_remun_ini: any = 14;
  d_remun_fin: any = '';
  persona_ac: any = [];
  d_plaza: any = '';
  d_dependencia: any = '';
  d_unidad: any = '';
  d_condicion = '';
  p1 = 0;
  p = 0;
  plazas: any = [];
  id_plaza: any = '';
  wanings: any = [];
  gastosplaza: any = [];
  acumulador = 0;

  constructor(
    private formBuilder: FormBuilder,
    public excelservice: ExcelServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private gastosplazasService: GastosPersonalServiceService,
    private authService: AuthService,
    private toastService: ToastrServiceService
  ) {
    this.formularioGastos();

    this.frmconcepto();
    this.frmconceptoperiodo();
    this.frmpersonal();
    this.frmplazameta();
    this.frmgasto();
    this.frmlista();
  }

  ngOnInit(): void {
    this.user = this.authService.getUserLoggedIn();
    this.cargos();


    // this.periodos();
    // this.conceptoperiodos();
  }

  grabar() {
    this.gasto_m = [];
    this.hidebutoon = new FormControl(true);
    this.wanings = [];
    setTimeout(() => {
        if (this.hidebutoon) {
          if (this.formulario.invalid) {
            this.formulario.markAllAsTouched();
            this.hidebutoon = new FormControl(false);
          } else {
            this.hidebutoon = new FormControl(true);
            // const log_pedazos = 200;
            // let arreglo = [];
            let regimenarchivo = this.data[0][0].toString() ? this.data[0][0].toString() : null;
            let tiporegimenarchivo = this.data[0][1] ? this.data[0][1] : null;
            if (regimenarchivo === this.d_regimen && tiporegimenarchivo === this.d_tipo_regimen) {
              for (let i = 0; i < this.data.length; i++) {
                this.frmlista();
                this.id_ciclofrmlista.setValue(this.user.id_ciclo);
                this.id_etapafrmlista.setValue(this.user.id_etapa);
                // let pedazo = this.datos.slice(i, i + log_pedazos);
                // arreglo.push(pedazo);
                // let pedazo = this.datos.slice(i, i + log_pedazos);
                // arreglo.push(pedazo);
                const element = this.data[i];
                if (i >= this.d_inicio) {
                  this.d_cargo = element[12];
                  this.d_dependencia = element[9];
                  this.d_unidad = element[10];
                  this.d_condicion = element[2];
                  this.d_cod_emp = element[4] ? element[4].toString().padStart(8, '0') : null;
                  this.d_plaza = element[1] ? element[1].toString().padStart(3, '0') : null;
                  this.persona_ac = this.filtrarpersonalActivo(element[4] ? element[4].toString().padStart(8, '0') : null);
                  this.personainactivo = this.filtrarpersonalInacActivo(element[4] ? element[4].toString().padStart(8, '0') : null);
                  if (this.d_plaza != null) {
                    if (this.d_cargo != null) {
                      if (this.d_cod_emp != null) {
                        if (this.persona_ac.length > 0) {
                          this.cod_empfrmpersonal.setValue(this.d_cod_emp);
                          this.regimenfrmplazameta.setValue(this.d_regimen);
                          this.cod_cargofrmplazameta.setValue(this.persona_ac[0].crg_fisico);
                          this.dependenciafrmplazameta.setValue(this.d_dependencia);
                          this.unidadfrmplazameta.setValue(this.d_unidad);
                          this.condicionfrmplazameta.setValue(this.d_condicion);
                          this.cod_plazafrmplazameta.setValue(this.d_plaza);
                        } else if (this.persona_ac.length === 0) {

                          if (this.personainactivo.length > 0) {
                            let msg = '* El personal de la linea ' + (i + 1) + ' con codigo: ' + this.d_cod_emp + ' y cargo: ' + this.d_cargo +
                              'se encuentra inactivo, se procedió a enviar la plaza sin personal asignado' + "\n";

                            this.wanings.push(msg);
                            console.log(this.d_cargo);
                            let cargo_p = this.filtrarcargonombre(this.d_cargo.toString());
                            console.log(cargo_p);
                            if (cargo_p.length > 0) {
                              this.cod_empfrmpersonal.setValue(null);
                              this.regimenfrmplazameta.setValue(this.d_regimen);
                              this.cod_cargofrmplazameta.setValue(cargo_p[0].codigo);
                              this.cod_plazafrmplazameta.setValue(this.d_plaza);
                              this.dependenciafrmplazameta.setValue(this.d_dependencia);
                              this.unidadfrmplazameta.setValue(this.d_unidad);
                              this.condicionfrmplazameta.setValue(this.d_condicion);

                            } else {
                              this.toastService.showError('Error! en la linea ' + (i + 1) + ' El cargo: ' + this.d_cargo + ' no existe en la Base de datos del Personal de SENAMHI');
                              this.toastService.showError('Es probable que aya errores de sitáxis, verifique si esta escrito correctamente');
                              return;
                            }
                          } else {
                            this.hidebutoon = new FormControl(false);
                            let msg = 'Error! en la linea' + (i + 1) + ' el personal con codigo: ' + this.d_cod_emp + ' no existe en la Base de datos del Personal de SENAMHI';
                            this.toastService.showError(msg);
                            this.toastService.showError('Verifique que sea correcto');
                            return;
                          }
                        }
                      } else {
                        let cargo_p = this.filtrarcargonombre(this.d_cargo.toString());
                        if (cargo_p.length > 0) {
                          this.cod_empfrmpersonal.setValue(null);
                          this.regimenfrmplazameta.setValue(this.d_regimen);
                          this.cod_cargofrmplazameta.setValue(cargo_p[0].codigo);
                          this.cod_plazafrmplazameta.setValue(this.d_plaza);

                          this.dependenciafrmplazameta.setValue(this.d_dependencia);
                          this.unidadfrmplazameta.setValue(this.d_unidad);
                          this.condicionfrmplazameta.setValue(this.d_condicion);
                        } else {
                          this.toastService.showError('Error! en la linea ' + (i + 1) + ' El cargo:' + this.d_cargo + ' no existe en la Base de datos del Personal de SENAMHI');
                          this.toastService.showError('Es probable que aya errores de sitáxis, verifique si esta escrito correctamente');
                          return;
                        }
                      }
                      let c = 0;
                      //REMUN

                      console.log(this.conceptosperiodos);
                      for (let i = this.d_remun_ini; i <= (this.d_remun_ini + this.conceptosperiodos.length - 1); i++) {
                        this.frmgasto();
                        this.id_plaza_cargofrmgasto.setValue(this.conceptosperiodos[c].id);
                        this.montofrmgasto.setValue(element[i] ? element[i] : null);
                        this.gastos.push(this.formgasto);
                        c = c + 1;
                      }
                    } else {
                      this.toastService.showError('Error! en la linea ' + (i + 1) + ' No deben existir cargos vacíos');
                      return;
                    }
                  } else {
                    console.log('la plaza');
                    console.log(this.d_cargo);
                    console.log(this.data[0]);
                    this.toastService.showError('Error! en la linea ' + (i + 1) + ' No deben existir plazas vacías');
                    this.hidebutoon = new FormControl(false);
                    return;
                  }
                  this.gasto_m.push(this.lista.value);
                }
              }
            } else {
              this.toastService.showError('El archivo seleccionado es incorrecto, este debe coincidir con el regimen seleccionado');
              return;
            }
            console.log('la data');
            console.log(this.gasto_m);
            this.salvar(this.gasto_m);
            // for (let i = 0; i < this.gasto_m.length; i += log_pedazos) {
            //   let pedazo = this.gasto_m.slice(i, i + log_pedazos);
            //   arreglo.push(pedazo);
            //   this.salvar(pedazo);
            //   console.log(pedazo);
            // }
          }
        }
      }
      ,
      500
    );
  }

  filtrarcargo(codigo) {
    return this.cargosSenamhi.filter(
      cargo => cargo.codigo === codigo);
  }

  filtrarcargonombre(nombre) {
    return this.cargosSenamhi.filter(
      cargo => cargo.nombre === nombre);
  }

  filtrarperiodo(m) {
    return this.periodosSenamhi.filter(
      periodo => periodo.mes === m);
  }


  filtrarconceptoperiodo(regimen) {
    return this.conceptosperiodos.filter(
      cp => cp.regimen === regimen);
  }

  filtrarpersonalActivo(codigo) {
    return this.personalActivoSenamhi.filter(
      person => person.cod_emp === codigo);
  }

  filtrarpersonalInacActivo(codigo) {
    return this.personalInactivoSenamhi.filter(
      person => person.cod_emp === codigo);
  }

  salvar(data) {
    // console.log(data);
    this.gastosplazasService.creategastos(data).subscribe(
      res => {
        this.hidebutoon = new FormControl(false);
        this.toastService.showSuccess("Proceso culminado satisfactoriamente")
      }
    );
  }

  frmlista() {
    this.lista = this.formBuilder.group(
      {
        personal: this.formpersonal,
        plaza_meta: this.formPlazaCargo,
        id_etapa: null,
        id_ciclo: null,
        gastos: this.formBuilder.array([])
      }
    );
  }


  get id_etapafrmlista() {
    return this.lista.get('id_etapa');
  }

  get id_ciclofrmlista() {
    return this.lista.get('id_ciclo');
  }

  frmconcepto() {
    this.formconcepto = this.formBuilder.group(
      {
        id: null,
        codigo: null,
        descripcion: null,
        tipo: null,
        regimen: null,
        tipo_regimen: null,
        estado: 1
      });
  }

  get codigofrmconcepto() {
    return this.formconcepto.get('codigo');
  }

  get descripcionfrmconcepto() {
    return this.formconcepto.get('descripcion');
  }

  get tipofrmconcepto() {
    return this.formconcepto.get('tipo');
  }

  get regimenfrmconcepto() {
    return this.formconcepto.get('regimen');
  }

  get tipo_regimenfrmconcepto() {
    return this.formconcepto.get('tipo_regimen');
  }

  frmconceptoperiodo() {
    this.formconceptoperiodo = this.formBuilder.group(
      {
        id: null,
        id_periodo: null,
        mes: null,
        id_concepto_gasto: null,
        concepto_gasto: this.formconcepto,
        estado: 1,
        fech_reg: null
      }
    );
  }

  get idfrmconceptoperiodo() {
    return this.formconceptoperiodo.get('id');
  }

  get mesfrmconceptoperiodo() {
    return this.formconceptoperiodo.get('mes');
  }

  frmplazameta() {
    this.formPlazaCargo = this.formBuilder.group({
      id: null,
      cod_plaza: null,
      cod_cargo: null,
      regimen: null,
      id_meta_presupuestal: null,
      estado: 1,
      fech_reg: null,
      dependencia: null,
      unidad: null,
      condicion: null
    });
  }

  get cod_plazafrmplazameta() {
    return this.formPlazaCargo.get('cod_plaza');
  }

  get cod_cargofrmplazameta() {
    return this.formPlazaCargo.get('cod_cargo');
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

  get gastos() {
    return this.lista.get('gastos') as FormArray;
  }

  frmgasto() {
    this.formgasto = this.formBuilder.group(
      {
        id: null,
        id_concepto_periodo: null,
        // concepto_periodo: this.formconceptoperiodo,
        id_plaza_cargo: null,
        monto: null,
        estado: 1,
        fech_reg: null,
        fech_mod: null
      }
    );
  }

  get id_plaza_cargofrmgasto() {
    return this.formgasto.get('id_concepto_periodo');
  }

  get montofrmgasto() {
    return this.formgasto.get('monto');
  }

  frmpersonal() {
    this.formpersonal = this.formBuilder.group({
      cod_emp: null,
      nom_emp: null,
      a_paterno: null,
      a_materno: null,
      dni: null,
      f_ingreso: null,
      crg_fisico: null,
      nombre_crg_fisico: null,
      estado: null,
      nombre_estado: null,
      regimen: null,
      condicion: null,
      nombre_condicion: null,
      direccion: null,
      nombre_direccion: null,
      dependencia: null,
      nombre_dependencia: null,
      unidad: null,
      nombre_unidad: null,
    });
  }

  get cod_empfrmpersonal() {
    return this.formpersonal.get('cod_emp');
  }

  formularioGastos() {
    this.formulario = this.formBuilder.group(
      {
        inputfile: [null, Validators.required],
        regimen: [null, Validators.required],
        // fech_ingreso: null
      }
    );
  }

  get inputfileformularioGastos() {
    return this.formulario.get('inputfile');
  }

  get regimenformularioGastos() {
    return this.formulario.get('regimen');
  }

  cargos() {
    this.gastosplazasService.getcargos().subscribe(res => {
      this.cargosSenamhi = res;
      this.personalactivo();
      this.personalinactivo();

    });
  }

  periodos() {
    this.gastosplazasService.getPeriodos(this.user.id_ciclo).subscribe(res => {
      this.periodosSenamhi = res;
      // console.log(this.cargosSenamhi);
    });
  }

  changeregimen() {
    if (this.regimenformularioGastos.value === '1') {
      this.d_regimen = 'CAS';
      this.d_tipo_regimen = null;
    } else if (this.regimenformularioGastos.value === '2') {
      this.d_regimen = '276';
      this.d_tipo_regimen = 'NOMBRADO';
    } else if (this.regimenformularioGastos.value === '3') {
      this.d_regimen = '276';
      this.d_tipo_regimen = 'OBSERVADOR';
    } else if (this.regimenformularioGastos.value === '4') {
      this.d_regimen = '728';
      this.d_tipo_regimen = null;
    }
    this.conceptoperiodos();
  }

  conceptoperiodos() {

    this.gastosplazasService.getConceptoPeriodo(this.user.id_ciclo, this.d_regimen, this.d_tipo_regimen).subscribe(res => {
      this.conceptosperiodos = res;
      // console.log(this.conceptosperiodos);
    });
  }

  personalactivo() {
    this.gastosplazasService.getpersonalactivo().subscribe(res => {
      this.personalActivoSenamhi = res;
    });
  }


  personalinactivo() {
    this.gastosplazasService.getpersonalinactivo().subscribe(res => {
      this.personalInactivoSenamhi = res;
      this.getlistaplazacargos();
    });
  }

  getlistaplazacargos() {
    this.gastosplazasService.getplazacargo(this.user.id_ciclo, this.user.id_etapa, null, null, null).subscribe(res => {

      let obj = {};
      this.plazas = [];
      let nombre_cargo = '';
      let personal_nombre = '';

      for (let i = 0; i < res.length; i++) {
        const cargo = this.filtrarcargo(res[i].cod_cargo.toString());
        nombre_cargo = cargo[0].nombre;
        if (res[i].cod_personal != null || res[i].cod_personal !== '') {
          let personal = this.filtrarpersonalActivo(res[i].cod_personal);
          if (personal.length > 0) {
            personal_nombre = (personal[0].a_paterno + ' ' + personal[0].a_materno + ' ' + personal[0].nom_emp);
          } else {
            personal_nombre = '';
          }
        }
        obj = {
          id: res[i].id_plaza_personal,
          cod_cargo: res[i].cod_cargo,
          nombre_cargo: nombre_cargo,
          cod_plaza: res[i].cod_plaza,
          id_meta_presupuestal: res[i].id_meta_presupuestal,
          regimen: res[i].regimen,
          dependencia: res[i].dependencia,
          unidad: res[i].unidad,
          condicion: res[i].unidad,
          id_ciclo: res[i].id_ciclo,
          id_etapa: res[i].id_etapa,
          cod_personal: res[i].cod_personal,
          personal: personal_nombre
        };
        this.plazas.push(obj);
      }
      console.log('Las plazas');
      console.log(this.plazas);
    });
  }

  getlistagastos(id) {
    // console.log(id)+'hola';
    this.gastosplazasService.getGastosPlazas(id, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.gastosplaza = res[0].lista_gasto;
      // console.log(this.gastosplaza);
    })
  }

  saveid_plaza(id) {
    this.id_plaza = id;
    this.getlistagastos(id);
  }

  onFileChange(evt: any) {
    this.hidebutoon = new FormControl(true);
    this.data = [];
    /* wire up file reader */
    this.namefile = evt.target.files[0].name;
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      this.data = this.excelservice.importFromFile(bstr);
      // console.log(this.data);
      if (this.data) {
        this.hidebutoon = new FormControl(false);
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
