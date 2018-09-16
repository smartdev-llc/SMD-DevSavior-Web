
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const companyRoutes = [
    { path: 'employer',
      children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'home', component: HomeComponent }
        ]
    }
];