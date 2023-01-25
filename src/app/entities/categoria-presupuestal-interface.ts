export interface CatagoriaPresupuestalInterface {
  codigo: string;
  nombre: string;
  id_ciclo: number;
  id?: number;
  estado?: number;
  usuario_registro?:string;
  nombre_usuario?:string;
  fecha_registro?: string;
  anio_ciclo?: number;
  nombre_apertura?: string;
  id_etapa ?: number;
}
