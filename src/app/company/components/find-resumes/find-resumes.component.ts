import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-resumes',
  templateUrl: './find-resumes.component.html',
  styleUrls: ['./find-resumes.component.scss']
})
export class FindResumesComponent implements OnInit {
  
  users = [
    {id: '1', name: 'Graduated'},
    {id: '2', name: 'Employee'},
    {id: '3', name: 'Leader'},
    {id: '4', name: 'Manager'},
    {id: '5', name: 'Direction'}
];

selectedUserIds: number[];
today: number = Date.now();
model;
constructor() {}

ngOnInit(){}

addCustomUser = (term) => ({id: term, name: term});
}
