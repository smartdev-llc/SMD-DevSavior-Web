import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../../core/services/job.service';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  typeJobs: any;
  constructor(
    private jobService: JobService

  ) { }
  ngOnInit() {
      this.jobService.getCountJobs().subscribe(data => {
        this.typeJobs = data;
      })
      console.log(this.typeJobs)
  }

}
