import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../product";
import {Observable} from "rxjs";
import {HomeComponent} from "../components/home/home.component";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  editProId:any;

  private baseUrl = "http://localhost:8082/products";
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }


  addProducts(proDetails:any){
    console.log(proDetails);
    return this.http.post(`${this.baseUrl}`,proDetails);
  }

  editProducts(id:any,proDetails:any)
  {
    console.log(proDetails);
    console.log(id);
    return this.http.put(`${this.baseUrl}`+`/`+id,proDetails);
  }

  deleteProducts(proId:any){
    console.log(proId);
    return this.http.delete(`${this.baseUrl}`+`/`+proId);

  }

  searchProducts(searchName: any,brandName:any,typeName:any):Observable<Product[]> {
    console.log("brand",brandName);
    console.log("name",searchName);
    return this.http.get<Product[]>(`${this.baseUrl}`+`/`+`search?name=`+searchName+`&brand=`+brandName+`&type=`+typeName);

  }
}
