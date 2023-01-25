export interface AccionInterface {
  id?: number;
  descripcion: string;
  id_producto?: number;
  id_unidad_medida?: number;
  id_proceso?: number;
  id_organo?:number;
  id_organo_ugp?: number;
  nombre_proceso?: string;
  nombre_organo?: string;
  nombre_organo_ugp?: string;
  nombre: string;
  id_estado?:number;
  nombre_estado?:string;
  usuario_registro?:string;
  nombre_usuario?: string;
  id_definicion?: number;
  df1?: string;
  df2?: string;
  df3?: string;
  df4?: string;
  df5?: string;
  df6?: string;
  df7?: string;
  df8?: string;
  cr1?: string;
  cr2?: string;
  cr3?: string;
  cr4?: string;
  cr5?: string;
}
