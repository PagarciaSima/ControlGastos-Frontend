import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { AuthService } from '../../servicios/auth.service';
import { ComunService } from '../../servicios/comun.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import dayjs from 'dayjs';
import swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gastos-por-dia',
  standalone: true,
  imports: [MenuComponent, FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './gastos-por-dia.component.html',
  styleUrl: './gastos-por-dia.component.css'
})
export class GastosPorDiaComponent implements OnInit{

  public fecha!: Date;
  public contPagado: number = 0;
  public contNoPagado: number = 0;

  constructor(
    private authService: AuthService,
    private comunService: ComunService,
    private router: Router
  ) {
    this.fecha = new Date();
  }

  ngOnInit(): void {
  }

  getMesActual() {
    let date = new Date();
    dayjs.locale('es');
    return dayjs(date).format("MMMM");
  }

  modalCrear() {

  }

  modalEditar() {

  }

  cerrar() {

  }

  enviar() {

  }
}
