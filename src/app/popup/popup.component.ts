import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// import { Route } from '../../../node_modules/@angular/compiler/src/core';
import { Router } from '../../../node_modules/@angular/router';
declare var $:any;

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  responseData: any;

  constructor( public service: DataService,
              public route:Router            
  ) { }

  ngOnInit() {
  }
  yes()
  {
  let changeData =
  {
  "_id":localStorage.getItem('adminId')
  
  }
    this.service.postApi('admin/logout',changeData,0).subscribe( response =>{
      console.log("!@%^&$#^&^&")
      this.responseData = response;
      console.log("succ===>",JSON.stringify(this.responseData))
    
            if(response['responseCode']==200){
              $('#logout').modal('hide');
              localStorage.removeItem('adminId')
                   localStorage.removeItem('token')
              this.service.showSuccess(response['responseMessage']);
                    
                       this.route.navigate(['/login']);
                      
            
            }
            else {
              console.log("else")
            this.service.showError('Id not found.')
          }
        }, error=>{
            console.log('error occur',error)
           this.service.showError('Server Error')
          }) 
  
  }
}
