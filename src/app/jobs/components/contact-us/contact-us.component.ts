import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  isLoading = false;
  model: any = {};
  isSucess = false;
  formErrorMessage: string;

  constructor(
    private jobService: JobService
  ) {}


  onSubmit (form: NgForm) {
    this.isLoading = true;
    this.formErrorMessage = "";
    this.isSucess =false;
    this.jobService
      .sendContactAdmin(this.model)
      .subscribe(_ => {
        this.isLoading = false;
        form.resetForm();
        this.isSucess = true;
      }, error => {
        this.isLoading = false;
        this.formErrorMessage = error.error.message;
      });
  }

}
