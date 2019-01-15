import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'company-login-success',
  templateUrl: './registerSuccessCP.component.html',
  styleUrls: ['./registerSuccessCP.component.css']
})
export class RegisterSuccessCPComponent implements OnInit {

  email: String;
  constructor(  private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => this.setEmail(params));
  }

  setEmail(params) {
    this.email = params.email || '';
  }

}
