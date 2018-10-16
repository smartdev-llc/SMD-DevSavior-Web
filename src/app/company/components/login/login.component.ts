import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Forbidden } from '../../../core/error/forbidden';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInForm: FormGroup;
  loginSubs: Subscription;
  isNotVerified = false;
  isResendEmailSuccess = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm () {

    this.loginInForm = this.fb.group({
      'email': ['', Validators.email],
      'password': ['', Validators.required]
    });
  }
  onSubmit () {
    const values = this.loginInForm.value;
    const keys = Object.keys(values);

    if (this.loginInForm.valid) {
      this.isResendEmailSuccess = false;
      this.loginSubs = this.authService.loginCompany(values)
        .subscribe(user => {
          this.authService.setTokenInLocalStorage(user, false);
          this.router.navigate(['/employer/home']);
        }, error => {
          if (error instanceof Forbidden) {
            console.log('forbidden', error);
            this.isNotVerified = true;

          } else {
            console.log('app error');
          }
        })
    } else {
      keys.forEach(val => {
        const ctrl = this.loginInForm.controls[val];
        if (!ctrl.valid) {
          this.pushErrorFor(val, null);
          ctrl.markAsTouched();
        }
      });
    }

  }
  private pushErrorFor(ctrl_name: string, msg: string) {
    this.loginInForm.controls[ctrl_name].setErrors({ 'msg': msg });
  }
}
