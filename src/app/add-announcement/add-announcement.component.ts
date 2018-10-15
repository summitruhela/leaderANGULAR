import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { FormArray } from '@angular/forms';
declare var $: any
@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = { 
    dateFormat: 'yyyy-mm-dd',
    inline:false,
    showInputField:true,
    showTodayBtn:false,
    };
    public myDatePickerOptions2: IMyDpOptions = { 
      dateFormat: 'yyyy-mm-dd',
      inline:false,
      showInputField:true,
      showTodayBtn:false,
      };

  maxAge: Date;
  minAge: Date;
  userData: any;
  Form: FormGroup;
  formgroup: FormGroup;
  userList: any = [];
  image: any = ''
  date: Date = new Date
  y: any
  m: any
  d: any
  newDate: any
  dropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'userName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  fileName: any;
  constructor(private router: Router, public service: DataService, private formBuilder: FormBuilder, private ng2ImgMaxService: Ng2ImgMaxService) {
    this.Form = this.formBuilder.group({
      title: ['', Validators.required],
      Description: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      user: ['', Validators.required],
      file: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.onDateChange()
    var today = new Date();
    var maxAge = 0;
    this.maxAge = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());


    this.y = this.date.getFullYear();
    this.m = this.date.getMonth() + 1;
    this.d = this.date.getDate();
    if (this.m < 10) {
      this.m = "0" + this.m
    }
    this.newDate = this.y + "-" + this.m + "-" + this.d
    // $('#startDate, #endDate').attr('min', this.newDate);
    this.userListApi()
    // this.add('');
  }

  userListApi() {
    this.service.postApi(`admin/getUserListNew`, {}, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.userList = response.data
      }
    })
  }

  onImageChange(event) {
    console.log('fil => ', this.Form.value)
    var self = this;
    if (event.target.files && event.target.files[0]) {
      let image = event.target.files[0];
      this.fileName = event.target.files[0].name
      console.log("FILE NAME-->", this.fileName)
      this.ng2ImgMaxService.resizeImage(image, 400, 300).subscribe(result => {
        var reader = new FileReader();
        reader.readAsDataURL(result); // read file as data url
        reader.onload = (event: any) => { // called once readAsDataURL is completed
          this.image = new Image();
          //Set the Base64 string return from FileReader as source.
          this.image.src = event.target.result;
          console.log("RESULT%%%%%", event.target.result)
          self.Form.controls['file'].setValue(event.target.result)
        }
      }
      )
    }
  }
  add() {
    console.log("!!!!!!!!!!@@@", this.Form.value)
    let val = this.Form.value
    /* let arr = this.userList.filter(x => {
      let obj = val.user.map(y => x._id == y._id)
      return obj;
    }) */
    let arr = val.user.map(x => {
      let obj = this.userList.filter(y => y._id == x._id)[0]
      return { userName: obj.userName, status: obj.status, _id: obj._id }
    })
    //  return;
    // console.log("@@3454456511111", arr)
    //  this.userList.filter(x => x._id == val.user[0])

    // return;
    let logindata =
      {
        "title": val.title,
        "startDate": this.Form.value.StartDate.formatted,
        "endDate": this.Form.value.EndDate.formatted,
        "description": val.Description,
        "icon": val.file,
        "user": arr
      }
    console.log("rrreeesssuuu---->>>", logindata)
    this.service.postApi(`admin/addAnnouncement`, logindata, 1).subscribe(response => {
      console.log('res@@@@@@@@@@@', JSON.stringify(logindata))

      if (response['responseCode'] == 200) {
        // console.log(' add data successfully', response)
        // this.userData = response['data']['docs']
        //      this.event= this.userData;
        //console.log("dcfdsfdsfdf",JSON.stringify(  this.userData = response['user'][0]))
        //  this.Event= this.userData;

        //console.log("@@@@@>>>",JSON.stringify( this.logindata));



        this.service.showSuccess("response['responseMessage']")
        this.router.navigateByUrl('/announcement');
      }
      else {
        this.service.showError(response['responseMessage'])
      }
    }, error => {
      console.log('error =>', error)
      this.service.showError('Something Went Wrong')
    })


  }
  onDateChanged(event: IMyDateModel){
  console.log(`event${JSON.stringify(event)}`)
  this.Form.value.StartDate
     let endDate = new Date(event.formatted )  
    let copy2 = this.getCopyOfOptions();
    copy2.disableUntil = {
    year: endDate.getFullYear(),
    month: endDate.getMonth() + 1,
    day: endDate.getDate()
    };
    this.myDatePickerOptions2 = copy2 
  }
  onDateChange() {   
    let startD = new Date()    
    let copy1 = this.getCopyOfOptions();
    copy1.disableUntil = {
    year: startD.getFullYear(),
    month: startD.getMonth() + 1,
    day: startD.getDate()
    };
    this.myDatePickerOptions = copy1 
   
    }
    onDateChanged2(event: IMyDateModel){

    }
   
    getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions));
    }
}
