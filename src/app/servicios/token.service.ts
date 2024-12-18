import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../interface/login-response-dto';
import { environment } from '../../environments/environment.development';
import { LoginRequestDto } from '../interface/login-request-dto';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private _http: HttpClient) { }

  getToken(modelo: LoginRequestDto): Observable<LoginResponseDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<LoginResponseDto>(
      `${environment.api}/auth/login`, 
      modelo, 
      { headers }
    );
  }
}
