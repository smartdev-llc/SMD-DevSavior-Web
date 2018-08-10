import { StRegisterComponent } from './components/st-register/st-register.component';
import { StLoginComponent } from './components/st-login/st-login.component';
import { StLostPasswordComponent } from './components/st-lost-password/st-lost-password.component';

export const AuthRoutes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'st-register', component: StRegisterComponent },
  { path: 'st-login', component: StLoginComponent },
  { path: 'st-lost-password', component: StLostPasswordComponent}
];
