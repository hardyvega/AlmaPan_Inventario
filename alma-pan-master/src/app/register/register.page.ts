import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  email: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  // Método para registrar un nuevo usuario
  register() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.username && this.email && this.password) {
      this.authService.register(this.username, this.email, this.password).subscribe({
        next: (isRegistered) => {
          if (isRegistered) {
            this.successMessage = 'Usuario registrado con éxito. Redirigiendo al login...';
            this.showToast(this.successMessage, 'success');
            setTimeout(() => {
              this.navCtrl.navigateForward('/login');
            }, 2000);
          } else {
            this.errorMessage = 'El nombre de usuario o el correo ya están registrados.';
            this.showToast(this.errorMessage, 'danger');
          }
        },
        error: () => {
          this.errorMessage = 'Ocurrió un error. Inténtalo nuevamente.';
          this.showToast(this.errorMessage, 'danger');
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
      this.showToast(this.errorMessage, 'danger');
    }
  }

  // Método para mostrar un mensaje tipo toast
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  // Método para redirigir según el estado de autenticación
  redirectBasedOnAuth() {
    if (this.authService.isAuthenticated()) {
      this.navCtrl.navigateForward('/home');
    } else {
      this.navCtrl.navigateForward('/login');
    }
  }
}