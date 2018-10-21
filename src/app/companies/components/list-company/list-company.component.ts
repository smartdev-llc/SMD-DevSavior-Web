import { Component, OnInit } from '@angular/core';
import { InfoCompanyService } from '../../../core/services/company/InfoCompany.service'
import { Company } from '../../../core/models/company';
@Component({
  selector: 'list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {

  companies:Company;
  constructor(
    private infoCompanyService : InfoCompanyService
  ) {
  }
  ngOnInit() {
    this.getIdcompany();
  }
  getIdcompany (){
    this.infoCompanyService.getInfoAllCompany().subscribe(companies => this.companies = companies);
    
  } 
}
