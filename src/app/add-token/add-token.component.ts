import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-token',
  templateUrl: './add-token.component.html',
  styleUrls: ['./add-token.component.scss']
})
export class AddTokenComponent implements OnInit {
  catalogues: any;
  data: any;
  name: any;
  g: String = "gsdhfgasjf"
  TokenForm: FormGroup
  address: any
  constructor(private service: DataService, private router: Router) {
    // this.TokenForm = new FormGroup({
    //   tokenAddress: new FormControl(''),
    //   tokenName: new FormControl('')
    // })
  }

  ngOnInit() {

  }
  getAddress() {
    console.log(this.address)
    let Address = {
      tokenAddress: this.address,
    }
    this.service.postApi(`user/getDecimalsymbol`, Address, 0).subscribe((response: any) => {
      // console.log("get profile data",response)
      if (response.responseCode == 200) {
        this.name = response.responseMessage.name
      }
      else {
        this.name=""
        this.service.showError('INVALID CONTRACT ADDRESS')
      }
    }, error => {
      this.service.showError('Something Went Wrong=======>>.Api Error')
    })
  }
  addToken() {
    localStorage.token
    console.log(this.address, this.name)
    let addcontract={
      _id:localStorage.adminId,
      tokenAddress:this.address,
      addedBy:"ADMIN"
    }
    this.service.postApi(`user/addToken`, addcontract, 0).subscribe((response: any) => {
      if (response.responseCode == 200) {
        this.router.navigate(['/token'])
        this.service.showSuccess(response['responseMessage'])
      }
      else {
        this.service.showError(response['responseMessage'])
      }
    })
    
  }

}
