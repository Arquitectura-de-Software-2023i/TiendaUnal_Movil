import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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

const administrador = localStorage.getItem("userID");

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.scss'],
})
export class ChatAdminComponent  implements OnInit {

  @ViewChild("content") content: any;

  mensajes: any[] = [];
  remitentes: any[] = [];
  newMessage: string = '';
  administrador = 1;
  parametro: any;
  param: number;


  constructor(private apollo: Apollo, private changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      this.parametro = params['id'];
      this.param = parseInt(this.parametro)
    });
    this.apollo
      .watchQuery({
        query: GET_MENSAJES_BY_USER,
        variables: {
          Usuario_id: this.param,
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
              Usuario_id: this.param,
              Administrador_id: administrador,
              Mensaje: this.newMessage,
              Remitente: "Administrador"
            }
          },
        })
        .subscribe(({ data }: any) => {
          console.log(data);
          this.mensajes.push(this.newMessage);
          this.remitentes.push("Administrador")
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
    var contentEND = document.getElementById("content-end").offsetTop;
    this.content.scrollByPoint(0, contentEND);
  }


}
