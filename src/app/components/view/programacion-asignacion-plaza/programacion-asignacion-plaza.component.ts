import {Component, OnInit} from '@angular/core';
import {UgpService} from 'src/app/services/ugp.service';
import {UsuariosService} from 'src/app/services/usuarios.service';
import {ToastrServiceService} from 'src/app/services/toastr-service.service';
import {PpPersonalService} from 'src/app/services/pp-personal.service';
import {ProductoService} from 'src/app/services/producto.service';
import {AccionesService} from 'src/app/services/acciones.service';
import {CicloService} from 'src/app/services/ciclo.service';
import {AuthService} from 'src/app/services/auth.service';
import {PfaService} from 'src/app/services/pfa.service';
import {IfStmt} from '@angular/compiler';
import {GastosPersonalServiceService} from "../../../services/gastos-personal-service.service";
import {CargoplazaInterface} from "../../../entities/cargoplaza-interface";

@Component({
  selector: 'app-programacion-asignacion-plaza',
  templateUrl: './programacion-asignacion-plaza.component.html',
  styleUrls: ['./programacion-asignacion-plaza.component.css']
})
export class ProgramacionAsignacionPlazaComponent implements OnInit {
  listaUGP: Object;
  listaProductos: Object;
  id_ugp: any;
  id_producto: any;
  nombre_accion: string;
  id_accion: any;
  acciones: any;
  listaUsuario: any = [];
  //listaUsuarios: any[] = [];
  listaUsuarios: any = Array();
  lista: any[];
  // arrplazascargo: CargoplazaInterface;
  arrplazascargo: CargoplazaInterface = {
    ID: null,
    CODIGO_PLAZA: null,
    ESTADO: false,
    NOMBRE: null,
    A_PATERNO: null,
    A_MATERNO: null,
    REGIMEN: null,
    UNIDAD: null,
    DEPENDENCIA: null,
    CARGO: null
  };

  asignacion: any = Array();
  nombre_ugp: any;
  nombre_producto: string;
  term: string;
  id_plaza: any = 0;
  resAsignacion: any = Array();
  result: any = Array();
  id_pa_personal: any;
  validacion: number;
  suma: any;
  accionTotal: any = Array();
  enero: number = 0;
  feb: any = 0;
  marzo: any = 0;
  abril: any = 0;
  may: any = 0;
  jun: any = 0;
  jul: any = 0;
  ago: any = 0;
  set: any = 0;
  oct: any = 0;
  nov: any = 0;
  dic: any = 0;
  total: Object;
  vistaTotal = false;
  resultado: any = Array();
  anio: any;
  anio2: number;
  etapa: string;
  condicion: boolean = false;
  lista_ciclo: Object;
  id_anio: number;
  user: any;
  pfa: Object;
  personal_seleccionado: string;
  anio_seleccionado: number;
  p: any;
  regimen: string = null;
  dependencia: string = null;
  unidad: string;
  personalActivoSenamhi: any = [];
  personalInactivoSenamhi: any = [];
  cargos: any = [];

  constructor(
    private cicloService: CicloService,
    private ugpService: UgpService,
    private usuarioService: UsuariosService,
    private toastrService: ToastrServiceService,
    private ppPersonalService: PpPersonalService,
    private productoService: ProductoService,
    private accionesService: AccionesService,
    private pfaService: PfaService,
    private authService: AuthService,
    private gastosplazasService: GastosPersonalServiceService,
  ) {
    this.resAsignacion = [];
    for (let i = 1; i < 13; i++) {
      this.resAsignacion.push({
        cantidad: null,
        codigo: null,
        id_periodo: i,
        id_pfa: null,
        monto: null,
        porcentaje: 0,
        presupuesto: null
      });
    }
  }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.anio = this.user.anio;
    this.getAllUGP();

    this.id_ugp = null;
    this.suma = 0;
    this.id_accion = null;

