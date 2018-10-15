import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Anzenadmin';
  loginstatus:boolean;
    constructor(public router: Router,public service:DataService){

    this.router.events.subscribe(x => { 

    if(x instanceof NavigationEnd) { 
      window.scroll(0,0)
      let currUrl = this.router.url.indexOf('?') == -1 ? this.router.url.split('/')[1] : this.router.url.slice(1,this.router.url.indexOf('?'))
      if(localStorage.getItem('adminId') === null){
      console.log(this.router.url) 
      if(!(currUrl === 'login' || currUrl === 'forgot-password' || currUrl === 'reset')){
      this.router.navigate(['/login']);
      } 
      } else { 
      if(currUrl === 'login' || currUrl === 'forgot-password' || currUrl === 'forgot'){
      this.router.navigate(['/dashboard'])
      }
      }
      }

    })












}
}
// export class AppComponent {
//   title = 'app';
//   loginstatus:boolean;
//   constructor(public service:MainService, private router: Router){
//   this.router.events.subscribe(x => { 
//   if(x instanceof NavigationEnd) { 
//   window.scroll(0,0)
//   if(localStorage.getItem('adminId') === null){ 
  
//   if(!((this.router.url === '/login')||(this.router.url === '/forgotPassword')) ){
//   this.router.navigate(['/login']);
//   } 
  
//   } else {
//   if(this.router.url === '/login'){
//   this.router.navigate(['/dashboard'])
//   }
//   }
//   }
//   });
//   }
//   }
  
  