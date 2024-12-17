import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { AdminAuthService } from '../services/admin-auth.service'; // Servicio de autenticación

@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.page.html',
  styleUrls: ['./login-administrador.page.scss']
})
export class LoginAdministradorPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminAuthService: AdminAuthService, // Servicio de autenticación
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navCtrl: NavController // Navegación entre páginas
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  // Procesar el formulario
  async onSubmit() {
    const { username, password } = this.loginForm.value;

    if (this.loginForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
        duration: 1500
      });
      await loading.present();

      setTimeout(async () => {
        await loading.dismiss();

        // Validar credenciales con el servicio
        if (this.adminAuthService.loginAdmin(username, password)) {
          this.router.navigate(['/home-administrador']); // Redirige a home-administrador
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Nombre completo o contraseña incorrectos.',
            buttons: ['OK']
          });
          await alert.present();
        }
      }, 1500);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos correctamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Regresar a la página principal de login
  navigateToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
