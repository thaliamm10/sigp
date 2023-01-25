export interface ProductoPresupuestalInterface {
  id?: number;
  codigo: string;
  nombre: string;
  estado: number;
  id_programa: number;
  codigo_programa?: string;
  nombre_programa?: string;
  id_tipo?: number;
  nombre_tipo?: string;
  usuario_registro?: string;
  nombre_usuario?: string;
  fecha_registro?: string;
}
