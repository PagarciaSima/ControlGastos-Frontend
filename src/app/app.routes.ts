import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { ProveedoresComponent } from './paginas/proveedores/proveedores.component';
import { GastosFijosComponent } from './paginas/gastos-fijos/gastos-fijos.component';
import { GastosPorDiaComponent } from './paginas/gastos-por-dia/gastos-por-dia.component';
import { Error404Component } from './paginas/error404/error404.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [

    { path: "", component: HomeComponent, canActivate: [authGuard], },
    { path: "login", component: LoginComponent },
    { path: "usuarios", component: UsuariosComponent, canActivate: [authGuard, adminGuard], },
    { path: "proveedores", component: ProveedoresComponent, canActivate: [authGuard], },
    { path: "gastos-fijos", component: GastosFijosComponent, canActivate: [authGuard], },
    { path: "gastos-por-dia", component: GastosPorDiaComponent, canActivate: [authGuard], },
    { path: "**", component: Error404Component}

];
