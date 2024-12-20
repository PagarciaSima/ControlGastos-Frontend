import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { HeaderComponent } from '../../componentes/header/header.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenuComponent, FooterComponent, HeaderComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

}
