import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2'; // npm i sweetalert2
import { LoginRequestDto } from '../../interface/login-request-dto';
import { TokenService } from '../../servicios/token.service';
import { CookieService } from 'ngx-cookie-service'; // npm i ngx-cookie-service
import { LoginResponseDto } from '../../interface/login-response-dto';
import { Router } from '@angular/router';
import { ComunService } from '../../servicios/comun.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: LoginRequestDto = {
    correo: "",
    password: ""
  };

  constructor(
    private tokenService: TokenService,
    private cookieService: CookieService,
    private comunService: ComunService,
    private router: Router
  ) { }

  validaUsuario(usuario: LoginRequestDto): boolean {
    if (!this.usuario.correo) {
      this.comunService.mostrarError('El campo E-mail es obligatorio');
      return false;
    }

    if (!this.usuario.correo || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.usuario.correo)) {
      this.comunService.mostrarError('Por favor ingresa un correo electrónico válido');
      return false;
    }

    if (!this.usuario.password) {
      this.comunService.mostrarError('El campo Password es obligatorio');
      return false;
    }

    if (this.usuario.password.length < 6) {
      this.comunService.mostrarError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  }

  setCookies(data: LoginResponseDto) {
    this.cookieService.set('control_gastos_token', data.token, 1);
    this.cookieService.set('control_gastos_nombre', data.nombre, 1);
    this.cookieService.set('control_gastos_id', data.id.toString(), 1);
    this.cookieService.set('control_gastos_perfil', data.perfil, 1);
    this.cookieService.set('control_gastos_perfil_id', data.perfilId.toString(), 1);
  }

  enviar() {
    if (this.validaUsuario(this.usuario)) {
      this.tokenService.getToken(this.usuario).subscribe({
        next: (data) => {
          this.setCookies(data);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.comunService.mostrarError('Las credenciales no son válidas');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2500);
        }
      });
    }
  };

}
