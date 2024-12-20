import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunService } from './comun.service';
import { Observable } from 'rxjs';
import { UsuarioDto } from '../interface/usuario-dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private _httpClient: HttpClient,
    private _comunService: ComunService
  ) { }

  getUsuarios(token: string): Observable<UsuarioDto[]> {
    const headers = this._comunService.getHeaders(token);
    return this._httpClient.get<UsuarioDto[]>(`${environment.api}/v1/usuarios`, { headers });
  }

  addUsuario(usuario: UsuarioDto, token: string): Observable<string> {
    const headers = this._comunService.getHeaders(token);
    return this._httpClient.post<string>(`${environment.api}/v1/usuarios`, usuario, { headers })
  }
}
