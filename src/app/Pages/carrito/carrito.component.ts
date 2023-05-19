import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

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
  total: String;
  total_numero: number;
  
  constructor(private apollo: Apollo, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_CARRITO_BY_USUARIO,
      })
      .valueChanges.subscribe((result: any) => {
        this.cartId = result.data?.carritoByIdUsuario[0].idCarrito;

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
                  this.calcularTotalCarrito();
                });
            });
            
          });
      });
    
  }

  // Llamada a la mutación
  eliminar_producto_de_carrito(id: number, i: number) {
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
    if (this.cartItems.length > i) {
      this.cartItems.splice(i, 1); // Elimina el elemento en el índice especificado
    }
    this.changeDetectorRef.detectChanges();
  }
  reducir_producto_de_carrito(id: number, i: number) {
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
    this.cantidadItems[i]--;
    this.calcularTotalCarrito();
    this.changeDetectorRef.detectChanges();
  }
  aumentar_producto_de_carrito(id: number,i:number) {
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
    this.cantidadItems[i]++;
    this.calcularTotalCarrito();
    this.changeDetectorRef.detectChanges();
    
  }
  pagar_carrito() {
    console.log("enviiiooooooooooooo");
    this.apollo
      .mutate({
        mutation: CREATE_ENVIO,
        variables: {
          id_cliente:6
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
            pagoTotal:this.total_numero} 
        }
        ,
      })
      .subscribe((result:any) => {
        console.log(result);
        
      });
    window.location.reload();
  }

  calcularTotalCarrito() {
    this.total_numero = 0; // Reinicializa el total a 0
    for (let i = 0; i < this.cartItems.length; i++) {
      this.total_numero += this.cantidadItems[i] * this.cartItems[i].precio;
    }
    this.total = this.total_numero.toLocaleString();
  }
  
  

  

}

