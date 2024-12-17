import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductsPage } from './products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule // Configuración de rutas
  ],
  declarations: [ProductsPage], // Declaración del componente ProductsPage
  exports: [ProductsPage] // Exportación por si se necesita en otro módulo
})
export class ProductsPageModule {}
