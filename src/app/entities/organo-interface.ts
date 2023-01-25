export interface OrganoInterface {
  id?: number;
  codigo?: string;
  nombre?: string;
  descripcion?: string;
  nombre_corto?: string;
  lista_ambito?: any;
  id_estado?: number;
  nombre_estado?: string;
  id_responsable?: string;
  nombre_responsable?: string;
  id_departamento?:string;
  canalizadora?:number;
}
