import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {Location} from '@angular/common';
import { DataService } from '../data.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  responseData: any;
  passwordForm: FormGroup;
  

  constructor(public route: Router, private _location: Location,public service:DataService) {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', )
    })
  }

  save(val) {
console.log(this.passwordForm.value)
console.log(val)
let changeData =
{
 "oldPassword":val.oldPassword,
 "newPassword":val.newPassword,
 "confirmPassword":val.confirmPassword
}
console.log(changeData)
this.service.postApi('admin/changePassword',changeData,1).subscribe( response =>{
  console.log("!@%^&$#^&^&")
  this.responseData = response;
  console.log("succ===>",JSON.stringify(this.responseData))
  console.log(`Login Data====>${JSON.stringify(val)}`);
        if(response['responseCode']==200){
          this.service.showSuccess(response['responseMessage']);
          //       localStorage.setItem('token',this.responseData.data.token)
          // localStorage.setItem('adminId',this.responseData.data._id) 
          console.log('change Password',response['responseMessage'])
          this._location.back();
          // localStorage.token = response[`data`][`token`];
          // localStorage.adminId = response[`data`][`_id`];
          
          
        
        }
        else {
          console.log("else")
         this.service.showError('Invalid  password.')
      }
    }, error=>{
        console.log('error occur',error)
       this.service.showError('Server Error')
      }) 


    // this._location.back();

}

 

  ngOnInit() {
  }
 
}
