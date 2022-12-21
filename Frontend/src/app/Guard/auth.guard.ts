import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../Service/user.service";
import {state} from "@angular/animations";
import {LoginComponent} from "../components/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService,private rout:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return false;
    if (this.userService.IsLoggedIN()){
      //console.log("Auth",this.login.auth);
      return true;
    }else{
      alert("Please login to the system using user name and passwords");
      this.rout.navigate(['login']);
      return false;
    }
  }

}
