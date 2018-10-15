import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isActive: any;
  constructor(public route: Router) { }

  ngOnInit() {
    this.isActive = event;
    let url = window.location.href.split('/')
    let page = url[url.length - 1]
    this.isActive = page;
    console.log("isactive===>>", this.isActive)
  }
  tabManag(event) {
    this.isActive = event;
    let url = window.location.href.split('/')
    let page = url[url.length - 1]
    this.isActive = page;
    this.route.navigate(['/' + event])
  }

}
