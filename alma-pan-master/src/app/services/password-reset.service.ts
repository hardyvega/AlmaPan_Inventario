import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private apiUrl = 'https://tu-api.com/reset-password'; // Cambia esta URL a la de tu API para restablecer la contraseña

  constructor(private http: HttpClient) {}

  // Método para enviar la solicitud de restablecimiento de contraseña
  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email }).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Manejo de errores para mostrar mensajes específicos si algo sale mal
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud inválida. Verifica el correo electrónico.';
          break;
        case 404:
          errorMessage = 'Correo electrónico no encontrado. Verifica el correo ingresado.';
          break;
        case 500:
          errorMessage = 'Ocurrió un error en el servidor. Intenta nuevamente más tarde.';
          break;
        default:
          errorMessage = `Error: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
