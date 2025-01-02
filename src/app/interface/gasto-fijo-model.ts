import { EstadoDto } from "./estado-dto";

export interface GastoFijoModel {
    id?: number,
    nombre: string,
    monto?: number,
    proveedoresId?: { id: 0, nombre: '' },
    estadosId?: EstadoDto,
    fecha?: Date  
}
