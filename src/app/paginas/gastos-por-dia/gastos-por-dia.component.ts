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
import { GastoDiaModel } from '../../interface/gasto-dia-model';
import { GastoPorDiaService } from '../../servicios/gasto-por-dia.service';
import { Observable } from 'rxjs/internal/Observable';
import { GastoDiaDto } from '../../interface/gasto-dia-dto';

@Component({
  selector: 'app-gastos-por-dia',
  standalone: true,
  imports: [MenuComponent, FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './gastos-por-dia.component.html',
  styleUrl: './gastos-por-dia.component.css'
})
export class GastosPorDiaComponent implements OnInit{

  fecha!: Date;
  contPagado: number = 0;
  contNoPagado: number = 0;
  gastosPorDia: GastoDiaModel[] = [];

  constructor(
    private authService: AuthService,
    private comunService: ComunService,
    private router: Router,
    private gastoPorDiaService: GastoPorDiaService
  ) {
    this.fecha = new Date();
  }

  ngOnInit(): void {
    this.getGastosPorDia();
  }

  getMesActual() {
    let date = new Date();
    dayjs.locale('es');
    return dayjs(date).format("MMMM");
  }

  getGastosPorDia(): void {
     this.gastoPorDiaService.getGastosPorDia(this.authService.getToken()).subscribe({
      next: (data) => {
        this.gastosPorDia = data;
      }, error: (error) => {
        this.comunService.mostrarError("Ha ocurrido un error al recuperar los gastos diarios del mes: " + error.error)
      }
    });
  }

  modalCrear() {

  }

  modalEditar( gasto:GastoDiaModel ) {

  }

  cerrar() {

  }

  eliminar(id: number) {
    
  }

  enviar() {

  }
}
