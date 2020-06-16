import { Injectable } from '@angular/core';
import { JobService } from '../../core/services/job.service';

import { Resolve } from '@angular/router';

@Injectable()
export class JobCategories implements Resolve<any> {
  constructor(private jobService: JobService) {}

  resolve() {
     return this.jobService.getJobCategories();
  }
}
