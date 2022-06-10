import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ProdServiceService {

  api = config.API_URL;

  prodURL='https://crud-products-management-default-rtdb.firebaseio.com/products.json';

  private headers = new HttpHeaders({
    'Content-Type' : 'CRUDapplication/json'
  })
  constructor(private http : HttpClient) { }

  saveProduct(products:any[]){
    return this.http.put(this.prodURL,products,{headers:this.headers})
  }

  fetchProducts(){
    return this.http.get(this.prodURL);
  }

  fetchTitle(){
    return this.http.get('https://crud-products-management-default-rtdb.firebaseio.com/dataTitle.json')
  }


}
