import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
 declare var $:any;
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  responseData: any;
  constructor(public route: Router,public service:DataService) { }

yes()
{
let changeData =
{
"_id":localStorage.getItem('adminId')

}
  this.service.postApi('admin/logout',changeData,0).subscribe( response =>{
    console.log("!@%^&$#^&^&")
    this.responseData = response;
    console.log("succ===>",JSON.stringify(this.responseData))
  
          if(response['responseCode']==200){
            $('#logout').modal('hide');
            localStorage.removeItem('adminId')
                 localStorage.removeItem('token')
            this.service.showSuccess(response['responseMessage']);
                  
                     this.route.navigate(['/login']);
                    
          
          }
          else if(response['responseCode']==404){
            localStorage.removeItem('adminId')
            localStorage.removeItem("token")
            this.route.navigateByUrl('login')

          }
          else {
            console.log("else")
          this.service.showError('Id not found.')
        }
      }, error=>{
          console.log('error occur',error)
         this.service.showError('Server Error')
        }) 

}





  ngOnInit() {
  }

}
