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

  private lostPasswordForm: FormGroup;
  private requested = false;
  private submitted = false;
  private loading = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.lostPasswordForm = this.formBuilder.group({
      email: ['', Validators.email]
    });
  }

  get f() {
    return this.lostPasswordForm.controls;
  }

  sendLostPasswordEmail() {
    this.submitted = true;
    this.loading = true;
    if (this.lostPasswordForm.invalid) {
      return true;
    }
    this.authService.forgotPassword(this.lostPasswordForm.value.email, Role.Student)
                    .subscribe(
                      data => {
                        this.requested = true;
                        this.loading = false;
                      },
                      error => {
                        this.requested = true;
                        this.loading = false;
                      });
  }

  get givenEmail() {
    return this.lostPasswordForm.value.email || '';
  }
}
