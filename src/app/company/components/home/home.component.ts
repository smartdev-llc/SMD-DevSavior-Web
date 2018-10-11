import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides = [
    {
      image: '../../../../assets/images/slide01.jpg',
      mainTitle: 'Keep in touch & stay updated',
      bigTitle: 'WITH MARKET\nTRENDS',
      buttonTitle: 'SUBCTIBE TO NEWSLETTER'
    },
    { 
      image: '../../../../assets/images/slide02.jpg', 
      mainTitle: 'Stuck in a ‘career rut’?', 
      bigTitle: 'HELP US MATCH TO\nYOUR HR  ROLE',
      buttonTitle: 'SUBCTIBE TO NEWSLETTER'
    },
    { 
      image: '../../../../assets/images/slide03.jpg', 
      mainTitle: 'Launch Your recruitment career', 
      bigTitle: 'WITH INNOVATE\nСONSULTANCY',
      buttonTitle: 'JOHN OUR HR' 
    }
  ];

  showIndicator = true;


  constructor() { }

  ngOnInit() {
  }

 
}
