import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const UserRoutes = [
  { path: 'my-career-center',
    children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'my-profile', component: UserProfileComponent }
      ]
  }
];
