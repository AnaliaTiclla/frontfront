import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

// Interface para las credenciales
interface LoginCredentials {
  username: string;
  password: string;
}

// Interface para la respuesta
interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = 'http://localhost:8080/login';

  // Headers para especificar que enviamos JSON
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  autenticar(username: string, password: string): Observable<LoginResponse> {
    // Crear el objeto con las credenciales
    const credentials: LoginCredentials = {
      username,
      password
    };

    // Enviar la petición POST con las credenciales en el body
    return this.http.post<LoginResponse>(
      `${this.apiURL}/autenticar`,
      JSON.stringify(credentials), // Convertir a string JSON
      this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error?.message || error.message}`;
    }
    console.error('Error detallado:', error);
    return throwError(() => errorMessage);
  }

  // Métodos para manejar el token
  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    const token = this.obtenerToken();
    return !!token;
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
  }
}