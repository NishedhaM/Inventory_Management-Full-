import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import { MyMaterialModule } from  './material.module';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import { LandingComponent } from './components/landing/landing.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { AddItemComponent } from './components/add-item/add-item.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {SearchComponent} from "./components/search/search.component";
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { PaginationComponent } from './components/pagination/pagination.component';
import {MatSortModule} from "@angular/material/sort";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    LandingComponent,
    AddItemComponent,
    EditProductComponent,
    DialogComponent,
    SearchComponent,
    EditUserDialogComponent,
    PaginationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MyMaterialModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      {path: '', component: LandingComponent},
      {path: 'register', component: SignupComponent},
      {path: 'login', component: LoginComponent},
      {path: 'home', component: HomeComponent},
      {path: 'add', component: AddItemComponent},
      {path: 'edit', component: EditProductComponent},
      {path: 'dialog', component: DialogComponent},
      {path: 'search', component: SearchComponent},
      {path: 'editUser', component: EditUserDialogComponent},
      {path: 'pagination', component: PaginationComponent},


    ]),
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
