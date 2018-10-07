import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // fake data
  job = {
    "students": [],
    "skills": [],
    "createdAt": 1537758017205,
    "updatedAt": 1537758017205,
    "id": 1,
    "status": "ACTIVE",
    "title": "tuyendung",
    "description": "smd tuyen dung",
    "company": {
      "createdAt": 1537757525784,
      "updatedAt": 1537757824159,
      "id": 5,
      "email": "njnnguyen.tl95@gmail.com",
      "name": "Smartdev",
      "address": "255 Hung Vuong",
      "city": "DN",
      "contactName": "Tam T",
      "phoneNumber": "0934856175",
      "website": "http://juniorviec.com",
      "description": "",
      "logoURL": "http://via.placeholder.com/350x150",
      "coverURL": "",
      "photoURLs": null,
      "videoURL": "",
      "status": "ACTIVE",
      "emailVerified": true
    },
    "category": {
      "createdAt": 1537471461554,
      "updatedAt": 1537471461554,
      "id": 1,
      "name": "Backend Developer"
    }
  }

  constructor() {
  }

  ngOnInit() {
  }
}
