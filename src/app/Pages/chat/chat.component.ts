import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

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

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {
  mensajes: any[] = [];
  remitentes: any[] = [];
  usuario = 76;
  newMessage: string = '';
  administrador = 1;
  token_us = "6451a5d6046ba0de39316c0f";
  token_ad = "641f9c1cff0bef295a20b834";

  constructor(private apollo: Apollo, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_MENSAJES_BY_USER,
        variables: {
          Usuario_id: this.usuario,
        },
      })
      .valueChanges.subscribe((result: any) => {
        this.mensajes = result.data?.allMessageByUserId.map(
          (item: any) => item.Mensaje
        );
        this.remitentes = result.data?.allMessageByUserId.map(
          (item: any) => item.Remitente
        );
      });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.apollo
        .mutate({
          mutation: SEND_MENSAJES,
          variables: { 
            chat: {
              Usuario_id: this.token_us,
              Administrador_id: this.token_ad,
              Mensaje: this.newMessage,
              Remitente: "Usuario"
            } 
          },
        })
        .subscribe(({ data }: any) => {
          this.mensajes.push(this.newMessage);
          this.changeDetectorRef.detectChanges();
          this.newMessage = '';
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

}
