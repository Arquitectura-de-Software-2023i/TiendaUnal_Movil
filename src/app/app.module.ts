import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';


import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BarraButtonsComponent } from './barra-buttons/barra-buttons.component';

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:5000/graphiql' }),
  cache: new InMemoryCache()
});

export default apolloClient


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, IonicModule,
    RouterModule.forRoot([]),
    IonicModule.forRoot(),
    AppRoutingModule,
    ApolloModule,
    HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})


export class AppModule {

}
