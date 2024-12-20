import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProveedorDto } from '../interface/proveedor-dto';
import { environment } from '../../environments/environment.development';
import { ComunService } from './comun.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(
    private _httclient: HttpClient,
    private _comunService: ComunService
  ) { }


  getProveedores(token: string): Observable<ProveedorDto[]> {
    const headers = this._comunService.getHeaders(token);
    return this._httclient.get<ProveedorDto[]>(`http://localhost:8081/api/v1/proveedores`, { headers });
  }

  addProveedor(proveedor: {nombre: string}, token: string): Observable<string> {
    const headers = this._comunService.getHeaders(token);
    return this._httclient.post<string>(`${environment.api}/v1/proveedores`, proveedor, { headers });
  }

  editProveedor(proveedor: {nombre: string}, token: string, id: number): Observable<string> {
    const headers = this._comunService.getHeaders(token);
    return this._httclient.put<string>(`${environment.api}/v1/proveedores/${id}`, proveedor, { headers });
  }
}
