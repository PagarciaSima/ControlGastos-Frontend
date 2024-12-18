import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2'; // npm i sweetalert2
import { LoginRequestDto } from '../../interface/login-request-dto';
import { TokenService } from '../../servicios/token.service';
import { CookieService } from 'ngx-cookie-service'; // npm i ngx-cookie-service

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

  constructor(private tokenService: TokenService) {}

  private mostrarError(mensaje: string) {
    swal.fire({
      icon: 'error',
      timer: 2000,
      title: 'Error',
      text: mensaje
    });
  }

  validaUsuario(usuario: LoginRequestDto): boolean {
    if (!this.usuario.correo) {
      this.mostrarError('El campo E-mail es obligatorio');
      return false;
    }

    if (!this.usuario.correo || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.usuario.correo)) {
      this.mostrarError('Por favor ingresa un correo electrónico válido');
      return false;
    }

    if (!this.usuario.password) {
      this.mostrarError('El campo Password es obligatorio');
      return false;
    }

    if (this.usuario.password.length < 6) {
      this.mostrarError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  }

  enviar() {
    if (this.validaUsuario(this.usuario)) {
      this.tokenService.getToken(this.usuario).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          this.mostrarError('Las credenciales no son válidas');
          setTimeout(() => {
            window.location.href = "/login";
          }, 2500);
        }
      });
    }
  }
}
