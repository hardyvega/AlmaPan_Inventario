import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  // Modelo para un nuevo contacto
  newContact = {
    name: '',
    businessName: '',
    phone: '',
    kilos: '',
    location: '',
    details: '',
  };

  // Mensajes de estado
  message: string = '';
  messageColor: string = '';

  constructor() {}

  // Método para guardar un contacto
  saveContact() {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]'); // Obtener la lista existente
    contacts.push(this.newContact); // Agregar el nuevo contacto
    localStorage.setItem('contacts', JSON.stringify(contacts)); // Guardar en localStorage

    // Mostrar mensaje de éxito
    this.message = 'Contacto guardado con éxito.';
    this.messageColor = 'success';

    // Reiniciar el formulario
    this.newContact = { name: '', businessName: '', phone: '', kilos: '', location: '', details: '' };

    // Limpiar el mensaje después de 3 segundos
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
