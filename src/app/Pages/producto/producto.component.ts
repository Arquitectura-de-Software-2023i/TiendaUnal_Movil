import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  query idcarritobyuser($idusuario: Int!) {
   carritoByIdUsuario(idusuario:$idusuario){
    idCarrito
    totalprecio    
    totalproductos
  }
}
`;

const CREATE_PRODUCTOS_CARRITO = gql`
mutation getcreateProductosCarrito($productocarrito: ProductocarritoInput!)  {
  createProductoCarrito(productocarrito:$productocarrito){ 
    idProducto
    precio
    cantProducto
  }
}
`;

interface Producto {
  idProducto?: number
  nombre?: string
  precio?: number
  descripcion?: string
  imagen?: string

}

interface Comprar_producto{
  idProducto?: number
  precio?: number
  cantidad?: number
}

const usuario = localStorage.getItem("userID");

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
  producto_comprado: Comprar_producto

  constructor(private toastController: ToastController, public apollo: Apollo, private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.parametro = params['id'];
      this.param = parseInt(this.parametro)
    });


    this.apollo.watchQuery({
      query: GET_PRODUCTO_BY_ID,
      variables: {
        id: this.param
      }
    }).valueChanges.subscribe((result: any) => {
      const product = result.data?.productById;
      this.producto = product;
    });


  }




  add_cart() {

    this.apollo.watchQuery({
      query: GET_CARRITO_BY_USUARIO,
      variables: {
        idusuario: usuario,
      },

    }).valueChanges.subscribe((result: any) => {

      this.cartId = result.data?.carritoByIdUsuario[0].idCarrito;
     
      this.apollo
        .mutate({
          mutation: CREATE_PRODUCTOS_CARRITO,
          variables: {
            productocarrito:{

              idCarrito:this.cartId ,
              idProducto: this.producto.idProducto,
              cantProducto: 1,
              precio: this.producto.precio,

            }
          },
        })
        .subscribe((result) => {
          console.log(result);
          this.ToastOk('top')

        }, (err) =>{
          console.log(err)
          this.ToastErr('bottom')
        });


    })


  }

  async ToastOk(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Producto añadido al carrito',
      duration: 1500,
      position: position,
      color: 'success',
      cssClass: 'custom-toast'

    });

    await toast.present();
  }

  async ToastErr(position: 'bottom') {
    const toast = await this.toastController.create({
      message: 'No se puedo añadir al carrito',
      duration: 1500,
      position: position,
      color: 'danger',
      cssClass: 'custom-toast'

    });

    await toast.present();
  }

}
