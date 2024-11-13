// navbar.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userRole: string = 'ADMIN'; // Asignar temporalmente el rol "ADMIN" para pruebas

  getOptions() {
    return [
      // { name: 'Mantenedores', link: 'categoria' },
      // { name: 'Mantenedores', link: 'subcategorias' },
      // { name: 'Consultas', link: 'consultas' },
      // { name: 'Reportes', link: 'reportes' }
    ];
  }
}
