import { EstadoDto } from "./estado-dto";
import { ProveedorDto } from "./proveedor-dto";

export interface GastoFijoDto {
    nombre: string,
    monto: number,
    proveedoresId: number,
    estadosId: number,
}
