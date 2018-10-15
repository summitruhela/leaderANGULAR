import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  responseData: any;
  userData: any;
  userData1: any;
    constructor(private router: Router,public service:DataService) {}

    ngOnInit() {
    this.userDetails()
    this.announcement()
    }

    userDetails() {
    this.service.getApi(`admin/countUser`,1).subscribe(response => {
      this.responseData = response;
      console.log('res')
      if (response['responseCode'] == 200) {
        console.log('data found successfully',response)
           this.userData = response['data'];
             console.log("Data--> ",JSON.stringify(this.userData));
            //this.router.navigateByUrl('manage-user');  
     }
      else {
        this.service.showError(response['responseMessage'])
      }
    }, error => {
      console.log('error =>', error)
      this.service.showError('Something Went Wrong')
    })
    }
    announcement(){
      this.service.getApi(`admin/countAnnouncement`,1).subscribe(response => {
        this.responseData = response;
        console.log('res')
        if (response['responseCode'] == 200) {
          console.log('data found successfully',response)
             this.userData1 = response['data'];
               console.log("Data--> ",JSON.stringify(this.userData1));
              //  this.router.navigateByUrl('announcement');     
        }
        
        else {
          this.service.showError(response['responseMessage'])
        }
      }, error => {
        console.log('error =>', error)
        this.service.showError('Something Went Wrong')
      })
   
    }
    setting(){
      this.router.navigateByUrl('setting');
    }
    static(){
      this.router.navigateByUrl('manage-content');
    }
    announcement1(){
      this.router.navigateByUrl('manage-user'); 

    }
    announcement2(){
      this.router.navigateByUrl('announcement');   

    }
    token(){
      this.router.navigateByUrl('token')
    }
    userDetail(){
      this.router.navigateByUrl('manage-user')
    }
}
