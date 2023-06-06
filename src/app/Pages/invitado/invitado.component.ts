import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Apollo, gql } from 'apollo-angular';
import { Console } from 'console';


interface UserInput {
  Email: string;
}

const GET_EMAILS = gql`
query {
  allEmails {
    email

 }
}
`;


@Component({
  selector: 'app-invitado',
  templateUrl: './invitado.component.html',
  styleUrls: ['./invitado.component.scss'],

})

export class InvitadoComponent implements OnInit {

  usuario: UserInput = {
    Email: '',
  };

  Emails: any[] = [];


  constructor(private toastController: ToastController, private apollo: Apollo, private alertController: AlertController, private router: Router) { }

  ngOnInit() { }

  login() {



    this.apollo.watchQuery({
      query: GET_EMAILS,
    }).valueChanges.subscribe((result: any) => {
      const emails = result.data?.allEmails;
      this.Emails = emails;
    
      console.log(this.Emails)
      // Buscar un elemento en this.Emails
      
      console.log(this.usuario.Email)

      const elementoBuscado = this.Emails.find((email) => email.email === this.usuario.Email);

      if (elementoBuscado) {
        // El elemento ha sido encontrado
        console.log("Elemento encontrado:", elementoBuscado);
        this.router.navigate(['/home'])
        localStorage.setItem("Rol", "NoRol" );

        this.ToastOk('bottom')

      } else {
        // El elemento no ha sido encontrado
        console.log("Elemento no encontrado");


        this.ToastErr('bottom')
      }
    });
    

  }


  async ToastOk(position: 'bottom') {
    const toast = await this.toastController.create({
      message: 'Bienvenido invitado',
      duration: 1500,
      position: position,
      color: 'success',
      cssClass: 'custom-toast'

    });

    await toast.present();
  }

  async ToastErr(position: 'bottom') {
    const toast = await this.toastController.create({
      message: 'Verifica los datos!',
      duration: 1500,
      position: position,
      color: 'danger',
      cssClass: 'custom-toast'

    });

    await toast.present();
  }

  invitado() {

    this.router.navigate(['/login-invitado'])

  }
}