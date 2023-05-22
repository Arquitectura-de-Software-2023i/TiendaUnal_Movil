import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviosAdminPageRoutingModule } from './envios-admin-routing.module';

import { EnviosAdminPage } from './envios-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviosAdminPageRoutingModule
  ],
  declarations: [EnviosAdminPage]
})
export class EnviosAdminPageModule {}
