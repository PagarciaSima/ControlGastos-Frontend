import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('control_gastos_token');
    return !!token; 
  }

  getId() {
    return this.cookieService.get('control_gastos_id');
  }

  getNombre() {
    return this.cookieService.get('control_gastos_nombre');
  }

  getPerfil() {
    return this.cookieService.get('control_gastos_perfil');
  }

  getPerfilId() {
    return this.cookieService.get('control_gastos_perfil_id');
  }

  getToken() {
    return this.cookieService.get('control_gastos_token');
  }
}
