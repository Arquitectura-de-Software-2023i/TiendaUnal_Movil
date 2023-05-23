import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  userdata:any;
  loading = true;
  error:any;
  rol_user: String

  constructor(
    private apollo:Apollo,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchUserData();
    this.rol_user = localStorage.getItem('Rol')
    console.log(this.rol_user)

  }

  logout(){

    localStorage.clear();
    this.router.navigate(['/login'])


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

  fetchUserData(): void {
    this.apollo
      .query<any>({
        query: gql`
          query cuentaById($id: Int!) {
            cuentaById(id: $id) {
              id,
              idUser,
              lastName,
              firstName,
              phoneNumber,
              address,
              birth,
              timeCreated,
              city
            }
          }
        `,
        variables: {
          id: this.getUserIDDataFromLocalStorage()
        }
      })
      .subscribe(({ data }) => {
        this.userdata = data.cuentaById;
        this.loading = data.loading;
        this.error = data.error;
        console.log("----userdata:----")
        console.log(this.userdata);
      });
  };


}
