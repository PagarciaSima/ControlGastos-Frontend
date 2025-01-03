import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { ProveedorDto } from '../../interface/proveedor-dto';
import { ProveedoresService } from '../../servicios/proveedorService/proveedores.service';
import { AuthService } from '../../servicios/authService/auth.service';
import { ComunService } from '../../servicios/comunService/comun.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // npm install @ng-bootstrap/ng-bootstrap
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, FormsModule, RouterModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {

  proveedores: ProveedorDto[] = [];
  @ViewChild("myModalConf", { static: false }) myModalConf!: TemplateRef<ProveedorDto>;
  modalTitle: string = "";
  modeloFormProveedor: ProveedorDto;
  
  constructor(
    private proveedoresService: ProveedoresService,
    private authService: AuthService,
    private comunService: ComunService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.modeloFormProveedor = {
      id: 0,
      nombre: ""
    }
  }

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores() {
    this.proveedoresService.getProveedores(this.authService.getToken()).subscribe({

      next: (data) => {
        this.proveedores = data;
      }, error: (error) => {
        this.comunService.mostrarError('Ha ocurrido un error al recuperar los proveedores: ' + error.message);
      }
    });
  }

  modalCrear() {
    this.modeloFormProveedor = { id: 0, nombre: '' }; // Limpiar el modelo
    this.modalService.open(this.myModalConf, { size: 'lg' });
    this.modalTitle = 'Crear'
  }

  modalEditar(proveedor: ProveedorDto) {
    this.modalService.open(this.myModalConf, { size: 'lg' });
    this.modalTitle = 'Editar'
    this.modeloFormProveedor = { ...proveedor };
  }

  cerrar() {
    this.modalService.dismissAll();
  }

  enviar() {
    const nombreProveedor = this.modeloFormProveedor.nombre.trim(); // Eliminar espacios al principio y al final

    if ("Crear" == this.modalTitle) {
      this.proveedoresService.addProveedor({ nombre: nombreProveedor } , this.authService.getToken()).subscribe({
        next: (data) => {
          this.comunService.mostrarExito('Proveedor creado con éxito').then(() => {
            this.getProveedores();
            this.modalService.dismissAll(); 
            this.router.navigateByUrl('/proveedores');
          });
        }, error: (error) => {
          this.comunService.mostrarError('Ha ocurrido un error al crear el proveedor: ' + error.message);
        }
      });
    } else if ("Editar" == this.modalTitle) {
      this.proveedoresService.editProveedor({nombre: nombreProveedor } , this.authService.getToken(), this.modeloFormProveedor.id).subscribe({
        next: (data) => {
          this.comunService.mostrarExito('Proveedor actualizado con éxito').then(() => {
            this.getProveedores();
            this.modalService.dismissAll(); 
            this.router.navigateByUrl('/proveedores');
          });
        }, error: (error) => {
          this.comunService.mostrarError('Ha ocurrido un error al actualizar el proveedor: ' + error.message);
        }
      });
    }
  }

}
