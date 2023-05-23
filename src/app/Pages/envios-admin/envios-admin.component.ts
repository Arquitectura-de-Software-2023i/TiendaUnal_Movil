import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-envios-admin',
  templateUrl: './envios-admin.component.html',
  styleUrls: ['./envios-admin.component.scss'],
})
export class EnviosAdminComponent  implements OnInit {

  public filteredEnvios: any[] = [];
  searchKeyword: string;
  allEnvios: any[]=[];
  hasEnvios: boolean;
  loading = true;
  error: any;

  updatedEnvios: { [key: number]: any } = {};

  constructor(
    private apollo:Apollo,
    private activatedRoute:ActivatedRoute,    
  ) { }

  ngOnInit() {
    this.fetchEnvios();        
    console.log(this.filteredEnvios);

    this.filteredEnvios.forEach((envio) => {
      this.updatedEnvios[envio.id] = { estado: envio.estado };
    });

  }
  
  //Traer TODOS los envios
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
        this.filteredEnvios=Array.from(data.allEnvios);
        this.loading = data.loading;
        this.error = data.error;
        //console.log("Fetch allenvios:")     
        //console.log(this.allEnvios);
      });
  };

  //Método para hacer update a un envío
  handleChange(e:any, envio:any) {        
    let currentEnvio=envio;
    
    const updatedEnvio={      
      id_cliente: currentEnvio.id_cliente,
      precio_total: currentEnvio.precio_total,
      estado: e.detail.value,
      fecha_creacion: currentEnvio.fecha_creacion,
      fecha_entrega: currentEnvio.fecha_entrega,
    }
    console.log(updatedEnvio);
    this.updateEnvio(envio.id,updatedEnvio);
  }
  
  updateEnvio(id:number,updatedEnvio:any): void {
    this.apollo
      .mutate<any>({
        mutation: gql`
          mutation updateEnvio($id:Int!,$envio:SecondEnvioInput!){
            updateEnvio(id:$id,envio:$envio){
              id,
              id_cliente,
              precio_total,
              estado,
              fecha_creacion,
              fecha_entrega
            }
          }
        `,
        variables:{
          id:id,
          envio:updatedEnvio
        }
      })
      .subscribe(({ data }) => {
        console.log(data.updateEnvio)
        return(data.updateEnvio)
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
