import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FindResumesComponent } from './components/find-resumes/find-resumes.component';
import { JobListComponent } from "./components/job-list/job-list.component";
import { CandidateListComponent } from "./components/candidate-list/candidate-list.component";
import { DetailCandidateComponent } from './components/detail-candidate/detail-candidate.component';
import { CpRegisterComponent } from './components/cp-register/cp-register.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { CompanyProfileComponent } from "./components/company-profile/company-profile.component";
import { DetailCompanyComponent } from './components/detail-company/detail-company.component';

// Guards
import { CompanyUserAuthGuard } from '../core/guards/company-user.guard';
import { CompanyLoggedGuard } from '../core/guards/company-logged.guard';
import { CompanyVerifyAccountComponent } from './components/company-verify-account/company-verify-account.component';

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
            { path: 'profile', component: CompanyProfileComponent, canActivate: [CompanyUserAuthGuard] },
            { path: 'verify-account', component: CompanyVerifyAccountComponent, canActivate: [CompanyLoggedGuard]}
        ]
    },
    { path: 'detail-company/:id', component: DetailCompanyComponent },
    { path : 'detail-candidate', component: DetailCandidateComponent, canActivate: [CompanyUserAuthGuard]}
];
