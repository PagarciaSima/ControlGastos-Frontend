import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2'; // npm i sweetalert2

export const adminGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);  // Inyectar el CookieService
  const router = inject(Router);  // Inyectar el Router

  const perfil_id = cookieService.get('control_gastos_perfil_id');  

  if (perfil_id !== '1') {
    // Si el perfil no es admin, muestra la alerta y redirige
    return swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'No dispone del Rol de administrador y no tiene permisos para acceder a la página',
      timer: 3500
    }).then(() => {
      // Redirige al login después de mostrar la alerta
      router.navigate(['/']);
      return false;  // Bloquea el acceso
    });
  }

  // Si el perfil es correcto, permite acceder a la ruta
  return true;
};
