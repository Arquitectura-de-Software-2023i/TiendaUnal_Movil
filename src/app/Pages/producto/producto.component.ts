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

const GET_CARRITO_BY_USUARIO = gql`
  query {
   carritoByIdUsuario(idusuario:1){
    idCarrito
    totalprecio    
    totalproductos
  }
}
`;

const CREATE_PRODUCT_CARRITO = gql`
  MUTACION!
`;

interface Producto {
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
export class ProductoComponent implements OnInit {

  parametro: any;
  param: number
  producto?: Producto;
  add_to_carrito: any = []
  list_add: any = {}
  cantidad: number = 0
  cartId: number

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
      this.producto = product;
      console.log(this.producto)
    });


  }

  add_cart() {

    this.apollo.watchQuery({
      query: GET_CARRITO_BY_USUARIO,
    }).valueChanges.subscribe((result: any) => {

      this.cartId = result.data?.carritoByIdUsuario[0].idcarrito;

      // this.apollo
      //   .mutate({
      //     mutation: DELETE_PRODUCTOS_BY_CARRITO,
      //     variables: {
      //       id: id,
      //       carrito: { idCarrito: this.cartId } //
      //     },
      //   })
      //   .subscribe((result) => {
      //     console.log(result);
      //   });


    })


  }

}
