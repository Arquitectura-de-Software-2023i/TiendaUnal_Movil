import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  constructor() { }

  div_nombres = false 
  div_ciudad = true
  div_pass = true
  ngOnInit() {}


  Name_to_city(){
    this.div_nombres = true 
    this.div_ciudad = false
    this.div_pass = true
  }

  City_to_pass(){
    this.div_nombres = true 
    this.div_ciudad = true
    this.div_pass = false
  }
}
