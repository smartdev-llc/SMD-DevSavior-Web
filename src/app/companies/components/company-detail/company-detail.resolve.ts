import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { InfoCompanyService } from '../../../core/services/company/InfoCompany.service';

@Injectable()
export class CompanyDetailResolve implements Resolve<any> {
  constructor(
    private infoCompanyService: InfoCompanyService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const companyId = route.paramMap.get('slug');
    return this.infoCompanyService.getInfoCompany(companyId);
  }
}
