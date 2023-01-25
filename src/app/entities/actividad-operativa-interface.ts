export interface ActividadOperativaInterface {
  id?: number;
  codigo: string;
  descripcion?: string;
  id_ae?: number;
  id_oe?: number;
  id_estado?: string;
  id_ao?: number;
  id_unidad_medida?: number;
  id_organo?: number;
  trama_producto?: string;
  objetivo?: string;
  atributo?: string;
  indicador?: string;
  formula?: string;
  evidencia?: string;
  producto?: string;
  id_etapa?: number;
  id_ciclo?: number;
}
