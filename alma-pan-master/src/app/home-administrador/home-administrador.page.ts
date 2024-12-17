import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AdminAuthService } from '../services/admin-auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-home-administrador',
  templateUrl: './home-administrador.page.html',
  styleUrls: ['./home-administrador.page.scss']
})
export class HomeAdministradorPage {
  constructor(
    private navCtrl: NavController,
    private adminAuthService: AdminAuthService // Inyecta el servicio
  ) {}

  /**
   * Método para cerrar sesión del administrador.
   */
  logout(): void {
    this.adminAuthService.logout(); // Elimina la sesión del administrador
    this.navCtrl.navigateRoot('/login-administrador'); // Redirige al login de administrador
  }
}

