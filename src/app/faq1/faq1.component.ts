// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { DataService } from '../data.service';
// import { FormGroup } from '@angular/forms';
// import { FormBuilder } from '@angular/forms';
// declare var $: any

// @Component({
//   selector: 'app-faq1',
//   templateUrl: './faq1.component.html',
//   styleUrls: ['./faq1.component.scss']
// })
// export class Faq1Component implements OnInit {
//   dashboardForm: FormGroup;
//   event: any = [];
//   userData: any = [];
//   pageNo: any;
//   responseData: any;
//   customDataList: any = [];
//   faqlist =
//     {
//       "pageNumber": 1

//     }
//   id: any;
//   constructor(private router: Router, public service: DataService, private formBuilder: FormBuilder) {
//     this.dashboardForm = this.formBuilder.group({

//     });



//     //Code Added By author
//     this.service.postApi('n1/getAllFaq', this.faqlist, 1).subscribe(response => {
//       console.log("#############", response)
//       this.responseData = response;
//       // console.log("author Data",this.responseData)

//       this.customDataList = this.responseData['data']['dataList'];

//       //this.customDataList = response['data'].
//       console.log("author Data", this.customDataList)
//     });
//     //Code Added By author

//   }

//   ngOnInit() {
//   }
//   open(id) {
//     this.id = id
//     console.log("gauri --->> ", id)
//     console.log('CLICKED!!!')
//   }

//   delete() {
//     console.log("ID--> ");
//     // $("").modal('show');
//     console.log(this.id)
//     let deleteQuestion =
//     {
//       "_id": this.id
//     }
//     this.service.postApi('n1/deleteFaq', deleteQuestion, 1).subscribe(response => {
//       console.log("#############", response['responseCode']);
//       $("#deletePopup").modal('hide')
//       this.service.postApi('n1/getAllFaq', this.faqlist, 1).subscribe(response => {
//         console.log("#############", response)
//         this.responseData = response;
//         // console.log("author Data",this.responseData)

//         this.customDataList = this.responseData['data']['dataList'];

//         //this.customDataList = response['data'].
//         console.log("author Data", this.customDataList)
//       });
//     });

//   }
//   add() {

//     this.router.navigateByUrl('/edit_faq');
//   }
//   /*   getAllCustomer(val){
//       static(){
//       this.router.navigateByUrl('manage-content');
//     }
  
  
  
  
  
  
//       this.service.getApi(`n1/getStaticContent`,1).subscribe(response => {
//         this.responseData = response;
//         console.log('res')
//         if (response['responseCode'] == 200) {
//           console.log('  data found successfully',JSON.stringify(response))
//               this.userData = response[`data`]
              
//                this.event= this.userData;
//                console.log("@@@@@>>>",JSON.stringify( this.userData));
//               //  localStorage.setItem('userId',this.responseData.data.docs[0]._id) 
//               //  console.log("ID",JSON.stringify(this.responseData.data.docs[0]._id))
//           // for(let i=0; i<this.user.length; i++){
//           //   if(this.user[i].status == 'ACTIVE'){
//           //     this.modified[i].status = 'ACTIVE'
//           //   }
//           //   else if(this.user[i].status == 'BLOCK'){
//           //     this.modified[i].status = 'BLOCK'
//           //   }
            
//           // }
//           // console.log('result of all customer--->', JSON.stringify(this.user))
//           // this.paginationData = response['paginationData']
//           // this.srNo = (this.pageNo - 1) * this.paginationData.limit
//           this.service.showSuccess(response['responseMessage'])
       
//           // localStorage.userId = response[`data`][`docs`][0][`_id`];
//         }
//         else {
//           this.service.showError(response['responseMessage'])
//         }
//       }, error => {
//         console.log('error =>', error)
//         this.service.showError('Something Went Wrong')
//       })
  
  
  
//     } */
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
declare var $: any
@Component({
  selector: 'app-faq1',
  templateUrl: './faq1.component.html',
  styleUrls: ['./faq1.component.scss']
})
export class Faq1Component implements OnInit {
  id: any;
  p: any = 1;
  dashboardForm: FormGroup;
  customDataList:any = { dataList:[] }
  event: any = [];
  userData: any = [];
  pageNo: any;
  responseData: any;
  // customDataList: any = [];
  
  constructor(private router: Router, public service: DataService, private formBuilder: FormBuilder) {
    this.dashboardForm = this.formBuilder.group({
    });
  }
  
  ngOnInit() {
    this.getFAQ()
  }
  getFAQ(){
    
    var faqlist = { 
      "pageNumber": this.p
    }
    this.service.postApi('admin/n1/getAllFaq', faqlist, 1).subscribe(response => {
      console.log("#############", response)
      this.responseData = response;
      // console.log("author Data",this.responseData)
      this.customDataList = this.responseData['data']
      //this.customDataList = response['data'].
      console.log("author Data", this.customDataList)
    });
    //Code Added By author
  }
  open(id) {
    this.id = id
    console.log("gauri --->> ", id)
    console.log('CLICKED!!!')
    this.router.navigateByUrl('edit_faq');

  }
  delete() {
    console.log("ID--> ");
    // $("").modal('show');
    console.log(this.id)
    let deleteQuestion =
    {
      "_id": this.id
    }
    this.service.postApi('admin/n1/deleteFaq', deleteQuestion, 1).subscribe(response => {
      console.log("#############", response['responseCode']);
      $("#deletePopup").modal('hide')
      this.getFAQ()
    });
  }
  faqlist(arg0: string, faqlist: any, arg2: number): any {
    throw new Error("Method not implemented.");
  }
  changePage(page) {
    //console.log("page-->", page);
    this.p = page;
    this.getFAQ();
  }
  add() {
    this.router.navigateByUrl('/add_faq');
  }
edit(id){
  this.router.navigateByUrl('/edit_faq/'+id);
  
}
  /*   getAllCustomer(val){
      static(){
      this.router.navigateByUrl('manage-content');
    }
  
  
  
  
  
  
      this.service.getApi(`n1/getStaticContent`,1).subscribe(response => {
        this.responseData = response;
        console.log('res')
        if (response['responseCode'] == 200) {
          console.log('  data found successfully',JSON.stringify(response))
              this.userData = response[`data`]
              
               this.event= this.userData;
               console.log("@@@@@>>>",JSON.stringify( this.userData));
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
          this.service.showSuccess(response['responseMessage'])
       
          // localStorage.userId = response[`data`][`docs`][0][`_id`];
        }
        else {
          this.service.showError(response['responseMessage'])
        }
      }, error => {
        console.log('error =>', error)
        this.service.showError('Something Went Wrong')
      })
  
  
  
    } */
}