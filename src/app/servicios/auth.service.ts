import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2'; // npm i sweetalert2

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('control_gastos_token');
    return !!token; 
  }

  cerrarSesion() {
    swal.fire({
      position: 'top-end',
      title: '¿Realmente desea cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cookieService.deleteAll();
        this.router.navigate(['/login']);
      }
    });
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
