import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
    n = 5;

  items = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' }
  ]

  constructor() { }

  ngOnInit() { }
 
}
