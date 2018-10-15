import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {
  controls: string;
  passwordForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,public router: Router,public service:DataService) {  this.passwordForm = this.formBuilder.group({
    que: ['', Validators.required],
    ans: ['', Validators.required]
   })}
  ngOnInit() {
  }
  save(val){
    console.log("value=======>",val)
    let postData={
      faq:{
        "Ques":this.passwordForm.value.que,
        "Ans":this.passwordForm.value.ans
      }
    }
  
   console.log("DATA SAVE=====>",postData)
    this.service.postApi('admin/n1/updateStatic',postData,1).subscribe(response=>{
      console.log("**********************",JSON.stringify(response))
      if(response['responseCode']==200){
          console.log(`Save content data - ${response}`)
          //this.controls = localStorage.getItem('staticId')
           console.log("cant find>>>>>",this.controls)
          this.service.showSuccess(response['responseMessage'])  
          this.router.navigate(['/Faq1/:'])
      }
      else{
     
        this.service.showError(response['responseMessage'])
      }
    },error=>{
      this.service.showError('Something Went Wrong')
    })
  }
}
