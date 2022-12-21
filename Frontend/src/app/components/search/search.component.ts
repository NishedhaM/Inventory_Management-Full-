import { Component, OnInit } from '@angular/core';
import {Product} from "../../product";
import {Router} from "@angular/router";
import {ProductService} from "../../Service/product.service";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  username:any;
  proId:any;
  products!:Product[];
  searchName:any;
  productName: any;
  productBrand: any;
  productType:any;
  more:any;
  start:any;
  i: any;

  private dialogRef: any;
  private productIId: any;

  constructor(private router: Router,private productService: ProductService,public dialog: MatDialog) { }

  ngOnInit(): void {

    this.start=0;
    this.more=5;
    this.username=history.state.data;
    console.log(this.username);
    this.productService.getProducts().subscribe((data: Product[]) =>{
      console.log(data);
      this.products = data;
    });

  }


  doSearch() {
    console.log(this.productName,this.productBrand,this.productType);
    this.productService.searchProducts(this.productName,this.productBrand,this.productType).subscribe((data:Product[]) =>{
      this.products=data;
      //this.start=0;
      console.log(this.products);
    });
  }


  clear(){
    this.router.navigate(['search'])
      .then(() => {
        window.location.reload();
      });
  }

  logout(){
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }


  searchMore() {
    this.start=0;
    this.more=this.more+5;
  }

  searchEdit(id:any) {
    this.proId=id;
    this.router.navigate(['/edit'],{state: {data:this.proId}});
  }

  openDialog(id: number) {
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

  pagination() {
    this.router.navigate(['/pagination']);

  }
}
