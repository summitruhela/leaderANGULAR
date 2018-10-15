import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-token',
  templateUrl: './user-token.component.html',
  styleUrls: ['./user-token.component.scss']
})
export class UserTokenComponent implements OnInit {
  data: any = []
  searchValue: any
  p: any = 1;
  limit = 5
  total: any = 1
  constructor(private service: DataService, private router: Router) { }

  ngOnInit() {
    this.getdata()
  }

  getdata() {
    let dataa = {
      _id: localStorage.adminId,
      userType: "USER",
      page:this.p,
      limit: this.limit

    }

    this.service.postApi('user/showTokenAdmin', dataa, 0).subscribe((response: any) => {
      if (response.responseCode == 200) {
        this.data = response.data.docs

        if(this.data.status=="BLOCK")
        {
          delete this.data
        }

        this.total = response.data.total
        console.log(this.data);

      }
      else {

        this.service.showError(response['responseMessage'])
      }
    }, error => {
      this.service.showError('Something Went Wrong=======>>.Api Error')
    })

  }
  search() {
    console.log("addressaddressaddressaddress", this.searchValue)

    let data = {
      _id: localStorage.adminId,
      search: this.searchValue,
      userType: "USER"
    }
    console.log(data)
    localStorage.token
    this.service.postApi(`user/showTokenAdmin`, data, 0).subscribe((response: any) => {
      if (response.responseCode == 200) {
        this.data = response.data.docs
        console.log(response)
      }
      else {
        this.service.showError(response['responseMessage'])
      }
    }, error => {
      this.service.showError('Something Went Wrong=======>>.Api Error')
    })

  }
  add() {
    this.router.navigate(['/add-token'])
  }
  adminToken() {
    this.router.navigate(['/token'])
  }
  userToken() {
    this.router.navigate(['/user-token'])
  }
  accept(add, created) {
    console.log("Id--->  ", add);
    let data = {
      tokenAddress: add,
      status: "ACCEPT",// ”DE”,
      createdBy: created

    }
    console.log(data)
    localStorage.token
    this.service.postApi(`user/changeStatusOfTokenOfUserToken`, data, 1).subscribe((response: any) => {
      if (response.responseCode == 200) {
        console.log(response);
        this.getdata();
      }
      else {
        this.service.showError(response['responseMessage'])
      }
    }, error => {
      this.service.showError('Something Went Wrong=======>>.Api Error')
    })

  }
  reject(add, created) {
    console.log("Iddd---->   ", add);
    let data = {
      tokenAddress: add,
      status: "REJECT", // ”DE”
      createdBy: created
    }
    console.log("%%%", data)
    localStorage.token
    this.service.postApi(`user/changeStatusOfTokenOfUserToken`, data, 1).subscribe((response: any) => {
      if (response.responseCode == 200) {
        console.log(response);
        this.getdata();
      }
      else {
        this.service.showError(response['responseMessage'])
      }
    }, error => {
      this.service.showError('Something Went Wrong=======>>.Api Error')
    })

  }

  changePage(page) {

    console.log("page-->", page);
    this.p = page;
    this.getdata();
  }
}
