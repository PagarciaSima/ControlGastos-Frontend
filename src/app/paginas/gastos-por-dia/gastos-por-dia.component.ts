import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { AuthService } from '../../servicios/authService/auth.service';
import { ComunService } from '../../servicios/comunService/comun.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import dayjs from 'dayjs';
import swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { GastoDiaModel } from '../../interface/gasto-dia-model';
import { GastoPorDiaService } from '../../servicios/gastoDia/gasto-por-dia.service';
import { Observable } from 'rxjs/internal/Observable';
import { GastoDiaDto } from '../../interface/gasto-dia-dto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedorService/proveedores.service';
import { ProveedorDto } from '../../interface/proveedor-dto';

@Component({
  selector: 'app-gastos-por-dia',
  standalone: true,
  imports: [MenuComponent, FooterComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './gastos-por-dia.component.html',
  styleUrl: './gastos-por-dia.component.css'
})
export class GastosPorDiaComponent implements OnInit{

  fecha!: Date;
  contPagado: number = 0;
  contNoPagado: number = 0;
  gastosPorDia: GastoDiaModel[] = [];
  proveedores: ProveedorDto[] = [];
  @ViewChild("myModalConf", { static: false }) myModalConf!: TemplateRef<GastoDiaModel>;
  modalTitle: string = "";
  modeloFormGasto!: GastoDiaModel;

  constructor(
    private authService: AuthService,
    private comunService: ComunService,
    private router: Router,
    private gastoPorDiaService: GastoPorDiaService,
    private modalService: NgbModal,
    private proveedorService: ProveedoresService
    
  ) {
    this.fecha = new Date();
    this.modeloFormGasto = {
      id: 0,
      descripcion: "",
      fecha: new Date(),
      proveedoresId: { id : 0, nombre : "" },
    };
  }

  ngOnInit(): void {
    this.getGastosPorDia();
    this.getProveedores();
  }

  getMesActual() {
    let date = new Date();
    dayjs.locale('es');
    return dayjs(date).format("MMMM");
  }

  getProveedores() {
    this.proveedorService.getProveedores(this.authService.getToken()).subscribe({
      next: (data) => {
        this.proveedores = data;
      }, error: (error) => {
        this.comunService.mostrarError("Ha ocurrido un error al recuperar los proveedores: " + error.error)
      }
    })
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
    this.modeloFormGasto = {
      id: 0,
      descripcion: "",
      fecha: new Date(),
      proveedoresId: { id : 0, nombre : "" },
    };
    this.modalService.open(this.myModalConf, { size: 'lg' });
    this.modalTitle = 'Crear'
  }

  modalEditar( gasto:GastoDiaModel ) {

  }

  cerrar() {
    this.modalService.dismissAll();
  }

  eliminar(id: number) {

  }

  enviar() {
    if ("Crear" == this.modalTitle) {
      this.gastoPorDiaService.addGastoPorDia(
        {
          neto: this.modeloFormGasto.neto!, iva: this.modeloFormGasto.iva!, total: this.modeloFormGasto.total!,
          descripcion: this.modeloFormGasto.descripcion, proveedoresId: this.modeloFormGasto.proveedoresId!.id
         }
        , this.authService.getToken()
      ).subscribe({
        next: (data) => {
          this.comunService.mostrarExito('Gasto diario registrado con éxito').then(() => {
            this.getGastosPorDia();
            this.modalService.dismissAll(); 
            this.router.navigateByUrl('/gastos-por-dia');
          });
        }, error: (error) => {
          this.comunService.mostrarError('Ha ocurrido un error al registrar el gasto diario: ' + error.message);
        }
      });
    } 
  }
}
