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
const SEND_MENSAJES = gql`
mutation ($chat: chatInput!){
  createMessage(chat: $chat){
    status
  }
}
`;



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {
  mensajes: any[] = [];
  usuario=1;
  newMessage: string = '';

  constructor(private apollo: Apollo, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_MENSAJES,
      })
      .valueChanges.subscribe((result: any) => {
        this.mensajes = result.data?.allMessage.map(
          (item: any) => item.Mensaje
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
              Usuario_id: this.usuario.toString(),
              Administrador_id: "1",
              Mensaje: this.newMessage
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

}
