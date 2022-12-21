import { Component, OnInit } from '@angular/core';
import {UserService} from "../../Service/user.service";
import {Router} from "@angular/router";
import {User} from "../../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public auth:boolean=true;
  public showPassword: boolean = false;
  credentilas={
    name:'',
    password:'',
  }

  users!:User[];
  constructor(private userService:UserService,private route:Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }
  // respdata:any;

  // ProceedLogin(logindata:any) {
  //   //without getting JWT token
  //   // this.route.navigate(['home'])
  //   console.log("form submitted");
  //   console.log(logindata.valid);
  //   console.log(logindata.value);



    // if(logindata.valid){//this item does not work
    // this.service.ProceedLogin(logindata.value).subscribe(item=> {
    //   this.respdata=item;
    //   if(this.respdata!=null){
    //     localStorage.setItem('token',this.respdata.jwtToken);
    //     this.route.navigate(['home'])
    //   }else{
    //     alert("Login Failed");
    //   }
    // });
    // }
  //}

  RedirectRegister() {
    this.route.navigate(['register'])

  }

  onSubmit(){
    //console.log("ok");

    if((this.credentilas.name!=''&& this.credentilas.password!='') && (this.credentilas.name!!=null && this.credentilas.password!=null)){
      console.log("HI");
      this.userService.loginUsers(this.credentilas).subscribe(

        (response:any)=>{
         console.log(response);
         if(response.statusCode=="OK"){
           this.route.navigate(['home'],{ state: {data: this.credentilas.name} });
           localStorage.setItem("username",this.credentilas.name );
          // localStorage.getItem("token");
         }else{
           alert("Your username or password is incorrect!")
         }
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

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
