import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly USERS_KEY = 'users';

  constructor() {}

  // Método de registro de usuario
  register(fullName: string, email: string, password: string): Observable<boolean> {
    const users = this.getUsers();
    const userExists = users.some(user => user.fullName === fullName || user.email === email);

    if (userExists) {
      return of(false); // El usuario ya existe
    } else {
      // Añadir el nuevo usuario a la lista de usuarios
      users.push({ fullName, email, password });
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users)); // Guardar usuarios en localStorage
      return of(true); // Registro exitoso
    }
  }

  // Método para iniciar sesión
  login(fullName: string, password: string): Observable<boolean> {
    const users = this.getUsers();
    const user = users.find(user => user.fullName === fullName && user.password === password);

    if (user) {
      localStorage.setItem(this.TOKEN_KEY, 'loggedin'); // Guardar token simulado en localStorage
      return of(true); // Inicio de sesión exitoso
    }
    return of(false); // Credenciales incorrectas
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY); // Eliminar token de sesión
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  // Método para recuperar todos los usuarios
  private getUsers(): Array<{ fullName: string, email: string, password: string }> {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Método para restablecer la contraseña
  resetPassword(email: string, newPassword: string): Observable<boolean> {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword; // Cambiar la contraseña
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users)); // Actualizar usuarios en localStorage
      return of(true); // Restablecimiento exitoso
    }
    return of(false); // Correo no encontrado
  }
}
