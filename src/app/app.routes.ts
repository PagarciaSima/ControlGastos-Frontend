import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { ProveedoresComponent } from './paginas/proveedores/proveedores.component';
import { GastosFijosComponent } from './paginas/gastos-fijos/gastos-fijos.component';
import { GastosPorDiaComponent } from './paginas/gastos-por-dia/gastos-por-dia.component';
import { Error404Component } from './paginas/error404/error404.component';

export const routes: Routes = [

    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "usuarios", component: UsuariosComponent },
    { path: "proveedores", component: ProveedoresComponent },
    { path: "gastos-fijos", component: GastosFijosComponent },
    { path: "gastos-por-dia", component: GastosPorDiaComponent },
    { path: "**", component: Error404Component }

];
