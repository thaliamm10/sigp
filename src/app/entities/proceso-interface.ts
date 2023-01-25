export interface ProcesoInterface {
  id?: number;
  codigo: string;
  descripcion: string;
  id_apertura: number;
  id_proceso: number;
  nombre: string;
  nivel?:number;
  fecha_registro?: string;
  id_estado?:number;
  nombre_estado?:string;
  usuario_registro?: string;
  nombre_usuario?:string;
}
