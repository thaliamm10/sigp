export interface DestinoInterface {
    id?: number;
    id_comision?: number;
    id_estado?:number;
    nombre_estado?:string;
    id_departamento?: string;
    id_provincia?: string;
    id_distrito?: string;
    nombre_departamento?: string;
    nombre_provincia?: string;
    nombre_distrito?: string;
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
    tarifa?:number;

    placa?: string;

    id_ruta?: number;
}