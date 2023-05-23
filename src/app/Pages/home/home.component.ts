import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
const GET_CHATS = gql`
  query {
  allMessage {
    Usuario_id
    Administrador_id
    Mensaje
    Remitente
    updatedAt
    
 }
}
`;

const GET_NOMBRE = gql`
          query cuentaById($id: Int!) {
            cuentaById(id: $id) {
              id,
              idUser,
              lastName,
              firstName,
              phoneNumber,
              address,
              timeCreated,
              city
            }
          }
        `;

const usuario = localStorage.getItem("userID");

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor(private apollo: Apollo, private changeDetectorRef: ChangeDetectorRef) { }
  Products: any[] = [];
  chats: any[] = [];
  usuarios: any[] = [];

  ngOnInit() {
    this.apollo.watchQuery({
      query: GET_PRODUCTOS,
    }).valueChanges.subscribe((result: any) => {
      const products = result.data?.allProducts;
      this.Products=products;
      console.log(this.Products)
    });
    this.apollo.watchQuery({
      query: GET_CHATS,
    }).valueChanges.subscribe((result: any) => {
      this.chats = result.data?.allMessage.reduce((chats: string[], item: any) => {
        if (item.Remitente === 'Administrador') {
          const usuario = item.Usuario_id; // Reemplaza "NombreUsuario" con la propiedad correcta que contiene el nombre del usuario en tu estructura de datos
          if (!chats.includes(usuario)) {
            chats.push(usuario);
          }
        }
        return chats;
      }, []);
      console.log(this.chats);
      this.chats.forEach((itemId: any) => {
        this.apollo
          .watchQuery({
            query: GET_NOMBRE,
            variables: {
              id: itemId,
            },
          })
          .valueChanges.subscribe((result: any) => {
            const newItem = result.data?.cuentaById.firstName;
            this.usuarios.push(newItem);
            this.changeDetectorRef.detectChanges();
            console.log(result);
          });
      });
      
    });

  }

}
