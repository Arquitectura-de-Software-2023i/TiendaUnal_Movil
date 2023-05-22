import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModEnvioPageRoutingModule } from './mod-envio-routing.module';

import { ModEnvioPage } from './mod-envio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModEnvioPageRoutingModule
  ],
  declarations: [ModEnvioPage]
})
export class ModEnvioPageModule {}
