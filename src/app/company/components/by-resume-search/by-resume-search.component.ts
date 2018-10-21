import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-resume-search',
  templateUrl: './by-resume-search.component.html',
  styleUrls: ['./by-resume-search.component.scss']
})
export class ByResumeSearchComponent implements OnInit {

  users = [
    { id: '1', name: 'Graduated' },
    { id: '2', name: 'Employee' },
    { id: '3', name: 'Leader' },
    { id: '4', name: 'Manager' },
    { id: '5', name: 'Direction' }
  ];

  selectedUserIds: number[];
  model;
  constructor() { }

  ngOnInit() { }

  addCustomUser = (term) => ({ id: term, name: term });
}
