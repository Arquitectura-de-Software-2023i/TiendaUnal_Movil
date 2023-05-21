import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEjemploPageRoutingModule } from './lista-ejemplo-routing.module';

import { ListaEjemploPage } from './lista-ejemplo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEjemploPageRoutingModule
  ],
  declarations: [ListaEjemploPage]
})
export class ListaEjemploPageModule {}
