import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';

// const CREATE_USER_WITH_ACCOUNT = gql`
// mutation{
//   createUser(user: {$username: String!
//     $idRol: Int!
//     $password: String!
//     $email: String!
//       }userExtra: {
//         lastName 
//         firstName
//         phoneNumber 
//         address 
//         city
//     }){
//       idUsuario
//       username
//       idRol
//       password
//       email
//   }
// }

// `;

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

  constructor() { }

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
    console.log(this.cuenta)
  }
}
