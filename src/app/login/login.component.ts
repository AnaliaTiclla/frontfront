import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { Router } from '@angular/router';  // Inyectar el Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';  // Definir las propiedades para username y password
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router  // Inyectar el Router
  ) {}

  onLogin(username: string, password: string): void {
    this.loginService.autenticar(username, password).subscribe({
      next: (response) => {
        this.loginService.guardarToken(response.token);  // Guardar el token si la autenticación es exitosa

        // Redirigir a la página principal (ruta 'admin' en este caso)
        this.router.navigate(['/admin']);  // Esto redirige al layout de administración
      },
      error: (error) => {
        console.error('Error en el login:', error);
        // Maneja el error apropiadamente
      }
    });
  }
}
