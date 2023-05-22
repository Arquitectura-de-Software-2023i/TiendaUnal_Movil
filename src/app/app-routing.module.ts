import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component'
import { RegisterComponent } from './Pages/register/register.component';
import { CarritoComponent } from './Pages/carrito/carrito.component';
import { HomeComponent } from './Pages/home/home.component';

import { ProductoComponent } from './Pages/producto/producto.component';
import { ChatComponent } from './Pages/chat/chat.component';
import { EnviosComponent } from './Pages/envios/envios.component';
import {UserProfileComponent} from './Pages/user-profile/user-profile.component';
import {EnviosAdminComponent} from './Pages/envios-admin/envios-admin.component';

const routes: Routes = [
  {
    path: 'producto',
    component: ProductoComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'producto',
    component: ProductoComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },
  
  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'envios/:userid',
    component: EnviosComponent
  },

  {
    path: 'envios-admin',
    component: EnviosAdminComponent
  },

  {
    path: 'user-profile/:userid',
    component: UserProfileComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'lista-ejemplo',
    loadChildren: () => import('./Pages/lista-ejemplo/lista-ejemplo.module').then( m => m.ListaEjemploPageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./Pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
