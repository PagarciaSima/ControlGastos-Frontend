import { EstadoDto } from "./estado-dto";
import { ProveedorDto } from "./proveedor-dto";

export interface GastoFijoDto {
    id?: number,
    nombre: string,
    monto: number,
    proveedoresId: ProveedorDto,
    estadosId: EstadoDto,
    fecha: Date
}
