import { ProveedorDto } from "./proveedor-dto";

export interface GastoDiaModel {
    
    id?: number,
    neto?: number,
    iva?: number,
    total?: number,
    fecha: Date,
    descripcion: string ,
    proveedoresId?: { id: 0, nombre: '' },
    
}
