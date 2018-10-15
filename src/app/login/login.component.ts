import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  responseData: any;
  formgroup: FormGroup;

  constructor(private formBuilder: FormBuilder, public route: Router,public service:DataService) {

    this.formgroup= formBuilder.group({
      email:['',Validators.compose([Validators.required,Validators.pattern(/^[A-Z0-9_-]+([\.-][A-Z0-9_-]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,4})+$/i)])],
      pass: ['',Validators.required]
   });
   }
   login(val){
    console.log(this.formgroup.value)
    console.log(val)
let logindata =
{
 "email":val.email,
  "password":val.pass,
  "userType": "SUPERADMIN",

 }
console.log(logindata)
    this.service.postApi('admin/login',logindata,0).subscribe( response =>{
this.responseData = response;
// console.log("succ===>",JSON.stringify(this.responseData))
// console.log(`Login Data====>${JSON.stringify(val)}`);
      if(response['responseCode']==200){
        this.service.showSuccess(response['responseMessage']);
              localStorage.setItem('token',this.responseData.data.token)
        localStorage.setItem('adminId',this.responseData.data._id) 
        console.log('successfully login',response['responseMessage'])
        this.route.navigate(['/dashboard']);
        // localStorage.token = response[`data`][`token`];
        // localStorage.adminId = response[`data`][`_id`];
        
        
      
      }
      else {
        this.service.showError('Invalid email or password.')
        console.log("else")
      //  this.service.showError('Invalid email or password.')
    }
  }, error=>{
      console.log('error occur',error)
     this.service.showError('Server Error')
    })  
    }

  ngOnInit() {
  }

  forgotPassword(){
    this.route.navigate(['/forgot-password'])
  }
}
