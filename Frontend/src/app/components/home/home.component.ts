import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from "../../Service/product.service";
import {Product} from "../../product";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {FormControl, FormGroup} from "@angular/forms";
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";
import {User} from "../../user";
import {UserService} from "../../Service/user.service";

export interface DialogData {
  name: string;
}

export interface PeriodicElement {
  name: string;
  id: number;
  price: number;
  quantity: number;
  // manager:number;

}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username:any;
  proId:any;
  userId:any;
  products!:Product[];
  searchName:any;
  productName: any;
  productBrand: any;
  more:any;
  start:any;
  i: any;
  user:any;
  users!:User[];
  userid:any;

  private dialogRef: any;
  private productIId: any;


  constructor(private router: Router,private productService: ProductService,public dialog: MatDialog,private userService: UserService) { }

  ngOnInit(): void {
    this.start=0;
    this.more=5;
    this.username=localStorage.getItem("username");
   // localStorage.setItem('username',this.username);
    console.log(this.username);
    this.productService.getProducts().subscribe((data: Product[]) =>{
      console.log(data);
      this.products = data;
    });


  }



  addClick () {
    localStorage.getItem('auth');
    this.router.navigate(['/add']);
  };

  logout(){
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

  navEdit(id:any) {
    this.proId=id;
    this.router.navigate(['/edit'],{state: {data:this.proId}});
  }

  // navDelete(id:any) {
  //   this.proId=id;
  //   console.log("id---",this.proId);
  //   this.productService.deleteProducts(this.proId).subscribe(
  //
  //     (response:any)=>{
  //       //console.log("deleted");
  //       this.router.navigate(['home'])
  //         .then(() => {
  //           window.location.reload();
  //         });
  //     },
  //     error => {
  //       console.log(error);
  //
  //     }
  //   )
  // }


  // doSearch() {
  //   console.log(this.productName,this.productBrand);
  //   this.productService.searchProducts(this.productName,this.productBrand).subscribe((data:Product[]) =>{
  //     this.products=data;
  //     this.start=0;
  //     console.log(this.products);
  //   });
  // }


  moreAction() {
    this.start=0;
    this.more=this.more+5;
    //console.log(this.more);
  }

  lessAction() {
    this.start=0;
    this.more=this.more-5;
    //console.log(this.more);
    //console.log(this.start);
  }


  clear() {
    this.router.navigate(['home'])
      .then(() => {
        window.location.reload();
      });
}

  openDialog(id: any) {
    this.proId=id;
    //console.log("my",this.proId);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: this.proId},


    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  addSearch() {
    localStorage.getItem('auth');
    this.router.navigate(['/search']);
  }

  editUser() {
    //this.userId=id;

    const dialogRef = this.dialog.open(EditUserDialogComponent, {

      width: '23%',
      //data: {name: this.userid},


    });
    //console.log("my",this.userid);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}



