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


}
