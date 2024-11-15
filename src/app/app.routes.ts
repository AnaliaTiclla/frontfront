import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  
  {
    path: 'admin',
    loadComponent: () => import('./navbar/navbar.component').then(m => m.NavbarComponent),
    children: [
      { path: 'categoria', loadComponent: () => import('./admin/mantenedores/categoria/categoria/categoria.component').then(m => m.CategoriaComponent) },
      { path: 'subcategorias', loadComponent: () => import('./admin/mantenedores/subcategorias/subcategoria/subcategoria.component').then(m => m.SubCategoriaComponent) },
      { path: 'medida-unidad', loadComponent: () => import('./admin/mantenedores/medida-unidad/medida-unidad/medida-unidad.component').then(m => m.MedidaUnidadComponent) },
      { path: 'usuario', loadComponent: () => import('./admin/mantenedores/usuario/usuario/usuario.component').then(m => m.UsuarioComponent) },
      { path: 'reportes', loadComponent: () => import('./admin/reportes/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    ]
  },

  {
    path: 'mesero',
    loadComponent: () => import('./navbar/navbar.component').then(m => m.NavbarComponent),
    children: [
      { path: 'mesas', loadComponent: () => import('./mesero/mesas/distribucion-mesas/distribucion-mesas.component').then(m => m.DistribucionMesasComponent) },
      // { path: 'ordenes-activas', loadComponent: () => import('./mesero/ordenes-activas/ordenes-activas.component').then(m => m.OrdenesActivasComponent) },
      // { path: 'pedidos-en-cola', loadComponent: () => import('./mesero/pedidos-en-cola/pedidos-en-cola.component').then(m => m.PedidosEnColaComponent) },
      // { path: 'historial-pedidos', loadComponent: () => import('./mesero/historial-pedidos/historial-pedidos.component').then(m => m.HistorialPedidosComponent) },
    ]
  },

  {
    path: 'cocina',
    loadComponent: () => import('./navbar/navbar.component').then(m => m.NavbarComponent),
    children: [
      { path: 'mesas', loadComponent: () => import('./cocina/pedidos-pendientes/pedidos-pendientes/pedidos-pendientes.component').then(m => m.PedidosPendientesComponent) },
      // { path: 'ordenes-activas', loadComponent: () => import('./mesero/ordenes-activas/ordenes-activas.component').then(m => m.OrdenesActivasComponent) },
      // { path: 'pedidos-en-cola', loadComponent: () => import('./mesero/pedidos-en-cola/pedidos-en-cola.component').then(m => m.PedidosEnColaComponent) },
      // { path: 'historial-pedidos', loadComponent: () => import('./mesero/historial-pedidos/historial-pedidos.component').then(m => m.HistorialPedidosComponent) },
    ]
  },


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Redirigir a login por defecto
];
