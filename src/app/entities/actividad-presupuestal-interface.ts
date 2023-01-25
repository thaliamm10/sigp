export interface ActividadPresupuestalInterface {
  id?: number;
  codigo: string;
  nombre: string;
  estado: number;
  id_producto: number;
  id_tipo:number;
  codigo_producto?: string;
  nombre_producto?: string;
  nombre_tipo?: string;
  fecha_registro?: string;
  usuario_registro?: string;
  nombre_usuario?: string;  
}
