import { HomeComponent } from './home.component';
import { JobCategories }  from './jobs-filters/job-resolve';

export const HomeRoutes = [
  { path: '', component: HomeComponent,
    resolve: {
      jobCategories: JobCategories
    }
  }
];
