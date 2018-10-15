// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-view-details',
//   templateUrl: './view-details.component.html',
//   styleUrls: ['./view-details.component.scss']
// })
// export class ViewDetailsComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  userData:any
  constructor(private service:DataService,public route:ActivatedRoute,private router: Router) {
      this.userData=this.service.userdata;
      
      console.log(this.userData) }

  ngOnInit() {
    console.log(this.userData.userName)
  }

  back(){

this.router.navigate(['/manage-user'])

  }

}