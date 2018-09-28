import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],

})
export class JobItemComponent implements OnInit {
  @Input() job: any;


  constructor(){ 
  }

  ngOnInit() {}


}
