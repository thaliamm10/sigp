export interface MetaxAoInterface {
    id?: number,
    sec_func?: string,
    id_categoria?:number;
    id_programa?:number;
    id_producto?:number;
    id_actividad?:number;
    id_funcion?:number;
    id_division_funcional?:number;
    id_grupo_funcional?:number;
    id_finalidad?:number;

    nombre_categoria?:string;
    nombre_programa?:string;
    nombre_producto?:string;
    nombre_actividad?:string;
    nombre_funcion?:string;
    nombre_division_funcional?:string;
    nombre_grupo_funcional?:string;
    nombre_finalidad?:string;

    id_departamento?:string;
    id_provincia?:string;
    id_distrito?:string;
    trama_ao?: string;
    id_ao?: number,
    id_meta?: number,
    estado?: number,
    fecha_registro?: string,
    id_unidad?: number;
    nombre_unidad?: string;
    id_organo?:number;
    nombre_ao?: string;
    estdo?: number;
}