    this.personalactivo();
    this.personalinactivo();

  }

  getAllUGP() {
    this.ugpService.getAllUGPxProgramacion(this.user.codigo, this.user.id_ciclo, this.user.id_etapa, 0).subscribe(res => {
      this.listaUGP = res;
      this.id_ugp = (res["length"] > 0) ? this.listaUGP[0].id : 0;
      this.getAllProductoxUGP();
    });
  }

  getAllProductoxUGP() {
    this.productoService.getProductoxProgramacion(this.id_ugp, this.user.codigo, 0).subscribe(res => {
      this.listaProductos = res;
      this.id_producto = (res["length"] > 0) ? this.listaProductos[0].id : -1;
      this.getAllAccionesxProducto();
    });
  }

  getAllAccionesxProducto() {
    this.accionesService.getAllAccionesxProgramacion(this.id_producto, this.user.codigo, 0).subscribe(res => {
      this.acciones = res;
      this.id_accion = (res["length"] > 0) ? this.acciones[0].id : -1;
    });
  }

  capturarIdUGP(elemento) {
    this.id_ugp = elemento.id;
    this.id_accion = null;
    this.id_producto = "";
    this.getAllProductoxUGP();
    this.nombre_ugp = elemento.nombre;
    this.nombre_producto = "";
    this.nombre_accion = "";
  }

  capturarIdProducto(elemento) {
    this.id_producto = elemento.id;
    this.id_accion = null;
    this.getAllAccionesxProducto();
    this.nombre_producto = " > " + elemento.nombre;
    this.nombre_accion = "";
  }

  capturarIdAccion(accion) {
    this.id_pa_personal = " ";
    this.nombre_accion = " > " + accion.nombre;
    this.id_accion = accion.id;
  }

  select(elemento) {
    console.log(elemento);
    this.id_plaza = elemento.ID;
    this.id_accion = null;
    this.id_producto = -1;
    this.id_ugp = -1;
    for (let i = 0; i < this.listaUsuarios["length"]; i++) {
      this.listaUsuarios[i].estado = false;
    }
    this.personal_seleccionado = (elemento.NOMBRE == null) ? 'Plaza Programada sin Asignación' : elemento.NOMBRE + ' ' + elemento.A_PATERNO + ' ' + elemento.A_MATERNO;

    // for (let i = 0; i < this.listaUsuarios.length; i++) {
    //   this.listaUsuarios[i].estado = false;
    // }
    // this.listaUsuarios.forEach((data, index) => {
    //   console.log(index);
    //   this.listaUsuarios[index].estado = false;
    // });


    elemento.estado = !elemento.estado;
    this.getAllAsignacion();
  }


  guardarPPersonal() {
  }

  // getAllPersonal() {
  //   this.listaUsuarios = null;
  //   if (this.user.id_estado == 3) {
  //     this.ppPersonalService.getAllPlaza(0).subscribe(res => {
  //       this.listaUsuarios = res;
  //     });
  //   } else {
  //     this.ppPersonalService.getAllPlazaAsignacion(this.user.codigo).subscribe(res => {
  //       this.listaUsuarios = res;
  //     });
  //   }
  // }

// Para años anteriores a 2022
  getAllPersonal_() {
    this.listaUsuarios = null;
    if (this.user.id_estado === 3) {
      this.ppPersonalService.getAllPlaza(0).subscribe(res => {
        this.listaUsuarios = res;
      });
    } else {
      this.ppPersonalService.getAllPlazaAsignacion(this.user.codigo).subscribe(res => {
        this.listaUsuarios = res;
      });
    }
  }

  // funcion obtencion datos del personal
  getAllPersonal() {
    let plazas = [];
    this.gastosplazasService.getplazacargo(this.user.id_ciclo, this.user.id_etapa, this.regimen ? this.regimen : null, this.dependencia ? this.dependencia : null, this.unidad ? this.unidad : null).subscribe(res => {

      this.lista = res;
      this.lista.forEach((data, index) => {
        this.arrplazascargo = {
          ID: null,
          CODIGO_PLAZA: null,
          ESTADO: false,
          A_PATERNO: null,
          A_MATERNO: null,
          NOMBRE: null,
          REGIMEN: null,
          UNIDAD: null,
          DEPENDENCIA: null,
          CARGO: null
        };
        this.arrplazascargo.ID = data.id;
        this.arrplazascargo.REGIMEN = data.regimen;
        this.arrplazascargo.ESTADO = false;
        this.arrplazascargo.CODIGO_PLAZA = data.cod_plaza;
        this.arrplazascargo.UNIDAD = data.unidad;
        this.arrplazascargo.DEPENDENCIA = data.dependencia;
        const cargo = this.filtrarcargo(data.cod_cargo);
        this.arrplazascargo.CARGO = cargo[0] ? cargo[0].nombre : null;
        //
        let codigo = data.cod_personal;

        if (codigo != null) {
          // console.log(codigo);
          let personal = this.filtrarpersonalActivo(data.cod_personal);
          // console.log(personal);
          if (personal.length > 0) {
            // this.arrplazascargo.personal = personal[0].a_paterno + ' ' + personal[0].a_materno + ' ' + personal[0].nom_emp;
            this.arrplazascargo.A_PATERNO = personal[0].a_paterno;
            this.arrplazascargo.A_MATERNO = personal[0].a_materno;
            this.arrplazascargo.NOMBRE = personal[0].nom_emp;
          } else {
            let personal = this.filtrarpersonalActivo(data.cod_personal);
            if (personal.length > 0) {
              // this.arrplazascargo.personal = personal[0].a_paterno + ' ' + personal[0].a_materno + ' ' + personal[0].nom_emp;
              this.arrplazascargo.A_PATERNO = personal[0].a_paterno;
              this.arrplazascargo.A_MATERNO = personal[0].a_materno;
              this.arrplazascargo.NOMBRE = personal[0].nom_emp;
            }
          }
        }
        //

        this.listaUsuarios.push(this.arrplazascargo);
      });
      // console.log('ingresa ...');
      // console.log(this.listaUsuarios);
      // console.log('end ...');
    });
  }

