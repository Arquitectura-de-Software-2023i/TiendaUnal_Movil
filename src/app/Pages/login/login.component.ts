import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  Message: any[];

  constructor() { }

  ngOnInit() {
    // this.apollo.query({ query: GET_MESAGGE }).subscribe(result => {
    //   this.Message = result.data['allMessage'] as any;
    // });
  }

}
