import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  providers: [AuthService]
})
export class JobListComponent implements OnInit {
  jobsPerPage = 6;
  page: number;
  loading = true;
  jobs: any = [];
  pages: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getJobItem();
  }

  getJobItem() {
    this.authService.getJobItem()
      .subscribe(
        jobs => {
          this.loading = false;
          this.jobs = jobs;
          this.page = Math.ceil(this.jobs.length / this.jobsPerPage);
          this.pages = new Array(this.page);
        },
        error => {
          this.loading = false;
          console.log(error)
        }
      )
  }

  getStartIndexOfPage(page: number): number {
    return page * this.jobsPerPage;
  }

  getEndIndexOfPage(page: number): number {
    return (page + 1) * this.jobsPerPage > this.jobs.length ? this.jobs.length : (page + 1) * this.jobsPerPage;
  }


}
