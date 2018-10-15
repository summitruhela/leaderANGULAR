import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  total: any;
  limit: any;
  data: any;
  page:any=1;
  dashboardForm: FormGroup;
  user: any;
  event: any = [];
  userData: any = [];
  pageNo: any;
  responseData: any;
  collection = [];
  searchText: any;
  p: any = 1;
  _id:any;
  _id1: any;
  stat: any;

  constructor(  public route: Router,private router: Router, public service: DataService, private formBuilder: FormBuilder) {
    this.dashboardForm = this.formBuilder.group({
      'search': [''],
      'sort': [''],
    })
  }

  ngOnInit() {
    this.getAllCustomer('');
  }
  changePage(page) {
    //console.log("page-->", page);
    this.p = page;
    this.getAllCustomer('');
  }
  getAllCustomer(val) {
    let logindata = {
        search: this.dashboardForm.controls['search'].value,
        pageNumber: this.p
    }
    for (let val in logindata) {
      if (logindata[val] == '') {
        delete logindata[val]
      }
    }
    this.service.postApi(`admin/getUserList`, logindata, 1).subscribe(response => {
      this.responseData = response;
      //console.log('res') ;
      if (response['responseCode'] == 200) {
        // console.log('data found successfully for userDetail>>>>', JSON.stringify(this.responseData));
        this.userData = response['data'];
        this.event = this.userData.docs;
        this.limit = this.userData.limit;
        this.total = this.userData.total;
        this.page = this.userData.page
        console.log( this.event)
        console.log("limit--L> ", this.limit + " total--> ", this.total,"PAGES---->",this.page)
        // this.service.showSuccess(response['responseMessage'])
      }
      else {
        this.service.showError(response['responseMessage'])
      }
    }, error => {
      console.log('error =>', error)
      this.service.showError('Something Went Wrong')
    })



  }
  userName() {
    this.router.navigateByUrl('/user_details');
  }
  
  search() {
    this.pageNo = 1
    this.getAllCustomer('')
  }

  name(e: string,x) {

   this.service.nameClicked=x;
    console.log("service",this.service.nameClicked)
    //  localStorage.setItem('',e)
    //  localStorage
    console.log("t & c >>>>>>>>>", e)
    this.router.navigateByUrl('/user_details/' + e + '/device');
  }
  view(userDetails) {
    this.service.userdata=userDetails;
    console.log(userDetails)
    // console.log('id of customer--->', JSON.stringify(this.user[l]._id))
    // localStorage.setItem('_id of customer', this.user[l]._id);
    // localStorage.setItem('status of customer', this.customer[l].status);
    this.router.navigate(['./viewDetails']);
  }


  edit(userId){
      console.log(userId)
    localStorage.setItem('UserId',userId);
    //this.service.edit_id=userId
    
      this.router.navigate(['./edit-user']);
  }





yes(){

let a={ "userId":this._id }
 this.abc(a);
}
yes1(){

  let a={ "_id":this._id1 }
   this.cst(a);
  }
  




changeStatus(val,stat){

  this._id1=val;
  if(stat == "ACTIVE"){
    this.stat="BLOCK";
  }
  else{
    this.stat="ACTIVE";
  }
  
  console.log(this.stat)
 $('#Status_modal').modal({
  backdrop: 'static',
  keyboard: false 
})
}

cst(statusdata){

  this.service.postApi('admin/changeStatus', statusdata, 1).subscribe(response => {
    this.responseData = response;

    // console.log(`Login Data====>${JSON.stringify(val)}`);
    if (response['responseCode'] == 200) {
      $('#Status_modal').modal('hide')
      //this.service.showSuccess(response['responseMessage']);

      console.log('successfully change status', response['responseMessage'])
      // this.router.navigate(['/dashboard']);
      this.getAllCustomer('');

      console.log("succ===>", JSON.stringify(this.responseData))

    }
    else {
      console.log("else");
      $('#Status_modal').modal('hide')
      console.log(' status', response['responseMessage'])
      this.service.showError('does not change the status.')
    }
  }, error => {
    $('#Status_modal').modal('hide')
    console.log('error occur', error)
    this.service.showError('Server Error')
  })
}


// changeStatus(val) {
  
//   let delData = {
//     "_id":val

//   }
//   console.log('change status _id>>>>>>', delData)
//   this.service.postApi('admin/changeStatus', delData, 1).subscribe(response => {
//     this.responseData = response;

//     // console.log(`Login Data====>${JSON.stringify(val)}`);
//     if (response['responseCode'] == 200) {
//       // $('#signout_modal').modal('hide')
//       //this.service.showSuccess(response['responseMessage']);

//       console.log('successfully change status', response['responseMessage'])
//       // this.router.navigate(['/dashboard']);
//       this.getAllCustomer('');

//       console.log("succ===>", JSON.stringify(this.responseData))

//     }
//     else {
//       console.log("else");
//       // $('#signout_modal').modal('hide')
//       console.log(' status', response['responseMessage'])
//       this.service.showError('does not change the status.')
//     }
//   }, error => {
//     // $('#signout_modal').modal('hide')
//     console.log('error occur', error)
//     this.service.showError('Server Error')
//   })
// }

userdel(val){
 this._id=val;
 $('#signout_modal').modal({
  backdrop: 'static',
  keyboard: false 
})
        }

abc(data){


  this.service.postApi('admin/deleteUser', data, 1).subscribe(response => {
    this.responseData = response;

    // console.log(`Login Data====>${JSON.stringify(val)}`);
    if (response['responseCode'] == 200) {
      $('#signout_modal').modal('hide')
      //this.service.showSuccess(response['responseMessage']);

      console.log('successfully change status', response['responseMessage'])
      // this.router.navigate(['/dashboard']);
      this.getAllCustomer('');

      console.log("succ===>", JSON.stringify(this.responseData))

    }
    else {
      console.log("else");
        $('#signout_modal').modal('hide')
      console.log(' status', response['responseMessage'])
      this.service.showError(response['responseMessage'])
    }
  }, error => {
      $('#signout_modal').modal('hide')
    console.log('error occur', error)
    this.service.showError('Server Error')
  })
}

}
