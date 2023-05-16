import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_MESAGGE = gql`
  query {
    allMessage{
      _id
      Mensaje
      Usuario_id

    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  Message: any[];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    // this.apollo.query({ query: GET_MESAGGE }).subscribe(result => {
    //   this.Message = result.data['allMessage'] as any;
    // });
  }

}
