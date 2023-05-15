import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';

const GET_PRODUCTOSCARRITOS = gql`
  query {
  allProductosCarrito{
    idProducto_Carrito
    idProducto
    precio
    idCarrito
    cantProducto
  }
}
`;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent  implements OnInit {
  rates: any[];
  loading = true;
  error: any;
  
 
  constructor(private apollo: Apollo) {}

 
 
  ngOnInit() {
    console.log("aca"); // Imprimir el resultado en la consola
    this.apollo
      .watchQuery({
        query: GET_PRODUCTOSCARRITOS,
      })
      .valueChanges.subscribe((result: any) => {
        this.rates = result.data?.allProductosCarrito;
        this.loading = result.loading;
        this.error = result.error;

        console.log(result); // Imprimir el resultado en la consola
      });
  }
}
