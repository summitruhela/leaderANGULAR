import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-assign-announcement',
  templateUrl: './assign-announcement.component.html',
  styleUrls: ['./assign-announcement.component.scss']
})
export class AssignAnnouncementComponent implements OnInit {
  userList: any;

  form:any;
  imageurl: string;
    dropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'userName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  sub: any;
  id: number;
  responseData: any;
  userData:any
  constructor(public service: DataService,private route: ActivatedRoute,private router: Router) {

this.userData=this.service.editdata
this.imageurl="src/assets/img/image.jpg";

console.log("dfsjkghdjkfhg",this.userData)
    this.form=new FormGroup({
      title: new FormControl(this.userData.title,Validators.required),

      Assign: new FormControl(this.userData.description,Validators.required),
      startDate: new FormControl(this.userData.startDate,Validators.required),
      endDate: new FormControl(this.userData.endDate,Validators.required),
      user : new FormControl('',Validators.required),
     
    })

    
 }


  ngOnInit() {
    this.imageurl=this.userData.icon;
    this.sub = this.route.params.subscribe(params => {
      this.id=params.id
      console.log("this.id=====>>>>",this.id);
      this.userListApi();


      // In a real app: dispatch action to load the details here.
   });
  }
  update(data){
    console.log(data);
    let arr = data.user.map(x => {
      let obj = this.userList.filter(y => y._id == x._id)[0]
      return { userName: obj.userName, status: obj.status, userId: obj._id }
    })
    let editdata = {
      "announcementId":this.id,
      "title":data.title,
      "startDate":data.startDate,
      "endDate":data.endDate,
      "description":data.Assign,
      "user": arr
      // "icon":"data:image/gif;base64,R0lGODlhZABkAIAAAP///wAA/yH5BAEAAAAALAAAAABkAGQAAAL/hI+py03xMQg+pi63P3wkPgbBx9Tl9oePxMcg+Ji63P7wkfgYBB9Tl9sfPhIfg+Bj6nL7w0fiYxB8TF1uf/hIfAyCj6nL7Q8fiY9B8DF1uf3hI/ExCD6mLrc/fCQ+BsHH1OX2h4/ExyD4mLrc/vCR+BgEH1OX2x8+Eh+D4GPqcvvDR+JjEHxMXW5/+Eh8DIKPqcvtDx+Jj0HwMXW5/eEj8TEIPqYutz98JD4GwcfU5faHj8THIPiYutz+8JH4GAQfU5fbHz4SH4PgY+py+8NH4mMQfExdbn/4SHwMgo+py+0PH4mPQfAxdbn94SPxMQg+pi63P3wkPgbBx9Tl9oeP/8THIPiYutz+8JH4GAQfU5fbHz4SH4PgY+py+8NH4mMQfExdbn/4SHwMgo+py+0PH4mPQfAxdbn94SPxMQg+pi63P3wkPgbBx9Tl9oePxMcg+Ji63P7wkfgYBB9Tl9sfPhIfg+Bj6nL7w0fiYxB8TF1uf/hIfAyCj6nL7Q8fiY9B8DF1uf3hI/ExCD6mLrc/fCQ+BsHH1OX2h4/ExyD4mLrc/vCR+BgEH1OX2x8+Eh+D4GPqMlN8TF1ufxjlpNVenPXm3X8wFEeyNE80VVe2dV84li8CPqYuN8XHIPiYutz+8JH4GAQfU5fbHz4SH4PgY+py+8NH4mMQfExdbn/4SP98DIKPqcvtDx+Jj0HwMXW5/eEj8TEIPqYutz98JD4GwcfU5faHj8THIPiYutz+8JH4GAQfU5fbHz4SH4PgY+py+8NH4mMQfExdbn/4SHwMgo+py+0PH4mPQfAxdbn94SPxMQg+pi63P3wkPgbBx9Tl9oePxMcg+Ji63P7wkfgYBB9Tl9sfPhIfg+Bj6nL7w0fiYxB8TF1uf/hIfAyCj6nL7Q8fiY9B8DF1uf3hI/ExCD6mLrc/fCQ+BsHH1OX2h4/ExyD4mLrc/vCR+BgEH1OX2x8+Eh+D4GPqcvvDR+JjEHxMXW5/+Eh8DIKPqcvtDx+Jj0HwMXW5/eEj8TEIPqaALrc/fCQ+BsHH1OX2h4/ExyD4mLrc/vCR+BgEH1OX2x8+Eh+D4GPqcvvDR+JjEHxMXW5/+Eh8DIKPqcvtDx+Jj0HwMXW5/eEj8TEIPqYutz98JD4GwcfU5faHj8THIPiYutz+8JH4GAQfU5fbHz4SH4PgY+py+8NH4mMQfExdZioAOw==",
      // "user":[
            //  {
            //      "status" : "ACTIVE",
            //      "userId" : "5ba4e806c4f7451a9f809234",
            //      "userName" : "arman"
            //  }]
      }
      console.log("data for editing",editdata )
      this.service.postApi('admin/editAnnouncement', editdata, 1).subscribe(response => {
        // console.log("####",response);
  
        if (response['responseCode'] == 200) {
          // console.log(' add data successfully', response)
          // this.userData = response['data']['docs']
          //      this.event= this.userData;
          //console.log("dcfdsfdsfdf",JSON.stringify(  this.userData = response['user'][0]))
          //  this.Event= this.userData;
  
          //console.log("@@@@@>>>",JSON.stringify( this.logindata));
  
  
  
          // this.service.showSuccess(response['responseMessage'])
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
  
  onFileChanged(hello){
    console.log("data==>>",hello);
  }

  // userListApi(val) {
  //   let delData = {
     
  //     "announcementId":val
  //     }
  //   this.service.postApi('getAnnouncementUserList', delData, 1).subscribe(response => {
  //     console.log("ggg",response);
  //     if (response.responseCode == 200) {
  //       console.log("respon===>>>",response)
  //       this.userList = response.data
  //       console.log("sea the Users1===>>>",this.userList[0].userName)
  //     }
  //   })
  // }

  userListApi() {
    console.log("hello")
    this.service.postApi('admin/getUserListNew', {}, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.userList = response.data
        console.log("see New the Users===>>>",this.userList)
      }
    })
  }


}