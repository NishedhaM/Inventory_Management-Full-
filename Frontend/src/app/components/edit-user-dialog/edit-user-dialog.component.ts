import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../user";
import {UserService} from "../../Service/user.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../home/home.component";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  public showPassword: boolean = false;
  angForm!:FormGroup;
  details={
    id:'',
    name:'',
    email:'',
    password:'',
  }

  confirmPassword: any;
  id:any;

  users!:User[];

  constructor(private userService:UserService,private route:Router,private fb:FormBuilder,public dialogRef: MatDialogRef<EditUserDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  reactiveform=new FormGroup({
    name:new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)]),
    email:new FormControl('',Validators.compose([Validators.required,Validators.email])),
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



  editUser()
  { this.userService.getUserId(localStorage.getItem("username")).subscribe(

    (response:any)=>{

      console.log(response.id);
      this.id=response.id;
      //this.username=response.name;
      //this.route.navigate(['home']);
      console.log("Edit up...");
      console.log("HI");
      console.log("sdkndjk",this.id);
      this.userService.editUsers(this.id,this.reactiveform.value).subscribe(

        (response:any)=>{
          console.log("Bye");
          localStorage.removeItem("username");
          localStorage.setItem("username",response.name);
          this.dialogRef.close();
          window.location.reload();

        },
        error => {
          console.log(error);

        }
      )

    },
    error => {
      console.log(error);

    }
  )


        //token generate

  }

  public togglePasswordVisibility(): void {
      this.showPassword = !this.showPassword;
    }

  onNoClick() {
    this.dialogRef.close();



  }

}
