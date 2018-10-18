import { Component, OnInit,Input} from '@angular/core';
import { Company }  from '../../../core/models/company';
@Component({
  selector: 'company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent implements OnInit {
  @Input() company: Company;

  constructor() { }

  ngOnInit() {
  }

}
