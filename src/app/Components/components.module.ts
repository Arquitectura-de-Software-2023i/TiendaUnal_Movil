import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { BarraButtonsComponent } from './barra-buttons/barra-buttons.component';
import { SearchComponent } from './search/search.component';
@NgModule({
  declarations: [BarraButtonsComponent, SearchComponent],
  imports: [
    CommonModule,
    IonicModule  ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    exports: [BarraButtonsComponent, SearchComponent]

})
export class ComponentsModule { }
