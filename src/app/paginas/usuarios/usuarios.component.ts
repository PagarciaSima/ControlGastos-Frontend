import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioDto } from '../../interface/usuario-dto';
import { ComunService } from '../../servicios/comun.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenuComponent, FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  usuarios: UsuarioDto[] = [];

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private comunService: ComunService
  ) {

  }
  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios(this.authService.getToken()).subscribe({
      next: (data) => {
        this.usuarios = data;
      }, error: (error) => {
        this.comunService.mostrarError('Ha ocurrido un error al recuperar los usuarios: ' + error.message);
      }
    });
  }

  modalCrear() {

  }

  modalEditar(usuario: UsuarioDto) {
    throw new Error('Method not implemented.');
  }
  
}
