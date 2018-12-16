import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'notification-jobs',
  templateUrl: './notification-jobs.component.html',
  styleUrls: ['./notification-jobs.component.scss']
})
export class NotificationJobs implements OnInit {
  @ViewChild('notificationAlert') notificationAlert: ModalDirective;
  modalRef: BsModalRef;
  users = [
    { id: '1', name: 'Graduated' },
    { id: '2', name: 'Employee' },
    { id: '3', name: 'Leader' },
    { id: '4', name: 'Manager' },
    { id: '5', name: 'Direction' }
  ];

  cities2 = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys' },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' },
    { id: 6, name: 'Hallo' },
    { id: 7, name: 'Da Nang' },
    { id: 8, name: 'Sai Gon' },
    { id: 9, name: 'Ha Noi' }
  ];
  career = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys' },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' },
    { id: 6, name: 'Hallo' },
    { id: 7, name: 'Da Nang' },
    { id: 8, name: 'Sai Gon' },
    { id: 9, name: 'Ha Noi' }
  ]

  selectedCareerIds: number;
  selectedCityIds: number;
  selectedUserIds: number[];
  model;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  openModal() {
    this.notificationAlert.show();
  }

  decline() {
    this.notificationAlert.hide();
  }


  addCustomUser = (term) => ({ id: term, name: term });

}
