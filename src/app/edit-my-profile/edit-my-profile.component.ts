import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.scss']
})
export class EditMyProfileComponent implements OnInit {
  formgroup: FormGroup;
  userForm: FormGroup;
  params: any = '';
  adminId: any;
  constructor(private formBuilder: FormBuilder, public router: Router, public service: DataService, private activateRote: ActivatedRoute) {
    this.formgroup = formBuilder.group({
      userName: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z\s]+$/i)])],
      mobileNumber: ['', Validators.compose([Validators.required, Validators.pattern(/(7|8|9)\d{9}/)])]

    });



  }

  ngOnInit() {
    // this.activateRote.paramMap.subscribe(prams => {
    //   this.adminId = prams.get('adminId')
    // })
    this.onload()
  }
  back() {

    this.router.navigate(['/my_profile'])
  }

  onload() {
    this.service.getApi('admin/getProfile', 1).subscribe((response: any) => {

      if (response.responseCode == 200) {
        this.formgroup.controls['userName'].setValue(response['data'].userName)
        this.formgroup.controls['mobileNumber'].setValue(response['data'].mobileNumber)
        this.adminId = response['data']._id
        // console.log("id===>>>>",this.adminId)
      }
      else {

        this.service.showError(response['responseMessage'])
      }
    }, error => {
      this.service.showError('Something Went Wrong=======>>.Api Error')
    })


  }

  update() {
    // if (this.userForm.invalid) {
    //   return
    // }
    // console.log("data",formValue)




    let delData = {

      "userName": this.formgroup.value.userName,
      "mobileNumber": this.formgroup.value.mobileNumber,
      "adminId":this.adminId
    }
    console.log('change status _id>>>>>>', delData)
    this.service.postApi('admin/updateProfile', delData, 1).subscribe(response => {


      console.log(`Login Data====>${JSON.stringify(response)}`);
      if (response['responseCode'] == 200) {
        // console.log("update", response)
        this.service.showSuccess(response['responseMessage'])
        this.router.navigateByUrl('manage-user');
        // alert("Success")
      }

    }, errr => {
      console.log("forgot api error============>>>>>>>>.")
    });



  }
}
