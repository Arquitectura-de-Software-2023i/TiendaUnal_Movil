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
import { CategoriasComponent } from './Pages/categorias/categorias.component';
import { ChatAdminComponent } from './Pages/chat-admin/chat-admin.component';
import { InvitadoComponent } from './Pages/invitado/invitado.component';

const routes: Routes = [


  {
    path: 'login-invitado',
    component: InvitadoComponent
  },

  {
    path: 'categoria',
    component: CategoriasComponent
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
    path: 'producto/:id',
    component: ProductoComponent
  },
  {
    path: 'chat-admin/:id',
    component: ChatAdminComponent
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
