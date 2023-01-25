export interface RutasInterface {

    id?: number;
    nombre_ruta: string;
    estado?: number;
    cantidad_persona?: number;
    id_organo?: number;
    codigo_organo?:string;
    id_accion?: number;
    nombre_organo?: string;
    nombre_accion?: string;
    id_ugp?: number;
    nombre_ugp?: string;
    id_producto?: number;
    nombre_producto?: string;
    id_usuario?: number;
    tipo_transporte?: number;
    transporte?:string;
    tipo_pista?: number;
    fecha_salida?: string;
    hora_salida?: string;
    tiempo_servicio?: number;
    tiempo_traslado?: number;
    otros_servicio?: number;
    nombre_estado?: string;
    id_departamento?: string;
    id_provincia?: string;
    id_distrito?: string;
    nombre_departamento?: string;
    nombre_provincia?: string;
    nombre_distrito?: string;
    kit?: number;
    peajes?:number;
    adicional : number;
}
