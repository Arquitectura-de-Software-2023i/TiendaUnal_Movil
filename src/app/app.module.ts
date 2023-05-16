import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BarraButtonsComponent } from './barra-buttons/barra-buttons.component';
import { GraphQLModule } from './graphql.module';





@NgModule({
  declarations: [AppComponent,BarraButtonsComponent],
  imports: [
    BrowserModule, IonicModule,
    RouterModule.forRoot([]),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})


export class AppModule {

}
