import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss'],
})
export class EnviosComponent implements OnInit {
  userid: String;
  envios: any[]=[];
  hasEnvios: boolean;
  loading = true;
  error: any;

  constructor(
    private apollo:Apollo,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.userid=this.activatedRoute.snapshot.paramMap.get('userid')
    console.log("Userid: "+this.userid);
    this.fetchEnvios();
    console.log("hasEnvios "+this.hasEnvios);

    
    console.log("producto ",this.fetchProducto(1));
  }  

  fetchEnvios(): void {
    this.apollo
      .query<any>({
        query: gql`
          query envioByIdCliente($idcliente: Int!) {
            envioByIdCliente(idcliente: $idcliente) {
              id,
              id_cliente,
              precio_total,
              estado
              fecha_creacion
              fecha_entrega
            }
          }
        `,
        variables: {
          idcliente: this.userid
        }
      })
      .subscribe(({ data }) => {
        this.envios = data.envioByIdCliente;        
        this.loading = data.loading;
        this.error = data.error;
        
        if (this.envios.length === 0) {
          this.hasEnvios = false;
        } else {
          this.hasEnvios = true;
          this.envios.forEach((envio) => {
            this.fetchEnvioDetalle(envio.id);
          });
        }
        console.log(this.envios);
      });
  };

  fetchEnvioDetalle(idenvio: number): void {
    this.apollo
      .query<any>({
        query: gql`
          query envioDetalleByIdEnvio($idenvio: Int!) {
            envioDetalleByIdEnvio(idenvio: $idenvio) {
              id_producto,
              cantidad,
              subtotal
            }
          }
        `,
        variables: {
          idenvio: idenvio
        }
      })
      .subscribe(({ data }) => {
        //console.log(data.envioDetalleByIdEnvio)
        this.envios = this.envios.map(envio => {
          if (envio.id === idenvio) {
            const updatedEnvio = {
              ...envio,
              details: data.envioDetalleByIdEnvio
            };
            console.log('Updated envio:', updatedEnvio);
            return updatedEnvio;
          }
          return envio;
        });
      });
  };
  
  fetchProducto(idProducto: number): void {
    this.apollo
      .query<any>({
        query: gql`
          query productById($id: Int!){
            productById(id: $id){              
              nombre              
            }
          }
        `,
        variables: {
          id: idProducto
        }
      })
      .subscribe(({ data }) => {
        console.log(data.productById);
        return(data.productById);
      });
  };

}
