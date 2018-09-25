import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'steps-update-profile',
  templateUrl: './steps-update-profile.component.html',
  styleUrls: ['./steps-update-profile.component.scss']
})
export class StepsUpdateProfile implements OnInit {
  @Input() currentPage: Number;

  constructor() {
  }

  ngOnInit() {
  }
}
