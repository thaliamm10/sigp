export interface BienesInterface {
  id?: number;
  id_grupo?: string;
  id_familia?: string;
  id_clase?: string;
  id_item?: string;
  nombre: string;
  id_unidad_medida?: number;
  precio?: number;
  id_periodo?: number;
  nombre_usuario?: string;
  id_estado?: number;
  nombre_estado?: string;
  id_ciclo?: number;
  id_etapa?:number;
  trama_bienes?: string;
  id_accion?: number;
  anio?: number;
  id_tipo?:string;
  id_clasificador?:number;
  id_organo?: number;
  canalizado?: number;
  codigo_usuario?: string;
  id_kit?: number;
  adicional?: number;
}
