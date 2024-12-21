import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import dayjs from 'dayjs';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { GastoFijoDto } from '../../interface/gasto-fijo-dto';
import { AuthService } from '../../servicios/auth.service';
import { ComunService } from '../../servicios/comun.service';
import { GastoFijoService } from '../../servicios/gasto-fijo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedorDto } from '../../interface/proveedor-dto';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { GastoFijoModel } from '../../interface/gasto-fijo-model';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [MenuComponent, FooterComponent, HeaderComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css'
})
export class GastosFijosComponent implements OnInit{
  
  fecha!: Date;
  gastosFijos: GastoFijoModel[] = [];
  proveedoresList: ProveedorDto[] = [];
  @ViewChild("myModalConf", { static: false }) myModalConf!: TemplateRef<GastoFijoDto>;
  modalTitle: string = "";
  modeloFormGasto: GastoFijoDto;

  constructor(
    private gastoFijoService: GastoFijoService,
    private authService: AuthService,
    private comunService: ComunService,
    private modalService: NgbModal,
    private proveedorService: ProveedoresService,
    private router: Router
  ) {
    this.fecha = new Date();
    this.modeloFormGasto = { nombre: '', monto: 0, proveedoresId: 0, estadosId: 0};
  }

  ngOnInit(): void {
    this.getGastosFijos();
    this.getProveedores();
  }

  modalCrear() {
    this.modeloFormGasto ={nombre: '', monto: 0, proveedoresId: 0, estadosId: 0}; // Limpiar el modelo
    this.modalService.open(this.myModalConf, { size: 'lg' });
    this.modalTitle = 'Crear'
  }

  modalEditar(gastoFijo: GastoFijoDto) {
    this.modalService.open(this.myModalConf, { size: 'lg' });
    this.modalTitle = 'Editar'
    this.modeloFormGasto = { ...gastoFijo };
  }

  eliminar(id: number) {
    
  }

  getGastosFijos() {
    this.gastoFijoService.getGastosFijos(this.authService.getToken()).subscribe({
      next: (data) => {
        this.gastosFijos = data;
      }, error: (error) => {
        this.comunService.mostrarError('Ha ocurrido un error al recuperar el listado de gastos: ' + error.message);
      }
    });
  }

  getProveedores() {
    this.proveedorService.getProveedores(this.authService.getToken()).subscribe({
      next: (data) => {
        this.proveedoresList = data;
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

  cerrar() {
    this.modalService.dismissAll();
  }

  getDtoFromModel(gasto: GastoFijoModel): GastoFijoDto {
    return {
      nombre: gasto.nombre,
      monto: gasto.monto,
      proveedoresId: gasto.proveedoresId.id,
      estadosId: gasto.estadosId.id
    }
  }

  enviar() {
    if ("Crear" == this.modalTitle) {
      this.gastoFijoService.addGastoFijo(
        {
          nombre: this.modeloFormGasto.nombre, monto: this.modeloFormGasto.monto, proveedoresId: this.modeloFormGasto.proveedoresId
          , estadosId: 0
         }
        , this.authService.getToken()
      ).subscribe({
        next: (data) => {
          this.comunService.mostrarExito('Gasto fijo registrado con éxito').then(() => {
            this.getGastosFijos();
            this.modalService.dismissAll(); 
            this.router.navigateByUrl('/gastos-fijos');
          });
        }, error: (error) => {
          this.comunService.mostrarError('Ha ocurrido un error al registrar el gasto fijo: ' + error.message);
        }
      });
    } else if ("Editar" == this.modalTitle) {

    }
  }
}
