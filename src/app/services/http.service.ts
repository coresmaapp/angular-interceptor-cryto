

import { Injectable, inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Producto, ProductoGuardar } from '../models/productos.models'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private http = inject(HttpClient);

  private apiUrl = `http://143.198.224.159:8001/api/productos/`



  constructor() { }

  getProductos(){
    console.log("::::::: Iniciando petition :::::::");
    console.log("Method: GET");
    console.log("Rquest: ");
    console.log('{}');

    return this.http.get<Producto[]>(this.apiUrl)
  }


  create(data: ProductoGuardar){
    console.log("::::::: Iniciando petition :::::::");
    console.log("Method: POST");
    console.log("Rquest: ");
    console.log(data);
    
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    });

    return this.http.post(this.apiUrl, data, { headers: httpHeaders })
  }

  update(id: string, data: ProductoGuardar){

    console.log("::::::: Iniciando petition :::::::");
    console.log("Method: PUT");
    console.log("Rquest: ");
    console.log(id);
    console.log(data);


    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    });

    return this.http.put(`${this.apiUrl}${id}/`, data, { headers: httpHeaders })
  }

  deleteProducto(id: number){
    console.log("::::::: Iniciando petition :::::::");
    console.log("Method: DELETE");
    console.log("Rquest: ");
    console.log(id);


    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    });

    return this.http.delete(`${this.apiUrl}${id}/`,{ headers: httpHeaders })
  }

}
