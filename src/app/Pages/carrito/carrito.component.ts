import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';

const GET_PRODUCTO = gql`
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
const GET_PRODUCTOS_BY_CARRITO = gql`
  query getProductosCarritoById($idcarrito: Int!) {
  productosCarritoByIdCarrito(idcarrito: $idcarrito){
    idProducto
    precio
    cantProducto
  }
}
`;

const DELETE_PRODUCTOS_BY_CARRITO = gql`
  mutation  getProductosCarritoById($idProducto: Int!, $carrito: CantidadInput!) {
  deleteByIdProductoDelCarrito(id: $idProducto, carrito: $carrito){
    idProducto
    precio
    cantProducto
  }
}
`;

const DELETE_CANTIDAD_PRODUCTOS_BY_CARRITO = gql`
  mutation  getProductosCarritoById($idProducto: Int!, $carrito: CantidadInput!) {
  deleteCantidadProductoCarrito(id:$idProducto,cantidad: 1, carrito:{ idCarrito:1 }){
    idProducto
    precio
    cantProducto
  }
}
`;
const CREATE_CANTIDAD_PRODUCTOS_BY_CARRITO = gql`
  mutation  getProductosCarritoById($idProducto: Int!, $carrito: CantidadInput!) {
  deleteCantidadProductoCarrito(id:$idProducto,cantidad: 1, carrito:{ idCarrito:1 }){
    idProducto
    precio
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
  cartItems: any[] = [];
  idItems: any[];
  cartId: number;
  loading = true;
  error: any;
  cantidadItems: any[];
  total: number;
  
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_CARRITO_BY_USUARIO,
      })
      .valueChanges.subscribe((result: any) => {
        this.cartId = result.data?.carritoByIdUsuario[0].idCarrito;
        this.total = result.data?.carritoByIdUsuario[0].totalprecio.toLocaleString();

        this.apollo
          .watchQuery({
            query: GET_PRODUCTOS_BY_CARRITO,
            variables: {
              idcarrito: this.cartId,
            },
          })
          .valueChanges.subscribe((result: any) => {
            this.idItems = result.data?.productosCarritoByIdCarrito.map(
              (item: any) => item.idProducto
            );
            this.cantidadItems = result.data?.productosCarritoByIdCarrito.map(
              (item: any) => item.cantProducto
            );

            this.idItems.forEach((itemId: any) => {
              this.apollo
                .watchQuery({
                  query: GET_PRODUCTO,
                  variables: {
                    id: itemId,
                  },
                })
                .valueChanges.subscribe((result: any) => {
                  const newItem = result.data?.productById;
                  this.cartItems.push(newItem);
                  this.loading = result.loading;
                  this.error = result.error;
                  
                });
            });
            
          });
      });
    
  }

  // Llamada a la mutación
  eliminar_producto_de_carrito(id: number) {
    console.log("eliminanddddioooooooooooo");
    this.apollo
      .mutate({
        mutation: DELETE_PRODUCTOS_BY_CARRITO,
        variables: {
          id: id,
          carrito: { idCarrito: this.cartId } //
        },
      })
      .subscribe((result) => {
        console.log(result);
      });
  }
  reducir_producto_de_carrito(id: number) {
    console.log("eliminanddddioooooooooooo");
    this.apollo
      .mutate({
        mutation: DELETE_PRODUCTOS_BY_CARRITO,
        variables: {
          id: id,
          carrito: { idCarrito: this.cartId } //
        },
      })
      .subscribe((result) => {
        console.log(result);
      });
  }
  aumentar_producto_de_carrito(id: number) {
    console.log("eliminanddddioooooooooooo");
    this.apollo
      .mutate({
        mutation: DELETE_PRODUCTOS_BY_CARRITO,
        variables: {
          id: id,
          carrito: { idCarrito: this.cartId } //
        },
      })
      .subscribe((result) => {
        console.log(result);
      });
  }

}

