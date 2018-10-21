import { Component, OnInit } from '@angular/core';
import {JobService} from '../../../core/services/job.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  job: any;

  constructor(private jobService: JobService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let jobId = this.route.snapshot.paramMap.get('id');
    console.log('[Activated ]', this.route.snapshot.paramMap.get('id'));
    this.jobService.getDetailJob(jobId).subscribe(data =>{
      this.job = data;
    });

  }
}
