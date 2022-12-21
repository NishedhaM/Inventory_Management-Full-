import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductService} from "../../Service/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {


  proDetails={
    proName:'',
    quantity:'',
    price:'',
    brand:'',
    type:'',
  }

  onSelected(value:string): void {
    this.proDetails.proName = value;
  }

  constructor(private proService:ProductService,private route:Router) { }

  ngOnInit(): void {
    //localStorage.clear();

  }

  AddItem(f: NgForm) {

  }

  addProduct() {
   // console.log("pro",this.proDetails.proName);
    if (( this.proDetails.proName!='' && this.proDetails.price!='' && this.proDetails.quantity!='') &&
      (this.proDetails.proName!=null && this.proDetails.price!=null && this.proDetails.quantity!=null)){
      console.log("add up...");
      this.proService.addProducts(this.proDetails).subscribe(

        (response:any)=>{
          alert("Added Successfully");
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
