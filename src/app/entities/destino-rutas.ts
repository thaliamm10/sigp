export interface DestinoRutasInterface {
    id?: number;
    id_mantenimiento?: number;
    tiempo_mantenimiento?: number;
    id_estacion?: string;
    id_categoria?: number;
    id_ruta?: number;
    id_estado?:number;
    nombre_estado?:string;
    id_departamento_d?: string;
    id_provincia_d?: string;
    id_distrito_d?: string;
    nombre_departamento_d?: string;
    nombre_provincia_d?: string;
    nombre_distrito_d?: string;
    tipo_destino?: number;
    nombre_tipo_destino?: string;
    kilometro?: number;
    id_tipo_movilidad?:number;
    id_tipo_carretera?:number;
    id_vehiculo?:number;
    id_tipo_transporte?:number;
    orden?:number;
    codigo_categoria?:string;
    tiempo_traslado?: number;
}
