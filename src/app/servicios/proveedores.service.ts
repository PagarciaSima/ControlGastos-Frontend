import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProveedorDto } from '../interface/proveedor-dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private httclient: HttpClient) { }

  getProveedores(token:string): Observable<ProveedorDto[]> {  

    return this.httclient.get<ProveedorDto[]>(`http://localhost:8081/api/v1/proveedores`, { 'headers': {'content-type':
       'application/json', 'Authorization': `Bearer ${token}`} });
  }
}
