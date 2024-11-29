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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || 'ROLE_USER';
  }

  cerrarSesion(): void {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }

  getAdminOptions() {
    return [
      {
        name: 'Panel de Control', dropdown: true, options: [
          { name: 'Dashboard', link: '/admin/dashboard' },
          { name: 'Reportes', link: '/admin/reportes' }
        ]
      },

      {
        name: 'Mantenedores', dropdown: true, options: [
          { name: 'Categoría', link: '/admin/categoria' },
          { name: 'SubCategoría', link: '/admin/subcategorias' },
          { name: 'Producto', link: '/admin/producto' },
          { name: 'Tipo de comprobante', link: '/admin/tipocomprobante' },
          { name: 'Usuario', link: '/admin/usuario' },
          { name: 'Empleado', link: '/admin/empleado' },
          { name: 'Mesa', link: '/admin/mesa' }
        ]
      },
    ];
  }

  getMeseroOptions() {
    return [
      { name: 'Distribución de Mesas', link: '/mesero/mesas' },
    ];
  }

  getCocinaOptions() {
    return [
      { name: 'Pedidos Pendientes', link: '/cocina/pedidos-pendientes' },

    ];
  }
}
