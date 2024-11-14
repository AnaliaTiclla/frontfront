import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userRole: string = 'ADMIN'; // Cambia temporalmente el rol para pruebas (ADMIN o MESERO)

  getAdminOptions() {
    return [
      { name: 'Mantenedores', dropdown: true, options: [
        { name: 'Categoría', link: '/admin/categoria' },
        { name: 'SubCategoría', link: '/admin/subcategorias' },
        { name: 'Medida de Unidad', link: '/admin/medida-unidad' },
        { name: 'Usuario', link: '/admin/usuario' }
      ]},
      { name: 'Consultas', link: '/admin/consultas' },
      { name: 'Reportes', dropdown: true, options: [
        { name: 'Dashboard', link: '/admin/reportes' }
      ]}
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
}
