import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AdminAuthService } from './services/admin-auth.service'; // Servicio de autenticación del administrador

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private adminAuthService: AdminAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const requiresAdmin = route.data['requiresAdmin']; // Define si la ruta requiere administrador
    const isAdminAuthenticated = this.adminAuthService.isAdminLoggedIn(); // Admin autenticado
    const isUserAuthenticated = !!localStorage.getItem('authToken'); // Usuario autenticado

    // Verificación de rutas protegidas del administrador
    if (requiresAdmin) {
      if (isAdminAuthenticated) {
        return true; // Permite acceso al administrador
      } else {
        this.router.navigate(['/login-administrador']); // Redirige al login de administrador
        return false;
      }
    }

    // Verificación de rutas protegidas compartidas
    if (isUserAuthenticated || isAdminAuthenticated) {
      return true; // Permite acceso a usuarios normales o administradores
    } else {
      this.router.navigate(['/login']); // Redirige al login normal
      return false;
    }
  }
}
