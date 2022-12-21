import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../product";
import {User} from "../user";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl="http://localhost:8081/users";

  constructor(private http:HttpClient) {

  }

  // ProceedLogin(inputdata:any){
  //   return this.http.post('https://petstore.swagger.io/v2/user/login?username=Nishedha&password=1234',inputdata)
  // }
  //
  // IsLoggedIn(){
  //   return localStorage.getItem('token' )!=null;
  // }
  //
  // GetToken(){
  //   return localStorage.getItem('token')!=null?localStorage.getItem('token'):'';
  // }

  loginUsers(credentials:any){
        console.log(credentials);
        console.log("name",credentials.name);
        localStorage.setItem('auth',credentials);
        return this.http.post(`${this.baseUrl}/login`,credentials);
  }

  IsLoggedIN(){
   return localStorage.getItem('auth')!=null;
  }

  registerUsers(details:any){
      console.log(details);
      return this.http.post(`${this.baseUrl}`,details);
  }

  editUsers(id:any,details:any){
    return this.http.put(`${this.baseUrl}`+`/`+id,details);
  }

  getUserId(name:any): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}`+`/username/`+name);
  }



}


