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

import { PagesModule } from './Pages/pages.module';
import { ComponentsModule } from './Components/components.module';

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
    HttpClientModule,
    PagesModule,
    ComponentsModule
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})


export class AppModule {

}
