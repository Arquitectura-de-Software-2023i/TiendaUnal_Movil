import { Component, OnInit } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Apollo, gql } from 'apollo-angular';

const GET_PRODUCTOS = gql`
  query {
    allProducts{
      idProducto
      nombre
      precio
      descripcion
      imagen

    }
  }
`;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor(private apollo: Apollo) { }
  Products: any[] = [];

  ngOnInit() {
    this.apollo.watchQuery({
      query: GET_PRODUCTOS,
    }).valueChanges.subscribe((result: any) => {
      const products = result.data?.allProducts;
      this.Products=products;
      console.log(this.Products)
    });
  }

  rico() {
    console.log("AAAAAAAAAAAA")
  }

}
