import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';

interface User {
  fullName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {
  users: User[] = [];
  newUser: User = {
    fullName: '',
    email: '',
    password: '',
  };
  editingUser: User | null = null;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  loadUsers() {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  async addUser() {
    if (this.validateUser(this.newUser)) {
      if (this.users.some((user) => user.email === this.newUser.email)) {
        await this.presentToast('El correo electrónico ya está registrado', 'danger');
        return;
      }

      this.users.push({ ...this.newUser });
      this.saveUsers();
      await this.presentToast('Usuario agregado exitosamente', 'success');
      this.newUser = {
        fullName: '',
        email: '',
        password: '',
      };
    }
  }

  async showDeleteConfirm(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteUser(index);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteUser(index: number) {
    this.users.splice(index, 1);
    this.saveUsers();
    await this.presentToast('Usuario eliminado exitosamente', 'success');
  }

  editUser(user: User) {
    this.editingUser = { ...user };
  }

  async saveUser() {
    if (this.editingUser && this.validateUser(this.editingUser)) {
      const index = this.users.findIndex((u) => u.email === this.editingUser!.email);
      if (index > -1) {
        this.users[index] = { ...this.editingUser };
        this.saveUsers();
        this.editingUser = null;
        await this.presentToast('Usuario actualizado exitosamente', 'success');
      }
    }
  }

  cancelEdit() {
    this.editingUser = null;
  }

  goBackToAdminHome() {
    this.navCtrl.navigateBack('/home-administrador');
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  private validateUser(user: User): boolean {
    if (!user.fullName || !user.email) {
      this.presentToast('Por favor, complete todos los campos requeridos', 'warning');
      return false;
    }

    if (!this.validateEmail(user.email)) {
      this.presentToast('Por favor, ingrese un correo electrónico válido', 'warning');
      return false;
    }

    if (!this.editingUser && (!user.password || user.password.length < 6)) {
      this.presentToast('La contraseña debe tener al menos 6 caracteres', 'warning');
      return false;
    }

    return true;
  }
}
