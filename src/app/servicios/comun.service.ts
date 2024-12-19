import { Injectable } from '@angular/core';
import swal from 'sweetalert2'; // npm i sweetalert2

@Injectable({
  providedIn: 'root'
})
export class ComunService {

  constructor() { }

  mostrarError(mensaje: string) {
    swal.fire({
      icon: 'error',
      timer: 2000,
      title: 'Error',
      text: mensaje
    });
  }

  mostrarExito(mensaje: string) {
    swal.fire({
      icon: 'success',
      timer: 2000,
      title: 'OK',
      text: mensaje
    });
  }
}
