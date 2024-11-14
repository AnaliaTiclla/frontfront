// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
// { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  {
    path: 'admin',
    // loadComponent: () => import('./navbar/navbar.component').then(m => m.NavbarComponent), para no volver a cargar el navbar
    children: [
      { path: 'categoria', loadComponent: () => import('./admin/mantenedores/categoria/categoria/categoria.component').then(m => m.CategoriaComponent) },
      { path: 'subcategorias', loadComponent: () => import('./admin/mantenedores/subcategorias/subcategoria/subcategoria.component').then(m => m.SubCategoriaComponent) },
      { path: 'medida-unidad', loadComponent: () => import('./admin/mantenedores/medida-unidad/medida-unidad/medida-unidad.component').then(m => m.MedidaUnidadComponent) },
      { path: 'usuario', loadComponent: () => import('./admin/mantenedores/usuario/usuario/usuario.component').then(m => m.UsuarioComponent) },
      // { path: 'consultas', loadComponent: () => import('./admin/consultas/consultas.component').then(m => m.ConsultasComponent) },
      { path: 'reportes', loadComponent: () => import('./admin/reportes/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
