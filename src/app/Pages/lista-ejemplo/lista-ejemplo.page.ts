import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-ejemplo',
  templateUrl: './lista-ejemplo.page.html',
  styleUrls: ['./lista-ejemplo.page.scss'],
})
export class ListaEjemploPage implements OnInit {

  characters: any=[]
  constructor(
    private http:HttpClient,
  ) { }

  ngOnInit() {
    this.http.get<any>("https://rickandmortyapi.com/api/character")
    .subscribe(res=>{
      console.log(res);
      this.characters=res.results;
    })
  }
  expandDetails(character: any): void {
    character.expanded = true;
  }
  
  collapseDetails(character: any): void {
    character.expanded = false;
  }
  

}
