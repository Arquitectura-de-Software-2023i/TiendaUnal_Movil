import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviosAdminPage } from './envios-admin.page';

const routes: Routes = [
  {
    path: '',
    component: EnviosAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviosAdminPageRoutingModule {}
