import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hotjob-item',
  templateUrl: './hotjob-item.component.html',
  styleUrls: ['./hotjob-item.component.scss']
})
export class HotJobItemComponent implements OnInit {

  @Input()
  job: any;

  constructor() { }

  ngOnInit() {
  }

}
