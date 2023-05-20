import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PagesModule } from './Pages/pages.module';
import { ComponentsModule } from './Components/components.module';
import { GraphQLModule } from './graphql.module';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, IonicModule,
    RouterModule.forRoot([]),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    PagesModule,
    ComponentsModule,
    FormsModule
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})


export class AppModule {

}
