import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


const CREATE_USER_WITH_ACCOUNT = gql`
mutation createUser($userInput: userInput!, $userExtra: userExtra) {
  createUser(user: $userInput, userExtra: $userExtra) {
    idUsuario
    username
    idRol
    password
    email
  }
}

`;

interface account {
  username: string,
  idRol: number,
  password: string,
  email: string,

  lastName: string,
  firstName: string,
  phoneNumber: string,
  address: string,
  city: string,

}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})



export class RegisterComponent implements OnInit {


  cuenta: account = {

    username: '',
    idRol: 1,
    password: '',
    email: '',

    lastName: '',
    firstName: '',
    phoneNumber: '',
    address: '',
    city: '',


  }

  constructor(public apollo: Apollo, private alertController: AlertController, private router: Router) { }

  div_nombres = false
  div_ciudad = true
  div_pass = true
  ngOnInit() { }


  Name_to_city() {
    this.div_nombres = true
    this.div_ciudad = false
    this.div_pass = true
  }

  City_to_pass() {
    this.div_nombres = true
    this.div_ciudad = true
    this.div_pass = false
  }

  register() {

    this.apollo
    .mutate({
      mutation: CREATE_USER_WITH_ACCOUNT,
      variables: {
        userInput:{

          username:this.cuenta.username ,
          idRol: this.cuenta.idRol,
          password: this.cuenta.password,
          email: this.cuenta.email,

        },

        userExtra:{
          lastName: this.cuenta.lastName,
          firstName: this.cuenta.firstName,
          phoneNumber: this.cuenta.phoneNumber,
          address: this.cuenta.address,
          city: this.cuenta.city

        }
      },
    })
    .subscribe((result:any) => {
      this.presentAlert()
      this.router.navigate(['/home'])
      localStorage.setItem("userID", result.data?.createUser.idUsuario );




    },
    
    err =>{
      console.log(err)
      this.Err()
    }
    );


  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Cuenta creada',
      subHeader: 'Tu cuenta fue creada con exito',
      message: 'Disfruta de la app',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async Err() {
    const alert2 = await this.alertController.create({
      header: 'Cuenta no creada',
      subHeader: 'Tu cuenta no pudo ser creada',
      buttons: ['OK'],
    });

    await alert2.present();
  }
  
}
