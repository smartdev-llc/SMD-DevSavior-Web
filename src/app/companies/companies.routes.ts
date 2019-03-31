import { ListCompanyComponent } from './components/companies/companies.component';
import { DetailCompanyComponent } from './components/company-detail/company-detail.component';
import { CompanyDetailResolve } from './components/company-detail/company-detail.resolve';

export const CompaniesRoutes = [
  { path: 'companies', component: ListCompanyComponent },
  { path: 'company/:slug', component: DetailCompanyComponent,
    resolve: {
      companyDetail: CompanyDetailResolve
    }
  }
];
