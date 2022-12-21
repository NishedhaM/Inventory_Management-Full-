import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import {ProductService} from "../../Service/product.service";
import {DialogData} from "../home/home.component";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  private proId: any;
 // data: any;

  constructor(public dialog: MatDialog,private router: Router,private productService: ProductService, public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }



  navDelete(id:any) {
    this.proId=id;
    console.log("id---",this.proId);
    this.productService.deleteProducts(this.proId).subscribe(

      (response:any)=>{
        //console.log("deleted");
        //this.router.navigate(['home'])
        //   .then(() => {
            window.location.reload();
          // });
      },
      error => {
        console.log(error);

      }
    )
  }

  onNoClick() {
    this.dialogRef.close();

  }
}
