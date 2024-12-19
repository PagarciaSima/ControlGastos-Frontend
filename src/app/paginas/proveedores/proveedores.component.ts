import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { Router } from '@angular/router';
import { ProveedorDto } from '../../interface/proveedor-dto';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { AuthService } from '../../servicios/auth.service';
import { ComunService } from '../../servicios/comun.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // npm install @ng-bootstrap/ng-bootstrap
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, FormsModule],
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
    this.modalService.open(this.myModalConf, { size: 'lg' });
    this.modalTitle = 'Crear'
  }

  cerrar() {
    this.modalService.dismissAll();
  }

  enviar() {
    if ("Crear" == this.modalTitle) {
      this.proveedoresService.addProveedor({ nombre: this.modeloFormProveedor.nombre }, this.authService.getToken()).subscribe({
        next: (data) => {
          this.comunService.mostrarExito('Proveedor creado con éxito');
          this.router.navigate(['/proveedores']);
        }, error: (error) => {
          this.comunService.mostrarError('Ha ocurrido un error al crear el proveedor: ' + error.message);
        }
      });
    } else if ("Editar" == this.modalTitle) {

    }
  }
}
