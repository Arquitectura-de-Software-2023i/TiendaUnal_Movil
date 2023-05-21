import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-envios-admin',
  templateUrl: './envios-admin.page.html',
  styleUrls: ['./envios-admin.page.scss'],
})
export class EnviosAdminPage implements OnInit {
  envios: any[]=[];
  hasEnvios: boolean;
  loading = true;
  error: any;

  constructor(
    private apollo:Apollo,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchEnvios();
  }

  
  fetchEnvios(): void {
    this.apollo
      .query<any>({
        query: gql`
          query allEnvios{
            allEnvios{
              id,
              id_cliente,
              precio_total,
              estado
              fecha_creacion
              fecha_entrega
            }
          }
        `
      })
      .subscribe(({ data }) => {
        this.envios = data.allEnvios;        
        this.loading = data.loading;
        this.error = data.error;        
        console.log(this.envios);
      });
  };


}
