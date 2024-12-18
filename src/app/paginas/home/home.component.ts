import { Component } from '@angular/core';
import { FooterComponent } from "../../componentes/footer/footer.component";
import { HeaderComponent } from '../../componentes/header/header.component';
import { MenuComponent } from "../../componentes/menu/menu.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
