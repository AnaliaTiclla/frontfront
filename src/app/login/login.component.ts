import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

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
  error: string = ''; // Para mostrar mensajes de error
  loading: boolean = false; // Para manejar el estado de carga

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
    if (!this.username || !this.password) {
      this.error = 'Por favor, complete todos los campos';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = '';

    this.loginService.autenticar(this.username, this.password).subscribe({
      next: (response) => {
        if (response && response.token && response.rol) {
          // Guardar tanto el token como el rol en localStorage
          this.loginService.guardarToken(response.token, response.rol);
          localStorage.setItem('userRole', response.rol);

          // Redirigir según el rol del usuario
          let rutaRedireccion: string;
          switch (response.rol) {
            case 'ROLE_ADMIN':
              rutaRedireccion = '/admin';
              break;
            case 'ROLE_MESERO':
              rutaRedireccion = '/mesero';
              break;
            case 'ROLE_COCINA':
              rutaRedireccion = '/cocina';
              break;
            default:
              this.error = 'Rol desconocido. Por favor, contacte al administrador.';
              this.loading = false;
              return;
        }          this.router.navigate([rutaRedireccion]);
        } else {
          this.error = 'Respuesta inválida del servidor';
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error en el login:', error);
        this.error = 'Error al iniciar sesión. Por favor, verifique sus credenciales.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}


