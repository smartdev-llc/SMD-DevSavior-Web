import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slideChangeMessage = '';
 
  slides = [
    {image: '../../../../assets/images/slide01.jpg'},
    {image: '../../../../assets/images/slide02.jpg'},
    {image: '../../../../assets/images/slide03.jpg'},
  ];

  constructor() { }

  ngOnInit() {
  }
 
 
  log(event: number) {
    this.slideChangeMessage = `Slide has been switched: ${event}`;
  }
}
