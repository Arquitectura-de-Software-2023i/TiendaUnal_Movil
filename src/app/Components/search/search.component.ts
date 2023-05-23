import { Component, OnInit } from '@angular/core';
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

  constructor(
    private apollo:Apollo,
  ) { }

  ngOnInit() {
    this.fetchUserData();
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
