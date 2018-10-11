import { BrowseJobsComponent } from './components/list-browse-jobs/browse-jobs.component';
import { BrowseJobsAlternativeComponent } from './components/list-browse-jobs-alternative/browse-jobs-alternative.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';

import { JobCategories }  from './components/list-browse-jobs/job-resolve';

export const JobsRoutes = [
  { path: 'browse-jobs', component: BrowseJobsComponent,
    resolve: {
      jobCategories: JobCategories
    }
  },
  { path: 'browse-jobs-alternative', component: BrowseJobsAlternativeComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'post-job', component: PostJobComponent },
  { path: 'contact-us', component: ContactUsComponent}
];
