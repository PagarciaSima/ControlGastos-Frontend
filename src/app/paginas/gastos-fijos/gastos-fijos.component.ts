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
import { EstadosService } from '../../servicios/estados.service';
import { EstadoDto } from '../../interface/estado-dto';
import swal from 'sweetalert2'; // npm i sweetalert2

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
  estadosList: EstadoDto[] = [];
  proveedoresList: ProveedorDto[] = [];
  @ViewChild("myModalConf", { static: false }) myModalConf!: TemplateRef<GastoFijoDto>;
  modalTitle: string = "";
  modeloFormGasto: GastoFijoModel;

  contPagado: number = 0;
  contNoPagado: number = 0;

  constructor(
    private gastoFijoService: GastoFijoService,
    private authService: AuthService,
    private comunService: ComunService,
    private modalService: NgbModal,
    private proveedorService: ProveedoresService,
    private router: Router,
    private estadoService: EstadosService
  ) {
    this.fecha = new Date();
    this.modeloFormGasto = { nombre: '', monto: 0, proveedoresId: {id: 0, nombre: ""}};
  }

  ngOnInit(): void {
    this.getGastosFijos();
    this.getProveedores();
    this.getEstados();
  }

  modalCrear() {
    this.modeloFormGasto ={nombre: '', monto: 0, proveedoresId: {id: 0, nombre: ""}}; // Limpiar el modelo
    this.modalService.open(this.myModalConf, { size: 'lg' });
    this.modalTitle = 'Crear'
  }

  modalEditar(gastoFijo: GastoFijoModel) {
    this.modalService.open(this.myModalConf, { size: 'lg' });
    this.modalTitle = 'Editar'
    this.modeloFormGasto = {
      id: gastoFijo.id, nombre: gastoFijo.nombre, monto: gastoFijo.monto,
      proveedoresId: gastoFijo.proveedoresId, estadosId: gastoFijo.estadosId
    };
  }

  eliminar(id: number) {
    swal.fire({
      position: 'top-end',
      title: '¿Realmente desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gastoFijoService.deleteGastoFijo(this.authService.getToken(), id).subscribe({
          next: () => {
            this.comunService.mostrarExito('Existo al eliminar el registro');
            this.getGastosFijos();
            setTimeout(() => {
              this.router.navigate(['/gastos-fijos']);
            }, 2000);

          }, error: (error) => {
            this.comunService.mostrarError('Ha ocurrido un error al eliminar el registro: ' + error.message);
          }
        });
      }
    });
  }

  getGastosFijos() {
    this.gastoFijoService.getGastosFijos(this.authService.getToken()).subscribe({
      next: (data) => {
        this.gastosFijos = data;
        this.setPagadosYnoPagadosCounter(this.gastosFijos);
      }, error: (error) => {
        this.comunService.mostrarError('Ha ocurrido un error al recuperar el listado de gastos: ' + error.message);
      }
    });
  }

  setPagadosYnoPagadosCounter(gastosFijos: GastoFijoModel[]) {
    this.contNoPagado = 0;
    this.contNoPagado = 0;
    for (let gasto of gastosFijos) {
      if (gasto.estadosId!.id == 3) {  // pagado 
        this.contPagado += gasto.monto;
      } else if (gasto.estadosId!.id == 4) { // no pagado
        this.contNoPagado += gasto.monto;
      }
     
    }
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

  getEstados() {
    this.estadoService.getEstadosGastos(this.authService.getToken()).subscribe({
      next: (data) => {
        this.estadosList = data;
      }, error: (error) => {
        this.comunService.mostrarError('Ha ocurrido un error al recuperar el listado de estados: ' + error.message);
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

  enviar() {
    if ("Crear" == this.modalTitle) {
      this.gastoFijoService.addGastoFijo(
        {
          nombre: this.modeloFormGasto.nombre, monto: this.modeloFormGasto.monto, proveedoresId: this.modeloFormGasto.proveedoresId!.id
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
       this.gastoFijoService.editGastoFijo(
         {
          nombre: this.modeloFormGasto.nombre,
          monto: this.modeloFormGasto.monto,
          proveedoresId: this.modeloFormGasto.proveedoresId!.id,
          estadosId: this.modeloFormGasto.estadosId!.id
         }
        , this.authService.getToken()
        , this.modeloFormGasto.id!
      ).subscribe({
        next: (data) => {
          this.comunService.mostrarExito('Registro de gasto fijo actualizado con éxito').then(() => {
            this.getGastosFijos();
            this.modalService.dismissAll(); 
            this.router.navigateByUrl('/gastos-fijos');
          });
        }, error: (error) => {
          this.comunService.mostrarError('Ha ocurrido un error al actualizar el registro de gasto fijo: ' + error.message);
        }
      }); 
    }
  }
}
