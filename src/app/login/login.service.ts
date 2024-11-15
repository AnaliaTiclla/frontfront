import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para la respuesta del login
interface LoginResponse {
  token: string;
}

// Interface para las credenciales
interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  autenticar(username: string, password: string): Observable<LoginResponse> {
    const credentials: LoginCredentials = {
      username,
      password
    };

    return this.http.post<LoginResponse>(`${this.apiURL}/autenticar`, credentials);
  }

  // Método para guardar el token en localStorage
  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Método para obtener el token
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para verificar si el usuario está autenticado
  estaAutenticado(): boolean {
    const token = this.obtenerToken();
    return !!token;
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    localStorage.removeItem('token');
  }
}