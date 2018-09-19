import { tap, map, filter, scan} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './st-login.component.html',
  styleUrls: ['./st-login.component.scss']
})
export class StLoginComponent implements OnInit, OnDestroy {
  loginInForm: FormGroup;
  loginSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit() {
    this.initForm();
  }

  onSubmit () {
    const values = this.loginInForm.value;
    const keys = Object.keys(values);

    if (this.loginInForm.valid) {
      this.loginSubs = this.authService.login(values)
        .subscribe(user => {
          this.authService.setTokenInLocalStorage(user, false);
          this.router.navigate(['/']);
        }, error => {
          const errors = error || 'Something went wrong';
          this.pushErrorFor('password', errors.error.message);
        })
    } else {
      keys.forEach(val => {
        const ctrl = this.loginInForm.controls[val];
        if (!ctrl.valid) {
          this.pushErrorFor(val, null);
          ctrl.markAsTouched();
        };
      });
    }

  }

  initForm () {

    this.loginInForm = this.fb.group({
      'email': ['', Validators.email],
      'password': ['', Validators.required]
    });
  }

  private pushErrorFor(ctrl_name: string, msg: string) {
    this.loginInForm.controls[ctrl_name].setErrors({ 'msg': msg });
  }


  ngOnDestroy() {
    if (this.loginSubs) { this.loginSubs.unsubscribe(); }
  }

  socialLogin(provider: string) {
    this.authService.socialLogin(provider)
      .then(_ => {
        this.router.navigate(['/']);
      })
  }
}
