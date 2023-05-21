import { Component, OnInit } from '@angular/core';
import { userInfo } from 'os';

interface user  {
  user: string  
  password: string

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  Message: any[];
  usuario: user = {
    user: '',
    password: ''
  }
  
  constructor() { }

  ngOnInit() {
    
  }

  login(){
    console.log(this.usuario)
  }

}
