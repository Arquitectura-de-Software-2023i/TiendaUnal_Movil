import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-envios-admin',
  templateUrl: './envios-admin.page.html',
  styleUrls: ['./envios-admin.page.scss'],
})
export class EnviosAdminPage implements OnInit {
  filteredEnvios: any[] = [];
  searchKeyword: string;
  allEnvios: any[]=[];
  hasEnvios: boolean;
  loading = true;
  error: any;

  constructor(
    private apollo:Apollo,
    private activatedRoute:ActivatedRoute,

    
  ) { }

  ngOnInit() {
    this.fetchEnvios();        
    console.log(this.filteredEnvios);
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
        this.allEnvios = data.allEnvios;
        this.filteredEnvios= data.allEnvios;       
        this.loading = data.loading;
        this.error = data.error;
        //console.log("Fetch allenvios:")     
        //console.log(this.allEnvios);
      });
  };

  handleSearchInputChange(): void {
    console.log(this.searchKeyword)
    if (this.searchKeyword==="") {
      this.filteredEnvios = this.allEnvios;
    }
    else {
      const keyword = this.searchKeyword.toLowerCase();
      this.filteredEnvios = this.allEnvios.filter(allEnvios =>
        allEnvios.id.toString().toLowerCase()===(keyword)
      );
    }
    //console.log("-------Filtered envios-------")
    //console.log(this.filteredEnvios);
  }
  


}
