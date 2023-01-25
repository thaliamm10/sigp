import { Routes } from '@angular/router';
import {AuthActivateService} from "../services/auth.activate";
import {
  ReporteGeneralDemandaAdiccionalComponent
} from "../components/view/reporte-general-demanda-adiccional/reporte-general-demanda-adiccional.component";
import {
  FinanciamientoMensual2Component
} from "../components/view/financiamiento-mensual2/financiamiento-mensual2.component";
import {ReporteGeneralComponent} from "../components/view/reporte-general/reporte-general.component";
import {ReporteGeneralUaComponent} from "../components/view/reporte-general-ua/reporte-general-ua.component";
import {
  FinanciamientoMensualComponent
} from "../components/view/financiamiento-mensual/financiamiento-mensual.component";
import {ObservacionAdicionalComponent} from "../components/view/observacion-adicional/observacion-adicional.component";
import {BandejaFichaComponent} from "../components/view/bandeja-ficha/bandeja-ficha.component";
import {BandejaAdicionalComponent} from "../components/view/bandeja-adicional/bandeja-adicional.component";
import {FichaAdicionalComponent} from "../components/view/ficha-adicional/ficha-adicional.component";
import {ReporteOpp9Component} from "../components/view/reporte-opp9/reporte-opp9.component";
import {
  ReportePresupuestalUgpComponent
} from "../components/view/reporte-presupuestal-ugp/reporte-presupuestal-ugp.component";
import {
  MantenimientosVehiculoComponent
} from "../components/view/mantenimientos-vehiculo/mantenimientos-vehiculo.component";
import {KitsComponent} from "../components/view/kits/kits.component";
import {RutasAdicionalComponent} from "../components/view/rutas-adicional/rutas-adicional.component";
import {RutasComponent} from "../components/view/rutas/rutas.component";
import {ReporteOpp7Component} from "../components/view/reporte-opp7/reporte-opp7.component";
import {ReporteOpp10Component} from "../components/view/reporte-opp10/reporte-opp10.component";
import {ReporteOpp6Component} from "../components/view/reporte-opp6/reporte-opp6.component";
import {ReporteOpp5Component} from "../components/view/reporte-opp5/reporte-opp5.component";
import {ReporteOpp4Component} from "../components/view/reporte-opp4/reporte-opp4.component";
import {ReporteOpp3Component} from "../components/view/reporte-opp3/reporte-opp3.component";
import {ReporteOpp2Component} from "../components/view/reporte-opp2/reporte-opp2.component";
import {ReporteOpp1Component} from "../components/view/reporte-opp1/reporte-opp1.component";
import {ReporteCeplanComponent} from "../components/view/reporte-ceplan/reporte-ceplan.component";
import {UgpOrganoComponent} from "../components/view/ugp-organo/ugp-organo.component";
import {MainTopePresupuestoComponent} from "../components/shared/main-tope-presupuesto/main-tope-presupuesto.component";
import {AprobacionAsignacionComponent} from "../components/view/aprobacion-asignacion/aprobacion-asignacion.component";
import {ActividadOperativaComponent} from "../components/view/actividad-operativa/actividad-operativa.component";
import {FinanciamientoPlazaComponent} from "../components/view/financiamiento-plaza/financiamiento-plaza.component";
import {
  FinanciamientoBienes2Component
} from "../components/view/financiamiento-bienes2/financiamiento-bienes2.component";
import {FinanciamientoBienesComponent} from "../components/view/financiamiento-bienes/financiamiento-bienes.component";
import {
  ProgramacionAsignacionPlazaComponent
} from "../components/view/programacion-asignacion-plaza/programacion-asignacion-plaza.component";
import {
  ProgramacionPresupuestoPlazaComponent
} from "../components/view/programacion-presupuesto-plaza/programacion-presupuesto-plaza.component";
import {
  ProgramacionPresupuestoAdicionalComponent
} from "../components/view/programacion-presupuesto-adicional/programacion-presupuesto-adicional.component";
import {
  ProgramacionPresupuestoAccionComponent
} from "../components/view/programacion-presupuesto-accion/programacion-presupuesto-accion.component";
import {
  ProgramacionFisicaAdicionalComponent
} from "../components/view/programacion-fisica-adicional/programacion-fisica-adicional.component";
import {
  ProgramacionFisicaAccionComponent
} from "../components/view/programacion-fisica-accion/programacion-fisica-accion.component";
import {
  ComisionInternacionalComponent
} from "../components/view/comision-internacional/comision-internacional.component";
import {
  ComisionNacionalAdicionalComponent
} from "../components/view/comision-nacional-adicional/comision-nacional-adicional.component";
import {ComisionNacionalComponent} from "../components/view/comision-nacional/comision-nacional.component";
import {
  ComisionLocalAdicionalComponent
} from "../components/view/comision-local-adicional/comision-local-adicional.component";
import {ComisionLocalComponent} from "../components/view/comision-local/comision-local.component";
import {VehiculosComponent} from "../components/view/vehiculos/vehiculos.component";
import {BienesComponent} from "../components/view/bienes/bienes.component";
import {ReporteOpp8Component} from "../components/view/reporte-opp8/reporte-opp8.component";
import {MetaPresupuestalComponent} from "../components/view/meta-presupuestal/meta-presupuestal.component";
import {MainEfpCadenaComponent} from "../components/shared/main-efp-cadena/main-efp-cadena.component";
import {MainEfpProgramaComponent} from "../components/shared/main-efp-programa/main-efp-programa.component";
import {EfpActividadComponent} from "../components/view/efp-actividad/efp-actividad.component";
import {EfpProductoComponent} from "../components/view/efp-producto/efp-producto.component";
import {EfpProgramaComponent} from "../components/view/efp-programa/efp-programa.component";
import {EfpCategoriaComponent} from "../components/view/efp-categoria/efp-categoria.component";
import {
  AccionEstrategicaDetalleComponent
} from "../components/view/accion-estrategica-detalle/accion-estrategica-detalle.component";
import {AccionEstrategicaComponent} from "../components/view/accion-estrategica/accion-estrategica.component";
import {
  ObjetivoEstrategicoDetalleComponent
} from "../components/view/objetivo-estrategico-detalle/objetivo-estrategico-detalle.component";
import {CicloComponent} from "../components/view/ciclo/ciclo.component";
import {ObjetivoEstrategicoComponent} from "../components/view/objetivo-estrategico/objetivo-estrategico.component";
import {MainMarcoLogicoComponent} from "../components/shared/main-marco-logico/main-marco-logico.component";
import {ProcesoComponent} from "../components/view/proceso/proceso.component";
import {UgpComponent} from "../components/view/ugp/ugp.component";
import {OrganoComponent} from "../components/view/organo/organo.component";
import {ProgramacionPlazasComponent} from "../components/view/programacion-plazas/programacion-plazas.component";
import {ImportGastosPlazaComponent} from "../components/view/import-gastos-plaza/import-gastos-plaza.component";
import {RepMetasServidoresComponent} from "../components/view/rep-metas-servidores/rep-metas-servidores.component";
import {
  RepMetasSubdirectivosComponent
} from "../components/view/rep-metas-subdirectivos/rep-metas-subdirectivos.component";
import {RepMetasDirectivosComponent} from "../components/view/rep-metas-directivos/rep-metas-directivos.component";
import {MarcoLogicoComponent} from "../components/view/marco-logico/marco-logico.component";

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'marco-logico/:id/:nombre/:nombre_proceso/:nombre_responsable',
    component: MarcoLogicoComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'rep-metas-directivos',
    component: RepMetasDirectivosComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'rep-metas-subdirectivos',
    component: RepMetasSubdirectivosComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'rep-metas-servidores',
    component: RepMetasServidoresComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'programacion-gastos-plaza',
    component: ImportGastosPlazaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'programacion-meta-plaza',
    component: ProgramacionPlazasComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'organo',
    component: OrganoComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'ugp',
    component: UgpComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'procesos',
    component: ProcesoComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'home-marco-logico',
    component: MainMarcoLogicoComponent
    canActivate: [AuthActivateService]
  },
  {
    path: 'objetivo-estrategico',
    component: ObjetivoEstrategicoComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'mantenimiento-ciclo',
    component: CicloComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'detalle-objetivo-estrategico/:id_oe',
    component: ObjetivoEstrategicoDetalleComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'accion-estrategica',
    component: AccionEstrategicaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'detalle-accion-estrategica/:id_ae',
    component: AccionEstrategicaDetalleComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'efp-categoria',
    component: EfpCategoriaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'efp-programa',
    component: EfpProgramaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'efp-producto',
    component: EfpProductoComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'efp-actividad',
    component: EfpActividadComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'main-efp-programa',
    component: MainEfpProgramaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'main-efp-cadena',
    component: MainEfpCadenaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'meta-presupuestal',
    component: MetaPresupuestalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-presupuestal',
    component: ReporteOpp8Component,
    canActivate: [AuthActivateService]
  },
  {
    path: 'bienes',
    component: BienesComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'vehiculos',
    component: VehiculosComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'comision-local',
    component: ComisionLocalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'comision-local-adicional',
    component: ComisionLocalAdicionalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'comision-nacional',
    component: ComisionNacionalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'comision-nacional-adicional',
    component: ComisionNacionalAdicionalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'comision-internacional',
    component: ComisionInternacionalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'programacion-fisica-acciones',
    component: ProgramacionFisicaAccionComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'programacion-fisica-adicional',
    component: ProgramacionFisicaAdicionalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'programacion-presupuesto-acciones',
    component: ProgramacionPresupuestoAccionComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'programacion-presupuesto-adicional',
    component: ProgramacionPresupuestoAdicionalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'programacion-plaza',
    component: ProgramacionPresupuestoPlazaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'programacion-asignacion',
    component: ProgramacionAsignacionPlazaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'financiamiento-bienes',
    component: FinanciamientoBienesComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'financiamiento-canalizado',
    component: FinanciamientoBienes2Component,
    canActivate: [AuthActivateService]
  },
  {
    path: 'financiamiento-personal',
    component: FinanciamientoPlazaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'actividad-operativa',
    component: ActividadOperativaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'aprobacion-asignacion',
    component: AprobacionAsignacionComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'tope-presupuesto',
    component: MainTopePresupuestoComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'ugp-organo',
    component: UgpOrganoComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-ceplan',
    component: ReporteCeplanComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-programacion-fisica-mensual',
    component: ReporteOpp1Component,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-programacion-personal-mensual',
    component: ReporteOpp2Component,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-programacion-presupuestal-mensual',
    component: ReporteOpp3Component,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-programacion-comision-mensual',
    component: ReporteOpp4Component,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-programacion-rutas-mensual',
    component: ReporteOpp5Component,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-programacion-bienes',
    component: ReporteOpp6Component,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-financimiento-bienes-mensual',
    component: ReporteOpp10Component,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-programacion-vehiculos',
    component: ReporteOpp7Component,
    canActivate: [AuthActivateService]
  },
  {
    path: 'rutas',
    component: RutasComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'rutas-adicional',
    component: RutasAdicionalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'kits',
    component: KitsComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'mantenimiento-vehiculo',
    component: MantenimientosVehiculoComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-ugp',
    component: ReportePresupuestalUgpComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-ml',
    component: ReporteOpp9Component,
    canActivate: [AuthActivateService]
  },

  {
    path: 'ficha-adicional/:id',
    component: FichaAdicionalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'bandeja-adicional',
    component: BandejaAdicionalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'bandeja-ficha',
    component: BandejaFichaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'observacion-adicional',
    component: ObservacionAdicionalComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'financiamiento-mensual',
    component: FinanciamientoMensualComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'financiamiento-canalizado-mensual',
    component: FinanciamientoMensual2Component,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-general',
    component: ReporteGeneralComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-general-ua',
    component: ReporteGeneralUaComponent,
    canActivate: [AuthActivateService]
  },
  {
    path: 'reporte-general-adicional',
    component: ReporteGeneralDemandaAdiccionalComponent,
    canActivate: [AuthActivateService]
  },



  // {
  //   path: 'builder',
  //   loadChildren: () =>
  //     import('./builder/builder.module').then((m) => m.BuilderModule),
  // },
  // {
  //   path: 'crafted/pages/profile',
  //   loadChildren: () =>
  //     import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  //   data: { layout: 'light-sidebar' },
  // },
  // {
  //   path: 'crafted/account',
  //   loadChildren: () =>
  //     import('../modules/account/account.module').then((m) => m.AccountModule),
  //   data: { layout: 'dark-header' },
  // },
  // {
  //   path: 'crafted/pages/wizards',
  //   loadChildren: () =>
  //     import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  //   data: { layout: 'light-header' },
  // },
  // {
  //   path: 'crafted/widgets',
  //   loadChildren: () =>
  //     import('../modules/widgets-examples/widgets-examples.module').then(
  //       (m) => m.WidgetsExamplesModule
  //     ),
  //   data: { layout: 'light-header' },
  // },
  // {
  //   path: 'apps/chat',
  //   loadChildren: () =>
  //     import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  //   data: { layout: 'light-sidebar' },
  // },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
