import {Component, DoCheck} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl:
    './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  constructor(private route:Router) {
  }
  title = 'InventoryManagement';
  isMenuVisible=true;


  ngDoCheck(): void {
    const currentroute=this.route.url;
    if(currentroute=='/home' || currentroute=='/add' || currentroute=='/edit' || currentroute=='/search' || currentroute=='/pagination'){
      this.isMenuVisible=false;
    }else{
      this.isMenuVisible=true;
    }
  }

}
