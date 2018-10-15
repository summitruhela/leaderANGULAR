import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  Form: FormGroup;
  formgroup: FormGroup;
  event: any = [];
  responseData: any;
  userData: any=[];
  total: any;
  limit: any;
  page:any=1;
  date: Date = new Date

  y: any
  m: any
  d: any
  newDate: any
  id: number;
  private sub: any;
  constructor(private router: Router,public service:DataService,private formBuilder: FormBuilder) { 
    this.Form = this.formBuilder.group({
    
    })


  }

  ngOnInit() {
    
    this.getAllCustomer('',this.page);
    
    
  }
  add() {
    
    this.router.navigateByUrl('/add_announcement');
  }
  getAllCustomer(val,page){
    console.log("Form Value--> ",val);
    this.page =""+page;
//     let logindata =
// {
 
//   // search: this.Form.controls['search'].value,
//   // status: this.dashboardForm.controls['sort'].value,
//   // userType: "CUSTOMER"
// }

// for (let val in logindata) {

//   if (logindata[val] == '') {
//     delete logindata[val]
//   }
// }






    this.service.getApi(`admin/getAllannouncement`,1).subscribe(response => {
      this.responseData = response;
      console.log('res')
      if (response['responseCode'] == 200) {
        // console.log('  data found successfully',response)
            //  this.userData = response['data']['docs']
            //  this.event= this.userData;
             this.userData = response['data'];
             console.log("Data--> ",JSON.stringify(this.userData));
             this.event= this.userData.docs;
             this.limit = this.userData.limit;
             this.total = this.userData.total;
            //  console.log("limit--L> ",this.limit+" total--> ",this.total);
            //  localStorage.setItem('userId',this.responseData.data.docs[0]._id) 
            //  console.log("ID",JSON.stringify(this.responseData.data.docs[0]._id))
        // for(let i=0; i<this.user.length; i++){
        //   if(this.user[i].status == 'ACTIVE'){
        //     this.modified[i].status = 'ACTIVE'
        //   }
        //   else if(this.user[i].status == 'BLOCK'){
        //     this.modified[i].status = 'BLOCK'
        //   }
          
        // }
        // console.log('result of all customer--->', JSON.stringify(this.user))
        // this.paginationData = response['paginationData']
        // this.srNo = (this.pageNo - 1) * this.paginationData.limit
        // this.service.showSuccess(response['responseMessage'])
     
        // localStorage.userId = response[`data`][`docs`][0][`_id`];
      }
      else {
        this.service.showError(response['responseMessage'])
      }
    }, error => {
      console.log('error =>', error)
      this.service.showError('Something Went Wrong')
    })



  }


  // ---------===========================----------------------==============================------------------------============-----------
  userdel(val) {
    console.log(val)
    let delData = {
     
    "announcementId":val
    }
    console.log('delete _id>>>>>>', delData)
    this.service.postApi('admin/deleteAnnouncement', delData, 1).subscribe(response => {
      this.responseData = response;

      console.log(`Login Data====>${JSON.stringify(val)}`);
      if (response['responseCode'] == 200) {
        this.service.showSuccess(response['responseMessage']);

        console.log('successfully change status', response['responseMessage'])
        this.getAllCustomer('',this.page);
        this.router.navigate(['/announcement']);

        console.log("succ===>", JSON.stringify(this.responseData))

      }
      else {
        console.log("else")
        console.log(' status', response['responseMessage'])
        this.service.showError('does not change the status.')
      }
    }, error => {
      console.log('error occur', error)
      this.service.showError('Server Error')
    })
  }
  // -------------------======================+++++++++++++++++++________________________________++++++++++++++================0------
  edit(edit_id){
    console.log("edit_id",edit_id);
    let editdata = {
     
      "announcementId":edit_id

       
    }
    this.service.postApi('admin/announcementInfo', editdata, 1).subscribe(response => {
      console.log("edit click===>>>",response)
      // this.responseData = response;

      // console.log(`Login Data====>${JSON.stringify(val)}`);
      if (response['responseCode'] == 200) {
        this.service.showSuccess(response['responseMessage']);
console.log("===========>>>>>>",response.data[0])
this.service.editdata=response.data[0];
        console.log('successfully change status', response['responseMessage'])
      this.router.navigate(['/assign-announcement',edit_id]);
      //   console.log("succ===>", JSON.stringify(this.responseData))

      }
      else {
        console.log("else")
        console.log(' status', response['responseMessage'])
        this.service.showError('does not change the status.')
      }
    }, error => {
      console.log('forgot api error', error)
      this.service.showError('Server Error')
    })
    
    
      
    
  }
  
  
}
