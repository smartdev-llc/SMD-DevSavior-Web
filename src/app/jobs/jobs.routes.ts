import { JobsComponent } from './components/list-jobs/jobs.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { PostJobComponent } from './components/post-job/post-job.component';

export const JobsRoutes = [
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'post-job', component: PostJobComponent }
];
