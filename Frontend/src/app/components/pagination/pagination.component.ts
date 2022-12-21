import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../Service/product.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../product";
import {MatSort} from "@angular/material/sort";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";




@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  productName: any;
  productBrand: any;
  productType:any;
  displayedColumns: string[] = ['id','proName', 'price', 'quantity', 'brand','type','action1','action2'];
  dataSource :any;
  proData:any;
  products:any;
  proId:any;

  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private router: Router,private productService:ProductService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.productService.getProducts().subscribe(result =>{
      this.proData=result;
      this.dataSource=new MatTableDataSource<Product>(this.proData)
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;

    });
  }

  logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

  doSearch() {
    console.log(this.productName,this.productBrand,this.productType);
    this.productService.searchProducts(this.productName,this.productBrand,this.productType).subscribe((data:Product[]) =>{
      this.proData=data;
      this.dataSource=new MatTableDataSource<Product>(this.proData)
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  clear() {
    this.router.navigate(['pagination'])
      .then(() => {
        window.location.reload();
      });
  }

  filterEvent(event: Event) {
    const filValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filValue;

  }

  // getrow(row:any) {
  //   console.log(row);
  // }

  functionEdit(id:any) {
    console.log(id);
    //console.log(details);
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
}
