import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../Service/product.service";
import {Router} from "@angular/router";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


  proDetails={
   // id:'',
    proName:'',
    price:'',
    quantity:'',
    brand:'',
    type:'',
  }

  onESelected(value:string): void {
    this.proDetails.proName = value;
  }

  editId:any;
  constructor(private productService:ProductService,private route:Router) { }

  ngOnInit(): void {
    console.log(history.state.data);
    this.editId=history.state.data;
  }

  editProduct() {
    if (( this.proDetails.proName!='' && this.proDetails.price!='' && this.proDetails.quantity!='' && this.proDetails.brand!='') &&
      (this.proDetails.proName!=null && this.proDetails.price!=null && this.proDetails.quantity!=null && this.proDetails.brand!=null)){
      console.log("Edit...");
      this.productService.editProducts(this.editId,this.proDetails).subscribe(

        (response:any)=>{
          alert("Changes has been applied");
          this.route.navigate(['home']);
        },
        error => {
          console.log(error);

        }
      )
      //token generate
    }else{
      console.log("Fields are empty !!");
    }

  }

  logout() {
    localStorage.removeItem('auth');
    this.route.navigate(['']);
  }


}
