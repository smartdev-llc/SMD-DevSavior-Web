import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder,
         FormGroup,
         Validators} from '@angular/forms';
import { Role } from '../../../core/models/user';
import { delay } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-st-lost-pasword',
  templateUrl: './st-lost-password.component.html',
  styleUrls: ['./st-lost-password.component.scss']
})
export class StLostPasswordComponent implements OnInit {

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
    this.authService.forgotPassword(this.lostPasswordForm.value.email, Role.Student)
                    .subscribe(
                      data => {
                        this.requested = true;
                        this.loading = false;
                      },
                      error => {
                        if(error.status >= 500) {
                          this.lostPasswordForm.setErrors({globalError: 'Oops! Something bad happened. Please come back later!'})
                        } else {
                          this.lostPasswordForm.setErrors({globalError: error.error.message});
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
