import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { FooterComponent } from '../../componentes/footer/footer.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import dayjs from 'dayjs';
import { CommonModule } from '@angular/common';
import { GastoFijoService } from '../../servicios/gasto-fijo.service';
import { GastoFijoDto } from '../../interface/gasto-fijo-dto';
import { AuthService } from '../../servicios/auth.service';
import { ComunService } from '../../servicios/comun.service';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [MenuComponent, FooterComponent, HeaderComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css'
})
export class GastosFijosComponent implements OnInit{
  
  fecha!: Date;
  gastosFijos: GastoFijoDto[] = [];

  constructor(
    private gastoFijoService: GastoFijoService,
    private authService: AuthService,
    private comunService: ComunService
  ) {
    this.fecha = new Date();
  }

  ngOnInit(): void {
    this.getGastosFijos(this.authService.getToken());
  }

  modalCrear() {

  }

  modalEditar(gastoFijo: GastoFijoDto) {

  }

  eliminar(id: number) {
    
  }

  getGastosFijos(token: string) {
    this.gastoFijoService.getGastosFijos(token).subscribe({
      next: (data) => {
        this.gastosFijos = data;
      }, error: (error) => {
        this.comunService.mostrarError('Ha ocurrido un error al recuperar el listado de gastos: ' + error.message);
      }
    });
  }

  getMesActual() {
    let date = new Date();
    dayjs.locale('es');
    return dayjs(date).format('MMMM');
  }
}
