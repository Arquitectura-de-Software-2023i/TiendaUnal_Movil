import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component'
import { RegisterComponent } from './Pages/register/register.component';
import { CarritoComponent } from './Pages/carrito/carrito.component';
import { HomeComponent } from './Pages/home/home.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';
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


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
