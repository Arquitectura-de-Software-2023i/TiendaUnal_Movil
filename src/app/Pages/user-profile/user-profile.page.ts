import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userid:String;
  userdata:any;
  loading = true;
  error:any;

  constructor(
    private apollo:Apollo,
    private activatedRoute:ActivatedRoute,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.userid=this.activatedRoute.snapshot.paramMap.get('userid');
    console.log(this.userid);
    this.fetchUserData();
  }

  goToEnvios() {
    this.navCtrl.navigateForward('/envios/'+this.userid);
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
          id: this.userid
        }
      })
      .subscribe(({ data }) => {
        this.userdata = data.cuentaById;
        this.loading = data.loading;
        this.error = data.error;
        console.log("userdata: ")
        console.log(this.userdata);

      });
  };

  

}
