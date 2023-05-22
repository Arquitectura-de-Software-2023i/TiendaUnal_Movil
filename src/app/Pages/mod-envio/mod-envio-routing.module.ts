import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModEnvioPage } from './mod-envio.page';

const routes: Routes = [
  {
    path: '',
    component: ModEnvioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModEnvioPageRoutingModule {}
