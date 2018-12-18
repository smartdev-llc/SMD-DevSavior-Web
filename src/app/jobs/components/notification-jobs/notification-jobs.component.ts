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
  level = [
    { id: '1', name: 'Mới tốt nghiệp' },
    { id: '2', name: 'Nhân viên' },
    { id: '3', name: 'Trưởng phòng' },
    { id: '4', name: 'Giám đốc và Cấp cao hơn' }
  ];

  area = [
    { id: 1, name: 'Hồ Chí Minh' },
    { id: 2, name: 'Hà Nội' },
    { id: 3, name: 'ĐBSCL' },
    { id: 4, name: 'An Giang' },
    { id: 5, name: 'Bà rịa - Vũng Tàu' },
    { id: 6, name: 'Bắc Kan' },
    { id: 7, name: 'Bắc Giang' },
    { id: 8, name: 'Đà Nẵng' },
    { id: 9, name: 'Kiên Giang' }
  ];
  career = [
    { id: 1, name: 'Developer' },
    { id: 2, name: 'Tester' },
    { id: 3, name: 'IT-Helpdesk' },
    { id: 4, name: 'Human Resources' },
    { id: 5, name: 'Project Manager/Project Owner' },
    { id: 6, name: 'Team Leader' },
    { id: 7, name: 'Designer' }
  ]

  selectedCareerIds: number;
  selectedCityIds: number;
  selectedLevelIds: number[];
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
