export interface ProgramaPresupuestalInterface {
    codigo: string;
    nombre: string;    
    id?: number;
    estado?: number;
    usuario_registro?:string;
    nombre_usuario?:string;
    fecha_registro?: string;
    id_categoria: number;
    codigo_categoria?: string;
    nombre_categoria?: string;
  }
  