import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {

}
