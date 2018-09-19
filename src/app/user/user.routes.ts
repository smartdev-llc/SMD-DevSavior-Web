import { DashboardComponent } from './components/dashboard/dashboard.component';

export const UserRoutes = [
  { path: 'my-career-center',
    children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent }
      ]
  }
];
