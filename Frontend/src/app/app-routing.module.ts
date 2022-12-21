import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {HomeComponent} from "./components/home/home.component";
import { MatSliderModule } from '@angular/material/slider';
import {AddItemComponent} from "./components/add-item/add-item.component";
import {EditProductComponent} from "./components/edit-product/edit-product.component";
import {AuthGuard} from "./Guard/auth.guard";
import {DialogComponent} from "./components/dialog/dialog.component";
import {SearchComponent} from "./components/search/search.component";
import {EditUserDialogComponent} from "./components/edit-user-dialog/edit-user-dialog.component";
import {PaginationComponent} from "./components/pagination/pagination.component";


const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"home", component: HomeComponent,canActivate:[AuthGuard]},
  {path:"add",component:AddItemComponent,canActivate:[AuthGuard]},
  {path:"edit",component:EditProductComponent,canActivate:[AuthGuard]},
  {path:"dialog",component:DialogComponent,canActivate:[AuthGuard]},
  {path:"search",component:SearchComponent,canActivate:[AuthGuard]},
  {path:"editUser",component:EditUserDialogComponent,canActivate:[AuthGuard]},
  {path:"pagination",component:PaginationComponent,canActivate:[AuthGuard]},
  {
    path:"user",
    loadChildren:()=>import('./user/user.module').then(x=>x.UserModule)
  },







];

@NgModule({
  imports: [RouterModule.forRoot(routes),MatSliderModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
