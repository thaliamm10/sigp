export interface ComisionInterface {

    id_ugp?:number;
    id_producto?: number;
    id_accion?: number;
    tipo?: number;

    id?: number;
    id_tipo_viatico?: number;
    cantidad_persona?: number;
    fecha_salida?: string;
    hora_salida?:string;
    fecha_retorno?: string;
    hora_retorno?:string;
    id_estado?:number;
    nombre_estado?:string;
    id_departamento?: number;
    id_provincia?: number;
    id_distrito?: number;
    ditancia?: number;
    id_tipo_comision?: number;

    id_organo?:number;
    nombre_organo?:string;
    num_destino?:number;
    codigo_empleado?:string;

    tiene_viatico?:number;
    id_vehiculo?:number;
    nombre_placa?:number;

    adicional ?: number;
}