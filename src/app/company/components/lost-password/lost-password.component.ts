import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder,
         FormGroup,
         Validators} from '@angular/forms';
import { Role } from '../../../core/models/user';

@Component({
  selector: 'app-lost-pasword',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {

  lostPasswordForm: FormGroup;
  requested = false;
  submitted = false;
  loading = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.lostPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.lostPasswordForm.controls;
  }

  sendLostPasswordEmail() {
    this.submitted = true;
    this.loading = true;
    if (this.lostPasswordForm.invalid) {
      this.loading = false;
      return ;
    }
    this.authService.forgotPassword(this.lostPasswordForm.value.email, Role.Company)
                    .subscribe(
                      data => {
                        this.requested = true;
                        this.loading = false;
                      },
                      error => {
                        if(error.status >= 500) {
                          this.lostPasswordForm.setErrors({globalError: 'Oops! Something bad happened. Please come back later!'})
                        } else {
                          this.lostPasswordForm.controls.email.setErrors({nonExisted: true})
                        }
                        this.loading = false;
                      });
  }

  get givenEmail() {
    return this.lostPasswordForm.value.email || '';
  }

  get hasServerError() {
    return this.submitted && this.lostPasswordForm.errors != null && this.lostPasswordForm.errors.globalError != null;
  }

  get globalError() {
    return this.lostPasswordForm.errors.globalError;
  }
}
