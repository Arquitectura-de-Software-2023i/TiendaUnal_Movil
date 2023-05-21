import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEjemploPage } from './lista-ejemplo.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEjemploPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEjemploPageRoutingModule {}
