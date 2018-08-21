import { StRegisterComponent } from './components/st-register/st-register.component';
import { StLoginComponent } from './components/st-login/st-login.component';
import { RegisterSuccessComponent } from './components/registerSuccess/registerSuccess.component';
import { StLostPasswordComponent } from './components/st-lost-password/st-lost-password.component';

export const AuthRoutes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'register', component: StRegisterComponent },
  { path: 'login', component: StLoginComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'lost-password', component: StLostPasswordComponent }
];
