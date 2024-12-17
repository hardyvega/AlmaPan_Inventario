import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  fullName: string = ''; // Cambiado de "username" a "fullName" para ser consistente
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  // Método de login
  async login() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    this.authService.login(this.fullName, this.password).subscribe(
      async (isLoggedIn) => {
        await loading.dismiss();
        if (isLoggedIn) {
          this.successMessage = 'Inicio de sesión exitoso. Redirigiendo...';
          this.showToast(this.successMessage, 'success');
          setTimeout(() => {
            this.navCtrl.navigateForward('/home'); // Redirección al Home
          }, 1500);
        } else {
          this.showLoginError();
        }
      },
      async () => {
        await loading.dismiss();
        this.showLoginError();
      }
    );

    this.isLoading = false;
  }

  // Mostrar error de inicio de sesión
  showLoginError() {
    this.errorMessage = 'Nombre de usuario o contraseña incorrecta. Inténtalo de nuevo.';
    this.showToast(this.errorMessage, 'danger');
  }

  // Mostrar mensajes toast
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

  // Navegación a otras páginas
  navigateToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  navigateToResetPassword() {
    this.navCtrl.navigateForward('/reset-password');
  }

  navigateToAdminLogin() {
    this.navCtrl.navigateForward('/login-administrador');
  }
}
