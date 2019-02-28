import { StRegisterComponent } from './components/st-register/st-register.component';
import { StLoginComponent } from './components/st-login/st-login.component';
import { RegisterSuccessComponent } from './components/registerSuccess/registerSuccess.component';
import { StLostPasswordComponent } from './components/st-lost-password/st-lost-password.component';
import { StResetPasswordComponent } from './components/st-reset-password/st-reset-password.component';
import { StVerifyAccountComponent } from './components/st-verify-account/st-verify-account.component';
import { PolicyComponent } from './components/policy/policy.component';
import { StudentLoggedGuard } from '../core/guards/student-logged.guard';
import { CompanyLoggedGuard } from '../core/guards/company-logged.guard';
import { RegisterSuccessCPComponent } from './components/registerSuccessCP/registerSuccessCP.component';

export const AuthRoutes = [
  { path: 'register', component: StRegisterComponent, canActivate: [StudentLoggedGuard] },
  { path: 'login', component: StLoginComponent, canActivate: [StudentLoggedGuard] },
  { path: 'register-success', component: RegisterSuccessComponent, canActivate: [StudentLoggedGuard] },
  { path: 'cp-register-success', component: RegisterSuccessCPComponent, canActivate: [CompanyLoggedGuard] },
  { path: 'lost-password', component: StLostPasswordComponent, canActivate: [StudentLoggedGuard] },
  { path: 'reset-password', component: StResetPasswordComponent },
  { path: 'verify-account', component: StVerifyAccountComponent },
  { path: 'privacy-policy', component: PolicyComponent }
];
