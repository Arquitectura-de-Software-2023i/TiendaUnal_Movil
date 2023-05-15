import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [

  {
    path: 'carrito',
    component: CarritoComponent

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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
