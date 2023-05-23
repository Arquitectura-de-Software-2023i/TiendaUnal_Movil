import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_CATEGORIAS = gql`
query {
  allCategories{
  idCategoria
  nombre
  }
}
`;


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent  implements OnInit {
  categorias: any[] = [];
  loading = true;
  error: any;
  lastIndex: number;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_CATEGORIAS,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(this.categorias);
        this.categorias = result.data?.allCategories.map(
          (item: any) => item.nombre
        );
        this.loading = result.loading;
        this.error = result.error;
        console.log(this.categorias);
        this.lastIndex = this.categorias.length -1;

        });
  }

}
