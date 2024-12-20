import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { FooterComponent } from '../../componentes/footer/footer.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import dayjs from 'dayjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [MenuComponent, FooterComponent, HeaderComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css'
})
export class GastosFijosComponent implements OnInit{
  
  fecha!: Date;

  constructor() {
    this.fecha = new Date();
  }

  ngOnInit(): void {
  }

  modalCrear() {

  }

  getMesActual() {
    let date = new Date();
    dayjs.locale('es');
    return dayjs(date).format('MMMM');
  }
}
