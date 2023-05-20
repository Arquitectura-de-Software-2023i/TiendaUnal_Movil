import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';


import { BarraButtonsComponent } from './barra-buttons/barra-buttons.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [BarraButtonsComponent, SearchComponent],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule,
    RouterModule
   ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    exports: [BarraButtonsComponent, SearchComponent]

})
export class ComponentsModule { }