////////////////////////////////////////////////////////////////////////////////////
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

  personalactivo() {
    this.gastosplazasService.getpersonalactivo().subscribe(res => {
      this.personalActivoSenamhi = res;
      this.listcargos();
      //this.getAllPersonal();
      if (this.user.id_ciclo <= 126) {
        this.getAllPersonal_();
      } else {
        this.getAllPersonal();
      }
    });
  }

  personalinactivo() {
    this.gastosplazasService.getpersonalinactivo().subscribe(res => {
      this.personalInactivoSenamhi = res;
      this.listcargos();
      if (this.user.id_ciclo <= 126) {
        this.getAllPersonal_();
      } else {
        this.getAllPersonal();
      }
    });
  }

  listcargos() {
    this.gastosplazasService.getcargos().subscribe(res => {
      this.cargos = res;
    });
  }

  getAllAsignacion() {
    this.result = null;
    this.ppPersonalService.getAllAsignacionxPlaza(this.id_plaza, this.user.id_ciclo, this.user.id_etapa).subscribe(res => {
      this.result = res;
      console.log("result", res);
    });
  }

  sumarTotal(index_accion, index_periodo) {
    var suma_periodo = 0;
    for (let i = 0; i < this.result.lista_accion.length; i++) {
      suma_periodo = suma_periodo + this.result.lista_accion[i].lista_periodo[index_periodo].porcentaje;
    }

    this.result.lista_totales[index_periodo].total = suma_periodo;
    this.condicion = false;
    if (suma_periodo > 100) {
      this.toastrService.showError("No puede ingresar más del 100% de asignación en un periodo");
      this.condicion = true;
    }
  }

  getAsignacion(id_plaza, id_accion) {
    this.ppPersonalService.getAllAsignacion(this.id_plaza, this.id_accion).subscribe(res => {
      // console.log("getAsig", res);
      this.resultado = res;
      // console.log("resutado", this.resultado);

      this.resAsignacion = [];
      if (this.resultado.length > 0) {
        this.validacion = 1;
        this.id_pa_personal = res[0].id_pa_personal;
        for (let i = 1; i < 13; i++) {
          this.resAsignacion.push({
            cantidad: null,
            codigo: null,
            id_periodo: i,
            id_pfa: null,
            monto: null,
            porcentaje: 0,
            presupuesto: null
          });
        }
        this.resAsignacion = res[0]["lista_accion"][0].lista_periodo;
        this.accionTotal = [
          {
            nombre_accion: res[0]["lista_accion"][0].nombre_accion,
            lista_periodo: this.resAsignacion
          }
        ];
      } else {
        this.validacion = 0;
        this.resAsignacion = [];
        for (let i = 1; i < 13; i++) {
          this.resAsignacion.push({
            cantidad: null,
            codigo: null,
            id_periodo: i,
            id_pfa: null,
            monto: null,
            porcentaje: 0,
            presupuesto: null
          });
        }
      }
      this.suma = 0;
      for (let i = 0; i < this.resAsignacion.length; i++) {
        this.suma = this.suma + this.resAsignacion[i].porcentaje;
      }
    });
  }

  guardarAsignacion() {
    let error = "";
    var suma_periodo = 0;
    for (let i = 0; i < this.result.lista_totales.length; i++) {
      // suma_periodo = this.result.lista_totales[i].total;
      console.log(this.result.lista_totales.length);
      console.log(i);
      console.log(this.result.lista_totales[i]);
      suma_periodo = suma_periodo + this.result.lista_totales[i].total;

      if (this.result.lista_totales[i].total > 100) {
        switch (i) {
          case 0:
            error = "Enero";
            break;
          case 1:
            error = "Febrero";
            break;
          case 2:
            error = "Marzo";
            break;
          case 3:
            error = "Abril";
            break;
          case 4:
            error = "Mayo";
            break;
          case 5:
            error = "Junio";
            break;
          case 6:
            error = "Julio";
            break;
          case 7:
            error = "Agosto";
            break;
          case 8:
            error = "Setiembre";
            break;
          case 9:
            error = "Octubre";
            break;
          case 10:
            error = "Noviembre";
            break;
          case 11:
            error = "Diciembre";
            break;
        }
        this.toastrService.showError("La asignación tiene que ser 100% en el mes de " + error + ": " + suma_periodo + "%");
        break;
      }
      console.log("suma_periodo", suma_periodo);
    }

    if (error == "") {
      for (let i = 0; i < this.result.lista_accion.length; i++) {
        for (let ii = 0; ii < this.result.lista_accion[i].lista_periodo.length; ii++) {
          let data = {
            id_plaza: this.id_plaza,
            id_etapa: this.user.id_etapa,
            id_ciclo: this.user.id_ciclo,
            id_accion: this.result.lista_accion[i].id_accion,
            id_periodo: this.result.lista_accion[i].lista_periodo[ii].id_periodo,
            porcentaje: this.result.lista_accion[i].lista_periodo[ii].porcentaje
          };
          console.log(data);
          this.ppPersonalService.registrarAsignacion(data).subscribe(res => {
            console.log("envio", res);
            this.getAllAsignacion();
          });
        }
      }
      this.toastrService.showSuccess("Se guardó correctamente.");
    }
  }

  eliminarAccion(elemento) {
    if (confirm("¿Usted va eliminar la asignación?")) {
      let data = {
        id_plaza: this.id_plaza,
        id_accion: elemento
      };
      this.ppPersonalService.anularPersonalxAccion(data).subscribe(res => {
        this.toastrService.showSuccess("Se eliminó la acción.");
        // console.log(res);
        this.enero = 0;
        this.feb = 0;
        this.marzo = 0;
        this.abril = 0;
        this.may = 0;
        this.jun = 0;
        this.jul = 0;
        this.ago = 0;
        this.set = 0;
        this.oct = 0;
        this.nov = 0;
        this.dic = 0;
        this.getAllAsignacion();
      });

    }
  }

  vincularAccion() {
    let data = {
      id_plaza: this.id_plaza,
      id_accion: this.id_accion,
      id_ciclo: this.user.id_ciclo
    };
    // console.log(data);
    this.ppPersonalService.vincularAccion(data).subscribe(res => {
      this.getAllAsignacion();
      this.toastrService.showSuccess("Se vinculó correctamente.");
    });
  }
}
