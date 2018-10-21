import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FindResumesComponent } from './components/find-resumes/find-resumes.component';
import { JobListComponent } from "./components/job-list/job-list.component";
import { CandidateListComponent } from "./components/candidate-list/candidate-list.component";
import { DetailCandidateComponent } from './components/detail-candidate/detail-candidate.component';
import { CpRegisterComponent } from './components/cp-register/cp-register.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { DetailCompanyComponent } from './components/detail-company/detail-company.component';
import { ProfileDeletedComponent } from './components/profile-deleted/profile-deleted.component';
import { BlackListCandidateComponent } from './components/blacklist-candidate/blacklist-candidate.component';
import { ByResumeSearchComponent } from './components/by-resume-search/by-resume-search.component';
import { ByJobsComponent } from './components/by-jobs/by-jobs.component';
// Guards
import { CompanyUserAuthGuard } from '../core/guards/company-user.guard';
import { CompanyLoggedGuard } from '../core/guards/company-logged.guard';

export const CompanyRoutes = [
  {
    path: 'employer',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, canActivate: [CompanyLoggedGuard] },
      { path: 'register', component: CpRegisterComponent, canActivate: [CompanyLoggedGuard] },
      { path: 'home', component: HomeComponent },
      { path: 'find-resumes', component: FindResumesComponent, canActivate: [CompanyUserAuthGuard] },
      { path: 'jobs', component: JobListComponent, canActivate: [CompanyUserAuthGuard] },
      { path: 'candidates', component: CandidateListComponent, canActivate: [CompanyUserAuthGuard] },
      { path: 'statistic', component: StatisticComponent, canActivate: [CompanyUserAuthGuard] },
      { path: 'post-job', component: PostJobComponent, canActivate: [CompanyUserAuthGuard] },
      { path: 'blacklist-candidate', component: BlackListCandidateComponent },
      { path: 'profile-deleted', component: ProfileDeletedComponent },
      { path: 'by-resume-search', component: ByResumeSearchComponent },
      { path: 'by-jobs', component: ByJobsComponent }
    ]
  },
  { path: 'detail-company/:id', component: DetailCompanyComponent },
  { path: 'detail-candidate', component: DetailCandidateComponent, canActivate: [CompanyUserAuthGuard] }
];
