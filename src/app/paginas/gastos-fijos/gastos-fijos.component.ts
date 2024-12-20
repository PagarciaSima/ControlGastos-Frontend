import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { FooterComponent } from '../../componentes/footer/footer.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [MenuComponent, FooterComponent, HeaderComponent, FormsModule, RouterLink],
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css'
})
export class GastosFijosComponent implements OnInit{
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  modalCrear() {

  }
}
