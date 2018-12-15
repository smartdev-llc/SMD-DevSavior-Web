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

  selectedUserIds: number[];
  model;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  openModal(){
    this.notificationAlert.show();
  }

  decline(){
    this.notificationAlert.hide();
  }

  addCustomUser = (term) => ({ id: term, name: term });

}
