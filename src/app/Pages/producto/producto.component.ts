import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_CARRITO_BY_ID = gql`
query {
  productById(id: 1){
    idProducto
    nombre
    precio
    descripcion
    imagen

  }
}
`;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent  implements OnInit {
 
  parametro: any;
  param: number
  producto: any[] = [];
 
  constructor(public apollo: Apollo, private route: ActivatedRoute) { }
 

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.parametro = params['id'];
      this.param = parseInt(this.parametro)
      console.log(this.param)
    });

    
  this.apollo.watchQuery({
    query: GET_CARRITO_BY_ID,
    variables: {
      id: this.param
    }
  }).valueChanges.subscribe((result: any) => {
    const product = result.data.productById;
    this.producto=product;
    console.log(this.producto)
  });


  }


}
