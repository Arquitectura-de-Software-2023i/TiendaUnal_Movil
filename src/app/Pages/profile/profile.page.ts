import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    
  }

}
