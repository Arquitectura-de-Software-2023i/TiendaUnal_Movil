import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../Components/components.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { IonicModule } from '@ionic/angular'; // Importa el módulo de Ionic aquí

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    HomeComponent,
    CarritoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule
  ]
})
export class PagesModule { }
