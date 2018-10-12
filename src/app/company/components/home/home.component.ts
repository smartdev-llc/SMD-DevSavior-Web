import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('moveInLeft', [
      state('left', style({ transform: 'translateX(-100px)', opacity: 0 })),
      state('right', style({ transform: 'translate(0)', opacity: 1 })),
      transition('left => right', animate('1s ease-out'))
    ]),

    trigger('moveInRight', [
      state('right', style({ transform: 'translateX(100px)', opacity: 0 })),
      state('left', style({ transform: 'translate(0)', opacity: 1 })),
      transition('right => left', animate('3s ease-out'))
    ]),

    trigger('moveInBottom', [
      state('bottom', style({ transform: 'translateY(100px)', opacity: 0 })),
      state('top', style({ transform: 'translate(0)', opacity: 1 })),
      transition('bottom => top', animate('3s ease-out'))
    ]),

    trigger('moveInTop', [
      state('top', style({ transform: 'translateY(-100px)', opacity: 0 })),
      state('bottom', style({ transform: 'translate(0)', opacity: 1 })),
      transition('bottom => top', animate('3s ease-out'))
    ]),
  ]
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
