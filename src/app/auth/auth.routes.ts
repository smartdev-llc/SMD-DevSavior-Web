import { StRegisterComponent } from './components/st-register/st-register.component';
import { StLoginComponent } from './components/st-login/st-login.component';
import { RegisterSuccessComponent } from './components/registerSuccess/registerSuccess.component';

export const AuthRoutes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'register', component: StRegisterComponent },
  { path: 'st-login', component: StLoginComponent },
  { path: 'register-success', component: RegisterSuccessComponent }
];
