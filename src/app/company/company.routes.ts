import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FindResumesComponent } from './components/find-resumes/find-resumes.component';
import { JobListComponent } from "./components/job-list/job-list.component";
import { CandidateListComponent } from "./components/candidate-list/candidate-list.component";
import { DetailCandidateComponent } from './components/detail-candidate/detail-candidate.component';
import { CpRegisterComponent } from './components/cp-register/cp-register.component';
import { StatisticComponent } from './components/statistic/statistic.component';

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
        ]
    },
    { path : 'detail-candidate', component: DetailCandidateComponent, canActivate: [CompanyUserAuthGuard]}
];
