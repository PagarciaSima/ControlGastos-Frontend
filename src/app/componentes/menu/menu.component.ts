import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/authService/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  perfil_id: string = '';

  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.perfil_id = this.authService.getPerfilId();
  }

}
