import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { IonContent } from '@ionic/angular';

const GET_MENSAJES = gql`
query {
  allMessage{
    _id
    Usuario_id
    Administrador_id
    Mensaje
    Create_At
    Update_At
    status
    
  }
}
`;
const GET_MENSAJES_BY_USER = gql`
query mensajesuser($Usuario_id:  Int!){
  allMessageByUserId(Usuario_id: $Usuario_id){
    Mensaje
    Usuario_id
    Administrador_id
    Remitente
    createdAt
    updatedAt
  }
}
`;
const SEND_MENSAJES = gql`
mutation sendmensaje($chat: chatInput!){
  createMessage(chat: $chat){
    status
  }
}
`;

/*
mutation {
  createMessage(chat: {
    Administrador_id: "641f9c1cff0bef295a20b834"
    Usuario_id: "6451a5d6046ba0de39316c0f"
    Remitente: "Usuario"
    Mensaje: "No sea sapo"
  }) {
    status
  }
}
*/
const usuariostring = localStorage.getItem("userID");
const usuario = parseInt(usuariostring, 10);

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {
  @ViewChild("content") content: any;

  mensajes: any[] = [];
  remitentes: any[] = [];
  newMessage: string = '';
  administrador = 1;


  constructor(private apollo: Apollo, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_MENSAJES_BY_USER,
        variables: {
          Usuario_id: usuario,
        },
      })
      .valueChanges.subscribe((result: any) => {
        this.mensajes = result.data?.allMessageByUserId.map(
          (item: any) => item.Mensaje
        );
        this.remitentes = result.data?.allMessageByUserId.map(
          (item: any) => item.Remitente
        );
        console.log(result);
        this.scrollToBottom();
      });
    
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const currentDateTime = new Date().toISOString(); // Obtiene la fecha y hora actual en formato ISO string
      this.apollo
        .mutate({
          mutation: SEND_MENSAJES,
          variables: { 
            chat: {
              Usuario_id: usuario,
              Administrador_id: this.administrador,
              Mensaje: this.newMessage,
              Remitente: "Usuario"
            } 
          },
        })
        .subscribe(({ data }: any) => {
          console.log(data);
          this.mensajes.push(this.newMessage);
          this.remitentes.push("Usuario")
          this.changeDetectorRef.detectChanges();
          this.newMessage = '';
          this.changeDetectorRef.detectChanges();
          this.scrollToBottom();
        });
    }
    
  }
  getClaseRemitente(i: number): string {
    if (this.remitentes[i] === "Administrador") {
      return 'administador-class';
    } else if (this.remitentes[i] === "Usuario") {
      return 'usuario-class';
    } else {
      return '';
    }
  }
  scrollToBottom() {
    var contentEND=document.getElementById("content-end").offsetTop;
    this.content.scrollByPoint(0,contentEND);
  }


}
