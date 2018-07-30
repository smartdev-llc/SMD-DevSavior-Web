import { BrowseJobsComponent } from './components/list-browse-jobs/browse-jobs.component';
import { BrowseJobsAlternativeComponent } from './components/list-browse-jobs-alternative/browse-jobs-alternative.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { PostJobComponent } from './components/post-job/post-job.component';

export const JobsRoutes = [
  { path: 'browse-jobs', component: BrowseJobsComponent },
  { path: 'browse-jobs-alternative', component: BrowseJobsAlternativeComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'post-job', component: PostJobComponent }
];
