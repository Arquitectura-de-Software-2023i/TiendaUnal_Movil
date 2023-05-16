import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../Components/components.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
<<<<<<< HEAD
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
=======
import { IonicModule } from '@ionic/angular'; // Importa el módulo de Ionic aquí
>>>>>>> d945c7d67c185534ba2582a229d0354c074514ab

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
<<<<<<< HEAD
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],

=======
  ]
>>>>>>> d945c7d67c185534ba2582a229d0354c074514ab
})
export class PagesModule { }
