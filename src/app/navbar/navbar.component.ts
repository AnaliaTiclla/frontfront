import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole: string = ''; 

  // Inyectar Router en el constructor
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || 'ROLE_USER';
  }

  cerrarSesion(): void {
    // Ahora puedes usar this.router para navegar
    this.router.navigate(['/login']);
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
