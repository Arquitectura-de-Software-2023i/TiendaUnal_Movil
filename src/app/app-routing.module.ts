import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component'
import { RegisterComponent } from './Pages/register/register.component';
import { CarritoComponent } from './Pages/carrito/carrito.component';
import { HomeComponent } from './Pages/home/home.component';

import { ProductoComponent } from './Pages/producto/producto.component';
import { ChatComponent } from './Pages/chat/chat.component';

const routes: Routes = [

  {
    path: 'carrito',
    component: CarritoComponent

  },
  {
    path: 'chat',
    component: ChatComponent

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
    path: 'user-profile',
    component: UserProfileComponent

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'envios/:userid',
    loadChildren: () => import('./Pages/envios/envios.module').then( m => m.EnviosPageModule)
  },
  {
    path: 'lista-ejemplo',
    loadChildren: () => import('./Pages/lista-ejemplo/lista-ejemplo.module').then( m => m.ListaEjemploPageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./Pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'user-profile/:userid',
    loadChildren: () => import('./Pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
