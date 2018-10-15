import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  adminData: any = { };
  params: any = '';
  adminId: any;
  formgroup: FormGroup;
  constructor(private service:DataService,public route:ActivatedRoute,private router: Router,formBuilder: FormBuilder) {
    this.formgroup= formBuilder.group({
      // email:['',Validators.compose([Validators.required,Validators.pattern(/^[A-Z0-9_-]+([\.-][A-Z0-9_-]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,4})+$/i)])]
 
   });
      
   }

  ngOnInit() {
    this.route.paramMap.subscribe(prams => {
      this.adminId = prams.get('adminId')
    })
    this.onload()
  }


  back(){

    this.router.navigate(['/manage-user'])
  }

edit(){
  this.router.navigate(['/edit_myProfile/'+localStorage.getItem('adminId')])

}
 



  onload(){
    this.service.getApi('admin/getProfile',1).subscribe((response:any)=>{
    
        if(response.responseCode==200){
         
         this.adminData=response.data;
         console.log(this.adminData)
           
        }
        else{
       
          this.service.showError(response['responseMessage'])
        }
      },error=>{
        this.service.showError('Something Went Wrong=======>>.Api Error')
      })
    

  }

}