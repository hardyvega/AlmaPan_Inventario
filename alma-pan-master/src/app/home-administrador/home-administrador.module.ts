import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAdministradorPageRoutingModule } from './home-administrador-routing.module';

import { HomeAdministradorPage } from './home-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAdministradorPageRoutingModule
  ],
  declarations: [HomeAdministradorPage]
})
export class HomeAdministradorPageModule {}
