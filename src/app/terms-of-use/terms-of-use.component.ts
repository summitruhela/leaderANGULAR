import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {

  data: any;
  public editorValue: string = '';
  controls: string;
  editForm:FormGroup;
  viewData:any;
  params: any = '';

  constructor(private formBuilder: FormBuilder, public router: Router,public service:DataService, private route: ActivatedRoute) {
  
    this.editForm = this.formBuilder.group({
      data: ['']
    })
  }

  
  ngOnInit() {
    
    this.route.params.subscribe(params =>  {
      console.log('params => '+ JSON.stringify(params))
      this.params = params['type']
    })
    this.service.getApi(`admin/n1/getStaticContent`, 1).subscribe(response => {
      console.log('resp t & c >>>>>',response)
      if (response['responseCode'] == 200) {
         console.log(' STATIC CONTENTS', response)

        if( this.params == 'terms'){
          this.data = response["data"]._id;
          this.viewData = response['data'].termsOfUse
         
          localStorage.setItem('staticId',this.data)

          // console.log('Terms And Conditions',this.viewData)
        }
    // else if( this.controls == 'Privacy Policy'){
    //   this.viewData = response['data'].faq
    //   console.log('Privacy Policy',this.viewData)
    // }
    this.editForm.patchValue({
      data: this.viewData
    })
              // console.log("data incoming>>>>",this.editForm)

        // this.viewData = response['result'][0].
            }
      else {
        // this.service.showError(response['responseMessage'])
      }
        }, error => {
          console.log('error =>')
          // this.service.showError('Something Went Wrong')
        })

  }
  
 
  save(){
   
     let postData={       
        "termsOfUse":this.editForm.value.data,
        "_id":localStorage.getItem('staticId')  
      } 
     console.log("@@@@@@@@@",this.editForm.value.data)
      this.service.postApi('admin/n1/updateStatic',postData,1).subscribe(response=>{
        console.log("**********************",JSON.stringify(response))
        if(response['responseCode']==200){
            console.log(`Save content data - ${response}`)
             this.controls = localStorage.getItem('staticId')
             console.log("cant find>>>>>",this.controls)
            this.service.showSuccess(response['responseMessage'])  
            this.router.navigate(['/manage-content'])
        } 
        else{
       
          this.service.showError(response['responseMessage'])
        }
      },error=>{
        this.service.showError('Something Went Wrong')
      })
    }

   
}
