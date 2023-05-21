import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../Components/components.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { ChatComponent } from './chat/chat.component';
import { register } from 'swiper/element/bundle';

register();

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,    
    HomeComponent,
    CarritoComponent,
    ProductoComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    AppRoutingModule,
    FormsModule,
    
  
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

})
export class PagesModule { }
