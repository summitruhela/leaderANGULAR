import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  responseData: any;
  passwordForm: FormGroup;
  adminId: any;
  params: any = '';
  currentURL: any;
  constructor(public route: Router, private _location: Location, public service: DataService, private activateRote: ActivatedRoute) {
    this.passwordForm = new FormGroup({

      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required,] )
    })
  }



  ngOnInit() {
    // this.route.params.subscribe(params =>  {
    //   console.log('params => '+ JSON.stringify(params))
    //   this.params = params['type']
    // })
   

  }
  save(val) {
    if(val.newPassword != val.confirmPassword){
      return
    }

    console.log(this.passwordForm.value)
    console.log(val)
    let changeData = {
     
        "newPassword": val.newPassword
      
    }
    // this.activateRote.paramMap.subscribe(prams => {
    //   this.adminId = prams.get('adminId')
    //   console.log("AdminId--->",prams);
    // })

    // this.currentURL = window.location.href; 
    var url = window.location.pathname;
    console.log("updated url====>>>>",url)
    var aa = url.split('/')
    console.log("aa==>>",aa[2],aa[3])
   var filename = url.substring(url.lastIndexOf('/')+1);
   var filename1 = url.substring(url.lastIndexOf('/')+2);
    // var value = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    // alert(filename);

console.log("hjsghjd==>>",filename1)
    console.log(changeData);
   
    console.log("AdminId--->",this.adminId);
    this.service.postApi(('admin/resetPassword/'+aa[2]+'/'+aa[3]), changeData, 0).subscribe(response => {
      console.log("!@%^&$#^&^&")
      this.responseData = response;
      console.log("succ===>", JSON.stringify(this.responseData))
      console.log(`Login Data====>${JSON.stringify(val)}`);
      if (response['responseCode'] == 200) {
        this.service.showSuccess(response['responseMessage']);
        console.log('change Password', response['responseMessage'])
        this.route.navigateByUrl('/login');


      }
      else {
        console.log("else")
        this.service.showError(response['responseMessage'])
      }
    }, error => {
      console.log('error occur', error)
      this.service.showError('Server Error')
    })
  }
}
