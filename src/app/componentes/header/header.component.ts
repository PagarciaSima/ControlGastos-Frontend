import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import "dayjs/locale/es"

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  hora!: Date;

  ngOnInit(): void {
    this.getHoraActual();
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
}
