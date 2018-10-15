import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userDetail: any={userName:'',email:'',mobileNumber:''};
  userId: string;
  formgroup: FormGroup;
  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder, public route: Router,public service:DataService) {
    
    
    console.log(localStorage.getItem("_id"))}

  ngOnInit() {
    this.userId = localStorage.getItem('UserId');
    this.userForm= new FormGroup({
    'userName':new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z\s]+$/i)]),
    'email':new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
    'mobile':new FormControl('',[Validators.required,Validators.pattern(/^[7-9][0-9\s]+$/i),Validators.minLength(10),Validators.maxLength(16)]),
    // 'password':new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z\s]+$/i)])
      })
      this.viewUserData();
  }
 viewUserData(){
   let viewData ={
     "userId":this.userId
   }
 console.log('change status _id>>>>>>', viewData)
this.service.postApi('admin/getUserInfo', viewData, 1).subscribe(response => {
   

  console.log(`Login Data====>${JSON.stringify(response)}`);
  if (response['responseCode'] == 200) {
  this.userDetail = response.data ;
    // this.route.navigateByUrl('manage-user');

    // alert("Success")
}

}, errr=>{
console.log("forgot api error============>>>>>>>>.")
});

 }
 userdata(formValue){
    console.log("Edit Form---> ",formValue)
     let delData ={
      "userId":this.userId,
      "userName":formValue.userName,
     "email":formValue.email,
     "mobileNumber":formValue.mobile
    }
    
  // console.log('change status _id>>>>>>', delData)
  this.service.postApi('admin/editUser', delData, 1).subscribe(response => {
   

    // console.log(`Login Data====>${JSON.stringify(response)}`);
    if (response['responseCode'] == 200) {
      this.service.showSuccess("updated successfully.")

      this.route.navigateByUrl('manage-user');

      // alert("Success")
  }

}, errr=>{
  console.log("forgot api error============>>>>>>>>.")
});

}


back(){

  this.route.navigateByUrl('manage-user');

}

}
