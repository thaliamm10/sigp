export interface AccionEstrategicaInterface {
  codigo: string;
  descripcion: string;
  id: number;
  id_estado?: number;
  nombre_estado?: string;
  id_oe: number;
  nombre_apertura?: string;
  fecha_registro?: string;
  usuario_registro?: string;
  nombre_usuario?: string;
  nombre_indicador?: string;
  justificacion?: string;
  limitacion?: string;
  metodo_calculo?: string;
  parametro_medicion?: string;
  sentido_esperado?: string;
  fuentes_datos?: string;
  id_organo?: number;
  nombre_organo?: string;
  trama_logros_ae?: string;
  lista_logros?: any;
  anio_base?: number;
  valor_base?: number;
  anio_actual?: number;
  valor_actual?: number;

  id_ae?: number;
  codigo_ae?: string;
  nombre_ae?: string;

  atributo?: string;
  objetivo?: string;
  producto?: string;
  evidencia?: string;
  indicador?: string;
}
