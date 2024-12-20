import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProveedorDto } from '../interface/proveedor-dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private _httclient: HttpClient) { }

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getProveedores(token: string): Observable<ProveedorDto[]> {
    const headers = this.getHeaders(token);
    return this._httclient.get<ProveedorDto[]>(`http://localhost:8081/api/v1/proveedores`, { headers });
  }

  addProveedor(proveedor: {nombre: string}, token: string): Observable<ProveedorDto> {
    const headers = this.getHeaders(token);
    return this._httclient.post<ProveedorDto>(`${environment.api}/v1/proveedores`, proveedor, { headers });
  }

  editProveedor(proveedor: {nombre: string}, token: string, id: number) {
    const headers = this.getHeaders(token);
    return this._httclient.put<ProveedorDto>(`${environment.api}/v1/proveedores/${id}`, proveedor, { headers });
  }
}
