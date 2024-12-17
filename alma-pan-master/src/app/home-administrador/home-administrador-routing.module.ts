import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAdministradorPage } from './home-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAdministradorPageRoutingModule {}
