import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-buttons',
  templateUrl: './barra-buttons.component.html',
  styleUrls: ['./barra-buttons.component.scss'],
})
export class BarraButtonsComponent  implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}

}
