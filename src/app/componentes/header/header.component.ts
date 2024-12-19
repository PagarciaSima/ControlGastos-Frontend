import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import "dayjs/locale/es"
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  hora!: Date;
  nombre: string = "";
  perfil: string = "";

  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.getHoraActual();
    this.nombre = this.authService.getNombre();
    this.perfil = this.authService.getPerfil();
  }

  getFechaActual() {
    dayjs.locale('es');
    let fecha = new Date();
    return dayjs().format('dddd, D [de] MMMM [de] YYYY');  
  }

  getHoraActual() {
    this.hora = new Date();
    setInterval(() => {
      this.hora = new Date();
    }, 1000)
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }
}
