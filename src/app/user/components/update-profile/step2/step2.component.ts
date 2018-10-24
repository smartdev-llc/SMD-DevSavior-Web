import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'update-profile-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class UpdateProfileStep2Component implements OnInit {

  qualifications: Array<any>  = [
    { id: 'HIGH_SCHOOL', name: 'High school' },
    { id: 'ASSOCIATE_DEGREE', name: 'Associate’s degree' },
    { id: 'COLLEGE', name: 'College' },
    { id: 'BACHELORS', name: 'Bachelors' },
    { id: 'MASTERS', name: 'Masters' },
    { id: 'DOCTORATE', name: 'Doctorate' }
  ];

  classificationOfDegrees: Array<any>  = [
    { id: 'HIGH_SCHOOL', name: 'Average' },
    { id: 'ASSOCIATE_DEGREE', name: 'Good' },
    { id: 'COLLEGE', name: 'Excellent' }
  ]

  constructor() {
  }

  ngOnInit() {
  }
}
