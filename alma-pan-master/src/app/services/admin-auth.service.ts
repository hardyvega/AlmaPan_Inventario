import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  // Datos predeterminados del administrador
  private adminAccount = {
    fullName: 'Omar Andres Vega Almonacid',
    birthDate: '1979-06-25',
    email: 'adminomar@almapan.com',
    password: 'Admin1979pan' // Contraseña predeterminada
  };

  private adminSessionKey = 'adminSession'; // Clave para localStorage

  constructor() {}

  /**
   * Método para validar las credenciales del administrador.
   * @param name Nombre completo del administrador.
   * @param password Contraseña del administrador.
   * @returns `true` si las credenciales son correctas, `false` de lo contrario.
   */
  loginAdmin(name: string, password: string): boolean {
    if (name === this.adminAccount.fullName && password === this.adminAccount.password) {
      localStorage.setItem(this.adminSessionKey, JSON.stringify(this.adminAccount));
      return true;
    }
    return false;
  }

  /**
   * Método para verificar si el administrador está autenticado.
   * @returns `true` si está logueado, `false` de lo contrario.
   */
  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem(this.adminSessionKey);
  }

  /**
   * Método para obtener los detalles del administrador.
   * @returns Datos del administrador o `null` si no está autenticado.
   */
  getAdminDetails() {
    const session = localStorage.getItem(this.adminSessionKey);
    return session ? JSON.parse(session) : null;
  }

  /**
   * Método para cerrar sesión del administrador.
   */
  logout(): void {
    localStorage.removeItem(this.adminSessionKey);
  }
}
