import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Guard único para proteger rutas

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Rutas protegidas para usuarios normales y administradores
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard],
    data: { requiresAdmin: false }, // Acceso solo para usuarios normales
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule),
    canActivate: [AuthGuard],
    data: { requiresAdmin: false }, // Acceso solo para usuarios normales
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsPageModule),
    canActivate: [AuthGuard],
    data: { requiresAdmin: false }, // Acceso compartido para usuarios normales y administradores
  },
  {
    path: 'contacts-list',
    loadChildren: () => import('./contacts-list/contacts-list.module').then(m => m.ContactsListPageModule),
    canActivate: [AuthGuard],
    data: { requiresAdmin: false },
  },

  // Rutas de autenticación
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'login-administrador',
    loadChildren: () =>
      import('./login-administrador/login-administrador.module').then(m => m.LoginAdministradorPageModule),
  },

  // Rutas protegidas para administradores
  {
    path: 'home-administrador',
    loadChildren: () =>
      import('./home-administrador/home-administrador.module').then(m => m.HomeAdministradorPageModule),
    canActivate: [AuthGuard],
    data: { requiresAdmin: true }, // Acceso solo para administradores
  },
  {
    path: 'lista-usuarios',
    loadChildren: () =>
      import('./lista-usuarios/lista-usuarios.module').then(m => m.ListaUsuariosPageModule),
    canActivate: [AuthGuard],
    data: { requiresAdmin: true }, // Acceso solo para administradores
  },

  // Redirección para rutas inválidas
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
