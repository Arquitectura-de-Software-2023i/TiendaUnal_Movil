import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_PRODUCTO_BY_ID = gql`
query getProducto($id: Int!){
  productById(id: $id){
    idProducto
    nombre
    precio
    descripcion
    imagen
  }
}
`;

const GET_CARRITO_BY_ID_USER = gql`
query {
  carritoByIdUsuario(idusuario: 5){ 
    idCarrito
    idUsuario
    totalprecio
    totalproductos
  }
}
`;


interface Producto  {
    idProducto?: number
    nombre?: string
    precio?: number
    descripcion?: string
    imagen?: string

}


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent  implements OnInit {
 
  parametro: any;
  param: number
  producto?: Producto;
  add_to_carrito: any = []
  list_add : any = {}
  cantidad: number = 0
 
  constructor(public apollo: Apollo, private route: ActivatedRoute) { }
 

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.parametro = params['id'];
      this.param = parseInt(this.parametro)
      console.log(this.param)
    });

    
  this.apollo.watchQuery({
    query: GET_PRODUCTO_BY_ID,
    variables: {
      id: this.param
    }
  }).valueChanges.subscribe((result: any) => {
    const product = result.data?.productById;
    this.producto=product;
    console.log(this.producto)
  });


  }

  add_cart(){



  }

}
