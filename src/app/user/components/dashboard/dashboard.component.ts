import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { StudentUserService } from '../../services/student-user.serivce';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { JobService } from '../../../core/services/job.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  jobs: any = [];
  profile: any = {};
  user: User;
  profileImageURL: string = '';

  constructor(
    private studentUserService: StudentUserService,
    private jobService: JobService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.preLoadData();
    this.getJobItem();
  }

  preLoadData(): void {
    this.user = this.authService.getCurrentUser();
    this.studentUserService.getMyProfile()
      .subscribe(res => {
        this.profile = res;
        this.profileImageURL = res.profileImageURL;
      })
  }

  getJobItem() {
    const params = new HttpParams().set('size', '10');

    this.jobService.searchJobs(params)
      .subscribe(jobs => {
          this.jobs = jobs.list;
        },
        error => {
        }
      )
  }
}
