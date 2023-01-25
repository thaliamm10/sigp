import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import {MarcoLogicoComponent} from "./components/view/marco-logico/marco-logico.component";
import {MainMarcoLogicoComponent} from "./components/shared/main-marco-logico/main-marco-logico.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {FinalidadComponent} from "./components/view/finalidad/finalidad.component";
import {PropositoComponent} from "./components/view/proposito/proposito.component";
import {ProductoComponent} from "./components/view/producto/producto.component";
import {AccionComponent} from "./components/view/accion/accion.component";
import {MedioVerificacionComponent} from "./components/view/medio-verificacion/medio-verificacion.component";
import {SupuestoComponent} from "./components/view/supuesto/supuesto.component";
import {AccionEstrategicaComponent} from "./components/view/accion-estrategica/accion-estrategica.component";
import {ObjetivoEstrategicoComponent} from "./components/view/objetivo-estrategico/objetivo-estrategico.component";
import {MisionVisionComponent} from "./components/view/mision-vision/mision-vision.component";
import {UgpComponent} from "./components/view/ugp/ugp.component";
import {PerfilComponent} from "./components/view/perfil/perfil.component";
import {OrganoComponent} from "./components/view/organo/organo.component";
import {BienesComponent} from "./components/view/bienes/bienes.component";
import {ProcesoComponent} from "./components/view/proceso/proceso.component";
import {CicloComponent} from "./components/view/ciclo/ciclo.component";
import {
  ProgramacionFisicaProductoComponent
} from "./components/view/programacion-fisica-producto/programacion-fisica-producto.component";
import {
  ProgramacionFisicaAccionComponent
} from "./components/view/programacion-fisica-accion/programacion-fisica-accion.component";
import {
  ProgramacionPresupuestoAccionComponent
} from "./components/view/programacion-presupuesto-accion/programacion-presupuesto-accion.component";
import {
  ProgramacionPresupuestoPlazaComponent
} from "./components/view/programacion-presupuesto-plaza/programacion-presupuesto-plaza.component";
import {
  ProgramacionAsignacionPlazaComponent
} from "./components/view/programacion-asignacion-plaza/programacion-asignacion-plaza.component";
import {FinanciamientoBienesComponent} from "./components/view/financiamiento-bienes/financiamiento-bienes.component";
import {FinanciamientoPlazaComponent} from "./components/view/financiamiento-plaza/financiamiento-plaza.component";
import {UgpFilterPipe} from "./components/filter/ugp-filter.pipe";
import {PerfilFilterPipe} from "./components/filter/perfil-filter.pipe";
import {MetaFilterPipe} from "./components/filter/meta-filter.pipe";
import {GroupbyPipe} from "./components/filter/groupby.pipe";
import {PlazasFilterPipe} from "./components/filter/plazas-filter.pipe";
import {
  ObjetivoEstrategicoDetalleComponent
} from "./components/view/objetivo-estrategico-detalle/objetivo-estrategico-detalle.component";
import {
  AccionEstrategicaDetalleComponent
} from "./components/view/accion-estrategica-detalle/accion-estrategica-detalle.component";
import {DependenciaComponent} from "./components/view/dependencia/dependencia.component";
import {EfpCategoriaComponent} from "./components/view/efp-categoria/efp-categoria.component";
import {EfpProgramaComponent} from "./components/view/efp-programa/efp-programa.component";
import {EfpProductoComponent} from "./components/view/efp-producto/efp-producto.component";
import {EfpActividadComponent} from "./components/view/efp-actividad/efp-actividad.component";
import {EfpFuncionComponent} from "./components/view/efp-funcion/efp-funcion.component";
import {EfpDivisionComponent} from "./components/view/efp-division/efp-division.component";
import {EfpGrupoComponent} from "./components/view/efp-grupo/efp-grupo.component";
import {EfpFinalidadComponent} from "./components/view/efp-finalidad/efp-finalidad.component";
import {MainEfpProgramaComponent} from "./components/shared/main-efp-programa/main-efp-programa.component";
import {MainEfpCadenaComponent} from "./components/shared/main-efp-cadena/main-efp-cadena.component";
import {StatusFilter} from "./components/filter/status-filter.pipe";
import {AccionFilter} from "./components/filter/accion-filter.pipe";
import {NameFilter} from "./components/filter/name-filter.pipe";
import {BienesFilter} from "./components/filter/bienes-filter.pipe";
import {ThousandsPipe} from "./components/filter/decimal-filter.pipe";
import {DescriptionFilter} from "./components/filter/description-filter.pipe";
import {PlazaFilter} from "./components/filter/plaza-filter.pipe";
import {PersonalFilter} from "./components/filter/personal-filter.pipe";
import {AOFilter} from "./components/filter/ao-filter.pipe";
import {ComisionFilterPipe} from "./components/filter/comision-filter.pipe";
import {VehiculoFilterPipe} from "./components/filter/vehiculo-filter.pipe";
import {VehiculosComponent} from "./components/view/vehiculos/vehiculos.component";
import {FichaFilter} from "./components/filter/ficha-filter.pipe";
import {PedidoFilter} from "./components/filter/pedido-filter.pipe";
import {ActividadOperativaComponent} from "./components/view/actividad-operativa/actividad-operativa.component";
import {ReporteCeplanComponent} from "./components/view/reporte-ceplan/reporte-ceplan.component";
import {AprobacionAsignacionComponent} from "./components/view/aprobacion-asignacion/aprobacion-asignacion.component";
import {MainTopePresupuestoComponent} from "./components/shared/main-tope-presupuesto/main-tope-presupuesto.component";
import {TopeUgpComponent} from "./components/view/tope-ugp/tope-ugp.component";
import {TopeFuenteComponent} from "./components/view/tope-fuente/tope-fuente.component";
import {TopeGenericaComponent} from "./components/view/tope-generica/tope-generica.component";
import {UgpOrganoComponent} from "./components/view/ugp-organo/ugp-organo.component";
import {MetaPresupuestalComponent} from "./components/view/meta-presupuestal/meta-presupuestal.component";
import {ReporteOpp1Component} from "./components/view/reporte-opp1/reporte-opp1.component";
import {ReporteOpp2Component} from "./components/view/reporte-opp2/reporte-opp2.component";
import {ReporteOpp3Component} from "./components/view/reporte-opp3/reporte-opp3.component";
import {ReporteOpp4Component} from "./components/view/reporte-opp4/reporte-opp4.component";
import {
  ProgramacionPresupuestoComisionComponent
} from "./components/view/programacion-presupuesto-comision/programacion-presupuesto-comision.component";
import {ComisionLocalComponent} from "./components/view/comision-local/comision-local.component";
import {ComisionNacionalComponent} from "./components/view/comision-nacional/comision-nacional.component";
import {
  ComisionInternacionalComponent
} from "./components/view/comision-internacional/comision-internacional.component";
import {RutasComponent} from "./components/view/rutas/rutas.component";
import {KitsComponent} from "./components/view/kits/kits.component";
import {
  MantenimientosVehiculoComponent
} from "./components/view/mantenimientos-vehiculo/mantenimientos-vehiculo.component";
import {ReporteOpp5Component} from "./components/view/reporte-opp5/reporte-opp5.component";
import {ReporteOpp6Component} from "./components/view/reporte-opp6/reporte-opp6.component";
import {ReporteOpp7Component} from "./components/view/reporte-opp7/reporte-opp7.component";
import {ReporteOpp8Component} from "./components/view/reporte-opp8/reporte-opp8.component";
import {
  ReportePresupuestalUgpComponent
} from "./components/view/reporte-presupuestal-ugp/reporte-presupuestal-ugp.component";
import {
  FinanciamientoBienes2Component
} from "./components/view/financiamiento-bienes2/financiamiento-bienes2.component";
import {
  ProgramacionFisicaAdicionalComponent
} from "./components/view/programacion-fisica-adicional/programacion-fisica-adicional.component";
import {
  ProgramacionPresupuestoAdicionalComponent
} from "./components/view/programacion-presupuesto-adicional/programacion-presupuesto-adicional.component";
import {ReporteOpp9Component} from "./components/view/reporte-opp9/reporte-opp9.component";
import {
  ComisionLocalAdicionalComponent
} from "./components/view/comision-local-adicional/comision-local-adicional.component";
import {
  ComisionNacionalAdicionalComponent
} from "./components/view/comision-nacional-adicional/comision-nacional-adicional.component";
import {RutasAdicionalComponent} from "./components/view/rutas-adicional/rutas-adicional.component";
import {BandejaAdicionalComponent} from "./components/view/bandeja-adicional/bandeja-adicional.component";
import {FichaAdicionalComponent} from "./components/view/ficha-adicional/ficha-adicional.component";
import {ObservacionAdicionalComponent} from "./components/view/observacion-adicional/observacion-adicional.component";
import {BandejaFichaComponent} from "./components/view/bandeja-ficha/bandeja-ficha.component";
import {
  FinanciamientoMensualComponent
} from "./components/view/financiamiento-mensual/financiamiento-mensual.component";
import {TopeCanalizadoraComponent} from "./components/view/tope-canalizadora/tope-canalizadora.component";
import {ReporteOpp10Component} from "./components/view/reporte-opp10/reporte-opp10.component";
import {
  FinanciamientoMensual2Component
} from "./components/view/financiamiento-mensual2/financiamiento-mensual2.component";
import {ReporteOpp11Component} from "./components/view/reporte-opp11/reporte-opp11.component";
import {TopeIntegralComponent} from "./components/view/tope-integral/tope-integral.component";
import {ProgramacionPlazasComponent} from "./components/view/programacion-plazas/programacion-plazas.component";
import {ImportGastosPlazaComponent} from "./components/view/import-gastos-plaza/import-gastos-plaza.component";
import {ReporteGeneralComponent} from "./components/view/reporte-general/reporte-general.component";
import {
  RepMetasSubdirectivosComponent
} from "./components/view/rep-metas-subdirectivos/rep-metas-subdirectivos.component";
import {RepMetasServidoresComponent} from "./components/view/rep-metas-servidores/rep-metas-servidores.component";
import {RepMetasDirectivosComponent} from "./components/view/rep-metas-directivos/rep-metas-directivos.component";
import {ReporteGeneralUaComponent} from "./components/view/reporte-general-ua/reporte-general-ua.component";
import {
  ReporteGeneralDemandaAdiccionalComponent
} from "./components/view/reporte-general-demanda-adiccional/reporte-general-demanda-adiccional.component";
// #fake-end#
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ToastrModule} from "ngx-toastr";
import {TreeModule} from "angular-tree-component";
import {MDBBootstrapModule} from 'angular-bootstrap-md';
function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent,
    // HeaderComponent,
    // FooterComponent,
    // LoginComponent,
    MarcoLogicoComponent,
    MainMarcoLogicoComponent,
    // DashboardComponent,
    FinalidadComponent,
    PropositoComponent,
    ProductoComponent,
    AccionComponent,
    MedioVerificacionComponent,
    SupuestoComponent,
    AccionEstrategicaComponent,
    ObjetivoEstrategicoComponent,
    MisionVisionComponent,
    UgpComponent,
    PerfilComponent,
    OrganoComponent,
    BienesComponent,
    ProcesoComponent,
    CicloComponent,
    ProgramacionFisicaProductoComponent,
    ProgramacionFisicaAccionComponent,
    ProgramacionPresupuestoAccionComponent,
    ProgramacionPresupuestoPlazaComponent,
    ProgramacionAsignacionPlazaComponent,
    FinanciamientoBienesComponent,
    FinanciamientoPlazaComponent,
    UgpFilterPipe,
    PerfilFilterPipe,
    MetaFilterPipe,
    GroupbyPipe,
    PlazasFilterPipe,
    ObjetivoEstrategicoDetalleComponent,
    AccionEstrategicaDetalleComponent,
    DependenciaComponent,
    EfpCategoriaComponent,
    EfpProgramaComponent,
    EfpProductoComponent,
    EfpActividadComponent,
    EfpFuncionComponent,
    EfpDivisionComponent,
    EfpGrupoComponent,
    EfpFinalidadComponent,
    MainEfpProgramaComponent,
    MainEfpCadenaComponent,
    StatusFilter,
    AccionFilter,
    NameFilter,
    BienesFilter,
    ThousandsPipe,
    DescriptionFilter,
    PlazaFilter,
    PersonalFilter,
    AOFilter,
    ComisionFilterPipe,
    VehiculoFilterPipe,
    VehiculosComponent,
    FichaFilter,
    PedidoFilter,
    ActividadOperativaComponent,
    ReporteCeplanComponent,
    AprobacionAsignacionComponent,
    // TopePresupuestoComponent,
    MainTopePresupuestoComponent,
    TopeUgpComponent,
    // TopeCcComponent,
    TopeFuenteComponent,
    TopeGenericaComponent,
    UgpOrganoComponent,
    MetaPresupuestalComponent,
    ReporteOpp1Component,
    ReporteOpp2Component,
    ReporteOpp3Component,
    ReporteOpp4Component,
    ProgramacionPresupuestoComisionComponent,
    ComisionLocalComponent,
    ComisionNacionalComponent,
    ComisionInternacionalComponent,
    RutasComponent,
    KitsComponent,
    MantenimientosVehiculoComponent,
    ReporteOpp5Component,
    ReporteOpp6Component,
    ReporteOpp7Component,
    ReporteOpp8Component,
    ReportePresupuestalUgpComponent,
    FinanciamientoBienes2Component,
    ProgramacionFisicaAdicionalComponent,
    ProgramacionPresupuestoAdicionalComponent,
    ReporteOpp9Component,
    ComisionLocalAdicionalComponent,
    ComisionNacionalAdicionalComponent,
    RutasAdicionalComponent,
    BandejaAdicionalComponent,
    FichaAdicionalComponent,
    ObservacionAdicionalComponent,
    BandejaFichaComponent,
    FinanciamientoMensualComponent,
    TopeCanalizadoraComponent,
    ReporteOpp10Component,
    FinanciamientoMensual2Component,
    ReporteOpp11Component,
    TopeIntegralComponent,
    ProgramacionPlazasComponent,
    ImportGastosPlazaComponent,
    ReporteGeneralComponent,
    RepMetasSubdirectivosComponent,
    RepMetasServidoresComponent,
    RepMetasDirectivosComponent,
    ReporteGeneralUaComponent,
    ReporteGeneralDemandaAdiccionalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule, //
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-left"
    }), // ToastrModule added,
    AppRoutingModule,
    TreeModule.forRoot(),
    MDBBootstrapModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
