import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole: string = ''; // Inicializar el rol vacío
  router: any;

  ngOnInit(): void {
    // Leer el rol del localStorage
    this.userRole = localStorage.getItem('userRole') || 'ROLE_USER'; // Valor predeterminado: MESERO
  }

  cerrarSesion(): void {
    // Redirige al usuario al login
    this.router.navigate(['/login']);
    // Elimina los datos del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');

    
  }

  getAdminOptions() {
    return [
      {
        name: 'Mantenedores', dropdown: true, options: [
          { name: 'Categoría', link: '/admin/categoria' },
          { name: 'SubCategoría', link: '/admin/subcategorias' },
          { name: 'Medida de Unidad', link: '/admin/medida-unidad' },
          { name: 'Usuario', link: '/admin/usuario' },
          { name: 'Empleado', link: '/admin/empleado' }
        ]
      },
      { name: 'Consultas', link: '/admin/consultas' },
      {
        name: 'Reportes', dropdown: true, options: [
          { name: 'Dashboard', link: '/admin/reportes' }
        ]
      }
    ];
  }

  getMeseroOptions() {
    return [
      { name: 'Distribución de Mesas', link: '/mesero/mesas' },
      { name: 'Órdenes Activas', link: '/mesero/ordenes-activas' },
      { name: 'Pedidos en Cola', link: '/mesero/pedidos-en-cola' },
      { name: 'Historial de Pedidos', link: '/mesero/historial-pedidos' }
    ];
  }

  getCocinaOptions() {
    return [
      { name: 'Pedidos Pendientes', link: '/cocina/pedidos-pendientes' },
      { name: 'Historial de Pedidos', link: '/cocina/historial-pedidos' }
    ];
  }
}
