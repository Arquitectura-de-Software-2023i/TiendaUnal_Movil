import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ToastController } from '@ionic/angular';


const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      idUsuario
      username
      idRol
      password
      email
    }
  }
`;


interface UserInput {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: UserInput = {
    username: '',
    password: ''
  };

  constructor(private toastController: ToastController, private apollo: Apollo, private alertController: AlertController, private router: Router) {}

  ngOnInit() {}

  login() {
    this.apollo
      .mutate({
        mutation: LOGIN_USER,
        variables: {
          username: this.usuario.username,
          password: this.usuario.password
        }
      })
      .subscribe(
        (result: any) => {
          console.log(result);
          this.ToastOk('bottom')
          console.log(result.data?.login.idRol)
          localStorage.setItem("userID", result.data?.login.idUsuario );
          localStorage.setItem("Rol", result.data?.login.idRol );
          this.router.navigate(['/home'])

        },
        err => {
          console.log(err);
          this.ToastErr('bottom')
        }
      );
  }


  async ToastOk(position: 'bottom') {
    const toast = await this.toastController.create({
      message: 'Bienvenido de nuevo!',
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

}