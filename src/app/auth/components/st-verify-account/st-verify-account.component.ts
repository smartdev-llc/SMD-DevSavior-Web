import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { pipe } from '../../../../../node_modules/rxjs';
import { Role } from '../../../core/models/user';
import { EmailValidator, Form, FormBuilder, Validators, FormGroup } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-st-verify-account',
  templateUrl: './st-verify-account.component.html',
  styleUrls: ['./st-verify-account.component.css']
})
export class StVerifyAccountComponent implements OnInit {
  private isVerified = false;
  private loading = true;
  private verifyFailed = false;
  private isSubmitted = false;
  private verificationError: string;
  private isSent = false;
  private resendverificationForm: FormGroup;


  constructor(private authService: AuthService,
              private activatedRouter: ActivatedRoute,
              private formBuilder: FormBuilder) { 
             
            }

  ngOnInit() {
    this.loading = true;
    this.resendverificationForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
    this.activatedRouter.queryParams.subscribe((param) => {
      this.verifyAccount(param.token);
    })
  }

  verifyAccount(token: string) {
    this.authService.verifyAccount(token)
                    .subscribe(response => {
                      this.loading = false;
                      this.isVerified = true;
                    }, error => {
                      this.loading = false;
                      this.verifyFailed = true;
                      this.verificationError = error.error.message;
                    })

  }

  resendVerificationEmail() {
      this.loading = true;
      this.isSubmitted = true;
      if(this.resendverificationForm.invalid) {
        this.loading = false;
        return;
      }
      this.authService.resendVerificationEmail(this.resendverificationForm.value.email, Role.Student)
                      .subscribe(data => {
                        this.loading = false;
                        this.isSent = true;
                      }, error => {
                        this.loading = false;
                        this.setError(error);
                      })
  }

  setError(error) {
    if(error.status >= 500) {
      this.resendverificationForm.setErrors({errorMessage: 'Oops! Something bad happened. Please come back later.'})
    } else {
      this.resendverificationForm.setErrors({errorMessage: error.error.message});
    }

  }

  get control() {
    return this.resendverificationForm.controls;
  }



}
