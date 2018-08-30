import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-success',
  templateUrl: './registerSuccess.component.html',
  styleUrls: ['./registerSuccess.component.css']
})
export class RegisterSuccessComponent implements OnInit {

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
