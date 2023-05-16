import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from 'express';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  
  constructor(public location: Location) {}
  
  ngOnInit(): void {
   
  }


  
}
