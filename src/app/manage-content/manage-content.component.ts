import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-content',
  templateUrl: './manage-content.component.html',
  styleUrls: ['./manage-content.component.scss']
})
export class ManageContentComponent implements OnInit {

  
  constructor(private router: Router) { }

  ngOnInit() {
  }


  terms(e:string){
    //  localStorage.setItem('',e)
    //  localStorage
    console.log("t & c >>>>>>>>>",e)
    this.router.navigateByUrl('/termsOfuse/'+ e);
}




  // terms() {
  
  //   this.router.navigateByUrl('/termsOfuse');
  // }
  faq(e:string){
    //localStorage.setItem('',e)
    console.log("t & c >>>>>>>>>",e)
    this.router.navigateByUrl('/Faq1/'+ e);

  }
}
