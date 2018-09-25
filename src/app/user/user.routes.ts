import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateProfileStep1Component } from './components/update-profile/step1/step1.component';
import { UpdateProfileStep2Component } from './components/update-profile/step2/step2.component';
import { UpdateProfileStep3Component } from './components/update-profile/step3/step3.component';
import { UpdateProfileStep4Component } from './components/update-profile/step4/step4.component';
import { UpdateProfileStep5Component } from './components/update-profile/step5/step5.component';

export const UserRoutes = [
  { path: 'my-career-center',
    children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'update-profile',
            children: [
              { path: '', redirectTo: 'step1', pathMatch: 'full' },
              { path: 'step1', component: UpdateProfileStep1Component },
              { path: 'step2', component: UpdateProfileStep2Component },
              { path: 'step3', component: UpdateProfileStep3Component },
              { path: 'step4', component: UpdateProfileStep4Component },
              { path: 'step5', component: UpdateProfileStep5Component },
            ]
          }
      ]
  }
];
