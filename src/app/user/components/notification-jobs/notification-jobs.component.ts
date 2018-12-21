import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
// import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'notification-jobs',
  templateUrl: './notification-jobs.component.html',
  styleUrls: ['./notification-jobs.component.scss'],
  // providers: [AuthService]
})
export class NotificationJobs implements OnInit {
  @ViewChild('notificationAlert') notificationAlert: ModalDirective;
  modalRef: BsModalRef;
  level = [
    { id: '1', name: 'Mới tốt nghiệp' },
    { id: '2', name: 'Nhân viên' },
    { id: '3', name: 'Trưởng phòng' },
    { id: '4', name: 'Giám đốc và Cấp cao hơn' }
  ];

  selectedLevelIds: number[];
  model;
  // skills: any = [];
  // loading = true;

  constructor(
    private modalService: BsModalService) { }
  
  ngOnInit() {}

  openModal() {
    this.notificationAlert.show();
  }

  decline() {
    this.notificationAlert.hide();
  }

  addCustomUser = (term) => ({ id: term, name: term });

  
}
