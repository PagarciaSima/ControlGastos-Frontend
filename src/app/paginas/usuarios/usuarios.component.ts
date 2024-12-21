import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { AuthService } from '../../servicios/auth.service';
import { ComunService } from '../../servicios/comun.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { ProveedorDto } from '../../interface/proveedor-dto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UsuarioDto } from '../../interface/usuario-dto';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenuComponent, FooterComponent, HeaderComponent, RouterModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  usuarios: UsuarioDto[] = [];
  @ViewChild("myModalConf", { static: false }) myModalConf!: TemplateRef<UsuarioDto>;
  modalTitle: string = "";
  modeloUsuario: UsuarioDto;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private comunService: ComunService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.modeloUsuario = {
      nombre: "",
      correo: "",
      password: "",
    }
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
    this.modeloUsuario = { nombre: "", correo: "", password: "" }; // Limpiar modelo
    this.modalService.open(this.myModalConf, { size: 'lg' });
    this.modalTitle = 'Crear';
  }

  modalEditar(usuario: UsuarioDto) {
    this.modeloUsuario = { ...usuario }; // Limpiar modelo
    this.modalService.open(this.myModalConf, { size: 'lg' });
    this.modalTitle = 'Editar';
  }
  
  cerrar() {
    this.modalService.dismissAll();
  }

  enviar() {

    if ("Crear" == this.modalTitle) {
      this.usuarioService.addUsuario(
        { nombre: this.modeloUsuario.nombre.trim(), correo: this.modeloUsuario.correo.trim(), password: this.modeloUsuario.password.trim() }
        , this.authService.getToken()
      ).subscribe({
        next: (data) => {
          this.comunService.mostrarExito('Usuario creado con éxito').then(() => {
            this.getUsuarios();
            this.modalService.dismissAll();
            this.router.navigateByUrl('/usuarios');
          });
        }, error: (error) => {
          this.comunService.mostrarError('Ha ocurrido un error al crear el usuario: ' + error.message);
        }
      });
    } else if ("Editar" == this.modalTitle) {
      this.usuarioService.editUsuario(
        { nombre: this.modeloUsuario.nombre.trim(), correo: this.modeloUsuario.correo.trim(), password: this.modeloUsuario.password.trim() },
        this.authService.getToken(),
        this.modeloUsuario.id!
      ).subscribe({
        next: (data) => {
          this.comunService.mostrarExito('Usuario actualizado con éxito').then(() => {
            this.getUsuarios();
            this.modalService.dismissAll();
            this.router.navigateByUrl('/usuarios');
          });
        }, error: (error) => {
          this.comunService.mostrarError('Ha ocurrido un error al actualizar el usuario: ' + error.message);
        }
      });
    }
  }
}
