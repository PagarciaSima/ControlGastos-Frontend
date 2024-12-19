import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2'; // npm i sweetalert2

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);  // Inyectar el CookieService
  const router = inject(Router);  // Inyectar el Router

  const token = cookieService.get('control_gastos_token');  

  if (!token) {
    // Si no hay token, muestra la alerta y redirige al login
    swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Por favor, inicie sesión para acceder a esta página.',
      timer: 2500
    }).then(() => {
      // Redirige al login después de mostrar la alerta
      router.navigate(['/login']);
    });

    // Bloquea el acceso a la ruta
    return false;
  }

  // Si existe el token, permite acceder a la ruta
  return true;
};
