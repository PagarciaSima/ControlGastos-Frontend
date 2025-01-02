import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunService } from '../comunService/comun.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UsuarioDto } from '../../interface/usuario-dto';

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
    return this._httpClient.post<string>(`${environment.api}/v1/usuario`, usuario, { headers })
  }

  editUsuario(usuario: UsuarioDto, token: string, id: number): Observable<string> {
    const headers = this._comunService.getHeaders(token);
    return this._httpClient.put<string>(`${environment.api}/v1/usuario/${id}`, usuario, { headers })
  }
}
