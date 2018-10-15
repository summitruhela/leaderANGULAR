import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {
  data: any = []
  address: any
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
      userType: "ADMIN",
      page: this.p,
      limit: this.limit
    }
    this.service.postApi('user/showTokenAdmin', dataa, 0).subscribe((response: any) => {
      if (response.responseCode == 200) {
        this.data = response.data.docs
        this.total = response.data.total
        // console.log("##$#$#$#", response)
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

  search() {
    // console.log("addressaddressaddressaddress", this.searchValue)
    let data = {
      _id: localStorage.adminId,
      search: this.searchValue,
      userType: "ADMIN"
    }
    // console.log(data)
    localStorage.token
    this.service.postApi(`user/showTokenAdmin`, data, 0).subscribe((response: any) => {

      if (response.responseCode == 200) {
        this.data = response.data.docs
        // console.log(response)

      }
      else {

        this.service.showError(response['responseMessage'])
      }
    }, error => {
      this.service.showError('Something Went Wrong=======>>.Api Error')
    })

  }
  status(data) {
    let status = {
      tokenAddress: data.tokenAddress,
      status: data.action == "DEACTIVE" ? "ACTIVE" : "DEACTIVE",
    }
    this.service.postApi(`user/changeStatusOfToken`, status, 0).subscribe((response: any) => {

      if (response.responseCode == 200) {
       /*  this.data = response.data.docs
        // console.log("response is done", response) */
        this.service.showSuccess("SUCCESS")
        this.getdata()

      }
      else {

        this.service.showError(response['responseMessage'])
      }
    }, error => {
      this.service.showError('Something Went Wrong=======>>.Api Error')
    })
  }

  adminToken() {
    this.router.navigate(['/token'])
  }
  userToken() {
    this.router.navigate(['/user-token'])
  }
  changePage(page) {

    // console.log("page-->", page);
    this.p = page;
    this.getdata();
  }
}
