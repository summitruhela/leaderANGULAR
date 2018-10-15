import { Component, OnInit } from '@angular/core';import { FormControl } from '@angular/forms';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss']
})
export class EditFaqComponent implements OnInit {
  ans:any;
  que: any;
  controls: string;
  passwordForm: FormGroup;
  faqId: any = '';
  constructor(private formBuilder: FormBuilder,public router: Router,public service:DataService,private route: ActivatedRoute) { 
    this.passwordForm = this.formBuilder.group({
     que: ['', Validators.required],
     ans: ['', Validators.required]
    })
  }

  ngOnInit() {
   //"faq":[{"status":"ACTIVE","_id":"5baf61a32a8264256d3599a7","Ques":"sd","Ans":"sdsdsdsd"},
   this.route.params.subscribe(params =>  {
    // console.log('params => '+ JSON.stringify(params))
    this.faqId = params['type']
    console.log('params => ',this.faqId)
    this.get();
  })
  
  }
save(val){
  console.log("value=======>",val)
  let postData={
    "faqId":this.faqId,
    "Ques":this.passwordForm.value.que,
    "Ans":this.passwordForm.value.ans      
      
  }

 console.log("DATA SAVE=====>",postData)
  this.service.postApi('admin/n1/editFaq',postData,1).subscribe(response=>{
    console.log("**********************",JSON.stringify(response))
    if(response['responseCode']==200){
        console.log(`Save content data - ${response}`)
        this.service.showSuccess(response['responseMessage'])  
        this.router.navigateByUrl('Faq1/');    }
    else{
   
      this.service.showError(response['responseMessage'])
    }
  },error=>{
    this.service.showError('Something Went Wrong')
  })
}

get(){

  this.service.getApi('admin/n1/getFaq/'+this.faqId,1).subscribe(response=>{
    console.log("**********************",JSON.stringify(response))
    if(response['responseCode']==200){
        console.log(`Save content data - ${response}`)
        this.passwordForm.controls['que'].setValue(response[`data`].faq[0].Ques)
        this.passwordForm.controls['ans'].setValue(response[`data`].faq[0].Ans)
    }
    else{
   
      this.service.showError(response['responseMessage'])
    }
  },error=>{
    this.service.showError('Something Went Wrong')
  })


}
 
}

