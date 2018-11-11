import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { StudentUserService } from '../../services/student-user.serivce';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  jobs: any = [];
  profile: any = {};
  user: User;
  profileImageURL: string = 'assets/images/profile-placeholder.png';

  constructor(
    private studentUserService: StudentUserService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.preLoadData();
    this.getJobItem();
  }

  preLoadData(): void {
    this.user = this.authService.getCurrentUser();
    this.profileImageURL = this.user.profileImageURL ? environment.apiEndpoint + this.user.profileImageURL : this.profileImageURL;
    this.studentUserService.getMyProfile()
      .subscribe(res => {
        this.profile = res;
      })
  }

  getJobItem() {
    this.authService.getJobItem()
      .subscribe(res => {
        const jobs: any = res;
          this.jobs = jobs.slice(0, 10);
        },
        error => {
        }
      )
  }
}
