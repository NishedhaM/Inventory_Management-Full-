import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {User} from "../../user";
import {UserService} from "../../Service/user.service";
import {Router} from "@angular/router";
import {combineLatestAll} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public showPassword: boolean = false;
  angForm!:FormGroup;
  details={
    id:'',
    name:'',
    email:'',
    password:'',
  }

  confirmPassword: any;

  users!:User[];

  constructor(private userService:UserService,private route:Router,private fb:FormBuilder) {
    //this.createForm();
  }


  ngOnInit(): void {
  }

  register() {
    //TDF form type
          //   if ((this.details.name!='' && this.details.email!='' && this.details.password!='') &&
          //   (this.details.name!=null && this.details.email!=null && this.details.password!=null)){
          //     if(this.confirmPassword == this.details.password){
          //   console.log("Sign up...");
          //   console.log("HI");
          //   this.userService.registerUsers(this.details).subscribe(
          //
          //     (response:any)=>{
          //       this.route.navigate(['login']);
          //     },
          //     error => {
          //       console.log(error);
          //
          //     }
          //   )
          //   //token generate
          //     }else{
          //       alert("Password and confirm are incorrect");
          //     }
          //
          //   }else{
          //   alert("Fields are empty !!");
          // }

//Reactive form type
      if ((this.reactiveform.value.name!='' && this.reactiveform.value.email!='' && this.reactiveform.value.password!='' && this.reactiveform.value.birthDate!='') &&
      (this.reactiveform.value.name!=null && this.reactiveform.value.email!=null && this.reactiveform.value.password!=null && this.reactiveform.value.birthDate!=null)){
        if(this.reactiveform.value.confirmPassword == this.reactiveform.value.password){
      console.log("Sign up...");
      console.log("HI");
      this.userService.registerUsers(this.reactiveform.value).subscribe(

        (response:any)=>{
          this.route.navigate(['login']);
        },
        error => {
          console.log(error);

        }
      )
      //token generate
        }else{
          alert("Password and confirm are incorrect");
        }

      }else{
      alert("Fields are empty !!");
    }



  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }



  //reactive form
  reactiveform=new FormGroup({
    name:new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)]),
    email:new FormControl('',Validators.compose([Validators.required,Validators.email])),
    birthDate:new FormControl('',Validators.required),
    password:new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
      Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'),
    ]),
    confirmPassword:new FormControl('',Validators.required),
  })


  get f(): { [key: string]: AbstractControl } {
    return this.reactiveform.controls;
  }
}
