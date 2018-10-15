import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  responseData: any;
  tokenList: any=[];
  token: any;
  tokenAddress: any;

  constructor(private router: Router, public service:DataService) { }

  ngOnInit() {
    this.getTokenList();
  }
  add(){
this.router.navigate(['/add-token'])
  }
  getTokenList(){ 
    var data = ''
    this.service.postApi('user/getTokenListInAdminSetting',data,0).subscribe( response =>{
      this.responseData = response;

     if(response['responseCode']==200){
      this.tokenList = response['data'];
      console.log('token-->',this.tokenList);    
       
     
     }
     else {
       this.service.showError('Invalid email or password.')
       console.log("else")
     //  this.service.showError('Invalid email or password.')
   }
 }, error=>{
     console.log('error occur',error)
    this.service.showError('Server Error')
   })  
  }
  getaddress(event){
    console.log("Event-->",event.target.value);
  this.token = event.target.value;
  for(var i=0;i<this.tokenList.length;i++){
    if(this.tokenList[i].tokenName == this.token ){
      this.tokenAddress = this.tokenList[i].tokenAddress;
      console.log("Tokenadddress---> ",this.tokenAddress);
    }
  }
  }
 settings(){

   var apiDoc = {
    "tokenAddress":"TRZA",
    "commisionFee":"10",
    "tokenName":"ikhgekorwwergnergherwhy"
    }
    this.service.postApi('user/commisionMgt',apiDoc,0).subscribe( response =>{
       this.responseData = response;

      if(response['responseCode']==200){
        
        
        
      
      }
      else {
        this.service.showError('Invalid email or password.')
        console.log("else")
      //  this.service.showError('Invalid email or password.')
    }
  }, error=>{
      console.log('error occur',error)
     this.service.showError('Server Error')
    })  
 }
}
