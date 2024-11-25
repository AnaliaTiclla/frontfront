import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  
  {
    path: 'admin',
    loadComponent: () => import('./navbar/navbar.component').then(m => m.NavbarComponent),
    children: [
      { path: 'categoria', loadComponent: () => import('./admin/mantenedores/categoria/categoria/categoria.component').then(m => m.CategoriaComponent) },
      { path: 'subcategorias', loadComponent: () => import('./admin/mantenedores/subcategorias/subcategoria/subcategoria.component').then(m => m.SubcategoriaComponent) },
      { path: 'producto', loadComponent: () => import('./admin/mantenedores/producto/producto.component').then(m => m.ProductoComponent) },
      { path: 'medida-unidad', loadComponent: () => import('./admin/mantenedores/medida-unidad/medida-unidad/medida-unidad.component').then(m => m.MedidaUnidadComponent) },
      { path: 'usuario', loadComponent: () => import('./admin/mantenedores/usuario/usuario/usuario.component').then(m => m.UsuarioComponent) },
      { path: 'empleado', loadComponent: () => import('./admin/mantenedores/empleado/empleado/empleado.component').then(m => m.EmpleadoComponent) },
      { path: 'mesa', loadComponent: () => import('./admin/mantenedores/mesa/mesa/mesa.component').then(m => m.MesaComponent) },

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
      //{ path: 'ordenes-activas', loadComponent: () => import('./mesero/ordenes-activas/ordenes-activas.component').then(m => m.OrdenesActivasComponent) },
      { path: 'pedidos-pendientes', loadComponent: () => import('./cocina/pedidos-pendientes/pedidos-pendientes/pedidos-pendientes.component').then(m => m.PedidosPendientesComponent) },
      // { path: 'historial-pedidos', loadComponent: () => import('./mesero/historial-pedidos/historial-pedidos.component').then(m => m.HistorialPedidosComponent) },
    ]
  },


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Redirigir a login por defecto
];
