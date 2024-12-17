import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.page.html',
  styleUrls: ['./contacts-list.page.scss'],
})
export class ContactsListPage implements OnInit {
  contacts: any[] = [];
  expandedIndex: number | null = null; // Índice del contacto expandido

  constructor() {}

  ngOnInit() {
    this.loadContacts();
  }

  // Método para cargar contactos desde localStorage
  loadContacts() {
    this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
  }

  // Método para alternar los detalles de un contacto
  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index; // Alternar el índice expandido
  }
}
