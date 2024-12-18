import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import dayjs from 'dayjs';
import "dayjs/locale/es"

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  getFechaActual() {
    dayjs.locale('es');
    let fecha = new Date();
    return dayjs().format('dddd, D [de] MMMM [de] YYYY');  
  }
}
