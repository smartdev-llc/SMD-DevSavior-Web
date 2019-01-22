import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],

})
export class JobItemComponent implements OnInit {
  @Input() job: any;
  @Input() showCompanyName = true;
  urlEndpoint: string = environment.apiEndpoint;

  constructor(){
  }

  ngOnInit() {}


}
