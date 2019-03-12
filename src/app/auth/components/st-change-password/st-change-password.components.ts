import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'st-change-password',
  templateUrl: './st-change-password.components.html',
  styleUrls: ['./st-change-password.components.scss']
})
export class StChangePasssword implements OnInit {
  changePasswordFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms():void{
    this.changePasswordFormGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    })
  }
}
