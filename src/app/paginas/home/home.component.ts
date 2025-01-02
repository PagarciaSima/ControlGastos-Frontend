import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../componentes/footer/footer.component";
import { HeaderComponent } from '../../componentes/header/header.component';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { GastoFijoService } from '../../servicios/gastoFijo/gasto-fijo.service';
import { AuthService } from '../../servicios/authService/auth.service';
import { ComunService } from '../../servicios/comunService/comun.service';
import { GastoPorDiaService } from '../../servicios/gastoDia/gasto-por-dia.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MenuComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  fecha: Date;
  gastosFijosTotal: number;
  gastosPorDiaTotal: number;

  constructor(
    private gastosFijosService: GastoFijoService,
    private authService: AuthService,
    private comunService: ComunService,
    private gastosPorDiaService: GastoPorDiaService
  ) {
    this.fecha = new Date();
    this.gastosFijosTotal = 0;
    this.gastosPorDiaTotal = 0;
  }

  ngOnInit(): void {
    this.getGastosFijos();
    this.getGastosPorDia();
  }

  getMesActual() {
    let date = new Date();
    dayjs.locale('es');
    return dayjs(date).format("MMMM");
  }

  getGastosFijos() {
    this.gastosFijosService.getGastosFijos(this.authService.getToken()).subscribe({
      next: gastos => {
        let pagado = 0;
        let noPagado = 0;
        for (let gasto of gastos) {
          if (gasto.estadosId?.id == 3) {
            pagado += gasto.monto ?? 0;
          } else if (gasto.estadosId?.id == 4) {
            noPagado += gasto.monto ?? 0;
          }
        }
        this.gastosFijosTotal = pagado - noPagado;
      }, error: err => {
        this.comunService.mostrarError("Ha ocurrido un error al recuperar los gastos fijos")
      }
    });
  }

  getGastosPorDia() {
    this.gastosPorDiaService.getGastosPorDia(this.authService.getToken()).subscribe({
      next: gastos => {
        let sum = 0;
        for (let gasto of gastos) {
          this.gastosPorDiaTotal += gasto.total ?? 0;      
        }
      }, error: err => {
        this.comunService.mostrarError("Ha ocurrido un error al recuperar los gastos por día")
      }
    });
  }
}
