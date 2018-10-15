import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  formgroup: FormGroup;
  constructor(private formBuilder: FormBuilder, public route: Router,public service:DataService) {
    this.formgroup= formBuilder.group({
      email:['',Validators.compose([Validators.required,Validators.pattern(/^[A-Z0-9_-]+([\.-][A-Z0-9_-]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,4})+$/i)])]
  
   });
   }
  submit(val){
    console.log(this.formgroup.value)
    console.log(val)
let submitdata =
{
 "email":val.email,
 "userType": "SUPERADMIN"
 }
console.log(submitdata)
    this.service.postApi('admin/forgot',submitdata,0).subscribe( response =>{
    console.log("in forgot api------->")
    console.log(`forgot Data====>${JSON.stringify(val)}`);
      if(response['responseCode']==200){
        // console.log('successfully login',response['responseMessage'])
       
        
         this.service.showSuccess(response['responseMessage'])
         this.route.navigate(['/login'])
      
      }
      else {
        console.log("else")
       this.service.showError('Email Id does not exists.')
    }
  }, error=>{
      console.log('error occur',error)
     this.service.showError('Server Error')
    })  
    }
  ngOnInit() {
  }

}
