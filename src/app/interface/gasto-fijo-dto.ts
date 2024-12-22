import { EstadoDto } from "./estado-dto";

export interface GastoFijoDto {
    nombre: string,
    monto: number,
    proveedoresId?: number,
    estadosId?: number,
    fecha?: Date  
}
