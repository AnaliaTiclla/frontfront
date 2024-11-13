import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  iniciarSesion() {
    if (this.username && this.password) {
      // Implementar lógica de autenticación
      alert(`Bienvenido, ${this.username}`);
    } else {
      alert('Por favor, ingresa tu usuario y contraseña.');
    }
  }
}
