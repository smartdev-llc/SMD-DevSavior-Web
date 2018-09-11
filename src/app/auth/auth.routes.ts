import { StRegisterComponent } from './components/st-register/st-register.component';
import { StLoginComponent } from './components/st-login/st-login.component';
import { RegisterSuccessComponent } from './components/registerSuccess/registerSuccess.component';
import { StLostPasswordComponent } from './components/st-lost-password/st-lost-password.component';
import { StResetPasswordComponent } from './components/st-reset-password/st-reset-password.component';
import { StVerifyAccountComponent } from './components/st-verify-account/st-verify-account.component';

export const AuthRoutes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: StRegisterComponent },
  { path: 'login', component: StLoginComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'lost-password', component: StLostPasswordComponent },
  { path: 'reset-password', component: StResetPasswordComponent },
  { path: 'verify-account', component: StVerifyAccountComponent }
];
