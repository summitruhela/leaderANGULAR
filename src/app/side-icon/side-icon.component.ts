import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-icon',
  templateUrl: './side-icon.component.html',
  styleUrls: ['./side-icon.component.scss']
})
export class SideIconComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  myprofile(){
    this.router.navigateByUrl('my_profile');   

  }
}
