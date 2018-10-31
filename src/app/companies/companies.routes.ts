import { ListCompanyComponent } from './components/companies/companies.component';
import { DetailCompanyComponent } from './components/company-detail/company-detail.component';

export const CompaniesRoutes = [
  { path: 'companies', component: ListCompanyComponent },
  { path: 'company/:id', component: DetailCompanyComponent }
];
