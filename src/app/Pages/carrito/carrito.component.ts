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
  deleteCantidadProductoCarrito(id:$idProducto, cantidad: 1, carrito:$carrito){
    idProducto
    precio
    cantProducto
  }
}
`;
const CREATE_CANTIDAD_PRODUCTOS_BY_CARRITO = gql`
mutation getcreateProductosCarrito($productocarrito: ProductocarritoInput!)  {
  createProductoCarrito(productocarrito:$productocarrito){ 
    idProducto
    precio
    cantProducto
  }
}
`;

const CREATE_ENVIO = gql`
mutation createEnvio($id_cliente: Int!) {
  createEnvio(id_cliente: $id_cliente) {
    id
    id_cliente
    precio_total
    estado    
    fecha_creacion
    fecha_entrega    
  }
}
`;

const VACIAR_CARRO = gql`
mutation vaciarCarro($idCarrito: Int!)  {
  deleteProductosCarritoByIdCarrito(idCarrito:$idCarrito)
}
`;

const CREAR_TRANSACCION = gql`
mutation crearTransccion($transaccion: TransaccionesInput!){
  createTransaccion(transaccion:$transaccion) {
    idTransaccion
    idCarrito
    estadoTransaccion
    pagoTotal
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
            console.log(this.idItems);
            console.log(this.cantidadItems);

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
    console.log(this.cartItems);
    
  }

  // Llamada a la mutación
  eliminar_producto_de_carrito(id: number) {
    console.log("eliminanddddioooooooooooo");
    this.apollo
      .mutate({
        mutation: DELETE_PRODUCTOS_BY_CARRITO,
        variables: {
          idProducto: id,
          carrito: { idCarrito: this.cartId } //
        },
      })
      .subscribe((result) => {
        console.log(result);
      });
    window.location.reload();
  }
  reducir_producto_de_carrito(id: number) {
    console.log("restaaaaaaaaaaaaaa");
    this.apollo
      .mutate({
        mutation: DELETE_CANTIDAD_PRODUCTOS_BY_CARRITO,
        variables: {
          idProducto: id,
          carrito: { idCarrito: this.cartId } //
        },
      })
      .subscribe((result) => {
        console.log(result);
      });
     //window.location.reload();
  }
  aumentar_producto_de_carrito(id: number) {
    console.log("sumaaaaaaa");
    this.apollo
      .mutate({
        mutation: CREATE_CANTIDAD_PRODUCTOS_BY_CARRITO,
        variables: {
          productocarrito:{
            idCarrito:this.cartId ,
            idProducto:id,
            cantProducto:1,
            precio:100 //cualquiera no importa coje el precio de la bse de datos de producto
          }
        }
        ,
      })
      .subscribe((result:any) => {
        console.log(result);
        
      });
    window.location.reload();
  }
  pagar_carrito() {
    console.log("enviiiooooooooooooo");
    this.apollo
      .mutate({
        mutation: CREATE_ENVIO,
        variables: {
          productocarrito:{
            id_cliente:1
          }
        }
        ,
      })
      .subscribe((result:any) => {
        console.log(result);
        
      });
    console.log("pagooooo");
    this.apollo
      .mutate({
        mutation: VACIAR_CARRO,
        variables: {
          idCarrito: 6 // CAMBIAR POR --->this.cartId
        }
        ,
      })
      .subscribe((result:any) => {
        console.log(result);
        
      });
    console.log("transaccion");
    this.apollo
      .mutate({
        mutation: CREAR_TRANSACCION,
        variables: {
          transaccion:{idCarrito:6, // CAMBIAR POR --->this.cartId
            estadoTransaccion:"Aceptada",
            pagoTotal:this.total} 
        }
        ,
      })
      .subscribe((result:any) => {
        console.log(result);
        
      });
    window.location.reload();
  }
  
  

  

}

