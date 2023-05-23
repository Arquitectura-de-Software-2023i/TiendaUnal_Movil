import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-buttons',
  templateUrl: './barra-buttons.component.html',
  styleUrls: ['./barra-buttons.component.scss'],
})
export class BarraButtonsComponent  implements OnInit {
  data:any
  rol_user: String

  constructor(public router: Router) { }

  ngOnInit(    
  ) {

    this.rol_user = localStorage.getItem('Rol')
    console.log(this.rol_user)

  }

  getUserIDDataFromLocalStorage() {
    const userID = localStorage.getItem('userID');
    if (userID) {
      //console.log('Retrieved data:', userID);
      return userID;      
    } else {
      //console.log('No data found in Local Storage');
      return null;      
    }
  }
  

}
