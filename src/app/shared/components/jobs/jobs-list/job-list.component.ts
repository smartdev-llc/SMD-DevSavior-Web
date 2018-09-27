import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
    jobsPerPage = 3;
    page: number;

  jobs = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
    { title: 'Slide 4' },
    { title: 'Slide 5' },
    { title: 'Slide 6' },
    { title: 'Slide 7' }
  ]

  constructor() {
    this.page = Math.ceil(this.jobs.length / this.jobsPerPage);
   }

  ngOnInit() { }

  get fakeArray(): any[] {
    return new Array(this.page);
  }

  getStartIndexOfPage(page: number): number {
    console.log(page*this.jobsPerPage);
    return page*this.jobsPerPage;
    
  }

  getEndIndexOfPage(page: number): number {
    console.log((page+1) * this.jobsPerPage);
    return (page+1) * this.jobsPerPage > this.jobs.length ? this.jobs.length : (page+1) * this.jobsPerPage;
  }

 
}
