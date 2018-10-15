import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  tab: any;
  params: any;
  dashboardForm: FormGroup;
  eventData:any;
  event: any = [];
  modified: any = [];
  data: any=[];
  modifiedNew : any =[];
  pageNo: any;
  Username:any
  nameClicked: any;
  date:any
  aa={}
  p: number = 1;
  firstEventData: any={deviceId:'',status:'',signInTime:'',location:'',signOutTime:''};
  total: any;
  limit: any;
  abc: any= {type:''};
  constructor(private router: Router,public service:DataService,private formBuilder: FormBuilder,public route:ActivatedRoute) { 
    this.dashboardForm = this.formBuilder.group({
    
    })
    // signInHistoryArray[0].lastDevice
// this.nameClicked=this.service.nameClicked;
    // this.Username=this.nameClicked.userName;
    // console.log( "@mit",this.nameClicked.signInHistoryArray[0].lastDevice)
    // console.log( "@mit",this.nameClicked.signInHistoryArray[0].lastSignIn)
    // this.date=this.nameClicked.signInHistoryArray[0].lastSignIn
    // console.log(this.nameClicked.signInHistoryArray[0].lastDevice)

  }

  ngOnInit() {
    this.route.params.subscribe(params =>  {      
      console.log('params => '+ JSON.stringify(params))      
      this.params = params['type'];
      console.log("type",this.params)
      this.tab = params['tab'];
    })
    this.name(this.params);
    // this.ab();
  }
   
  name(val){
    var url = `admin/userDeviceHistory/`+this.params;

// http://localhost:9000/admin/userDeviceHistory/0x5ad9a795cf334970A80C7d0867EeB554ACCB38c9
    let logindata =
    {

    }
    
    // for (let val in logindata) {
    
    //   if (logindata[val] == '') {
    //     delete logindata[val]
    //   }
    // }
    this.service.postApi(url,logindata,1).subscribe(response => {
          // this.responseData = response;
          console.log("hello1data",JSON.stringify(response))
          if (response['responseCode'] == 200) {
            
            console.log('  found successfully>>>',JSON.stringify(response))
                 this.eventData=response.data.data;
                 this.firstEventData = response.data.data[0];
                
                 console.log("EventData@@@@@>>>",JSON.stringify( this.eventData));
            
            // this.service.showSuccess(response['responseMessage'])
            // this.router.navigate(['/user_details']);
         
            localStorage.userId = response[`data`][`docs`];
          }
          else {
            this.service.showError(response['responseMessage'])
          }
        }, error => {
          console.log('error =>', error)
          this.service.showError('Something Went Wrong')
        })
    
  
  }

ab(){
  var url = 'user/walletHistory/';
  let logindata =
{
"walletAddress":this.params,
"page": this.p,
"status":this.abc.type
}
  console.log("this is data",this.params)

 
    this.service.postApi(url,logindata,1).subscribe(response => {

      console.log("hello data",JSON.stringify(response))

      if(response.responseCode==200) {
        this.modified=response.data.data;
        this.total = response.data.total;
        this.limit = response.data.limit;
        console.log("dsfdsfdsfdsfdsfdsdsfdsff ",this.limit)
        this.modified.forEach(element => {
          console.log("ELEMENT",element)
          element.timeStamp = element.timeStamp*1000;
        });       
               
      } else if(response.responseCode==400) {
        console.log("response.responseCode = 400")
      }
    });
  }
  changePage(page) {
    console.log("page-->", page);
    this.p = page;
   this.ab();
  }
  type(){
    console.log(this.aa)
    this.abc=this.aa;
    console.log(this.abc.type)
    this.ab();
  }
}
