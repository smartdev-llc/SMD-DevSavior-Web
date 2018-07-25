import { JobsComponent } from './components/list-jobs/jobs.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

export const JobsRoutes = [
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/:id', component: JobDetailComponent }
];
