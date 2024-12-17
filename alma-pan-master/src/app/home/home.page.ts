import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';           // Variable para almacenar el nombre del usuario
  successMessage: string = '';     // Mensaje de éxito
  errorMessage: string = '';       // Mensaje de error

  products: Array<{ name: string, description: string, price: number }> = []; // Lista de productos

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    // Recuperar el nombre del usuario desde localStorage o usar 'Usuario' por defecto
    this.username = localStorage.getItem('username') || 'Usuario';

    // Ejemplo de productos a mostrar en el Home
    this.products = [
      { name: 'Pan Integral', description: 'Pan saludable y delicioso', price: 1500 },
      { name: 'Croissant', description: 'Croissant fresco y crujiente', price: 1200 },
      { name: 'Empanada', description: 'Empanada de carne y queso', price: 1000 },
    ];
  }

  // Función para cerrar sesión
  logout() {
    // Limpiar el nombre de usuario almacenado en localStorage
    localStorage.removeItem('username');

    // Mostrar mensaje de éxito antes de redirigir
    this.successMessage = 'Sesión cerrada exitosamente. Redirigiendo al login...';

    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      this.navCtrl.navigateBack('/login');
    }, 2000);
  }
}
