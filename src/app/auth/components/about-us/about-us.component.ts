import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  teams = [
    {
      name: 'Le Vu Nguyen',
      avatar: '../../../../assets/images/nguyen.jpg',
      linkFB: 'https://www.facebook.com/le.v.nguyen.18',
      decsription: 'Founder and Sales Manager JuniorViec',
      position:' Sales Manager'
    },
    {
      name: 'Tran Tien Dung',
      avatar: '../../../../assets/images/dung.jpg',
      linkFB: 'https://www.facebook.com/ttdung11t2',
      decsription: 'Back-end Developer of JuniorViec',
      position:'Back-end Developer'
    },
    {
      name: 'Nguyen Phuoc Anh THu',
      avatar: '../../../../assets/images/thu.jpg',
      linkFB: 'https://www.facebook.com/anhthu.nguyenphuoc',
      decsription: 'Front-end Developer of JuniorViec',
      position:'Front-end Developer'
    },
    {
      name: 'Huynh Thien Tai',
      avatar: '../../../../assets/images/tai.jpg',
      linkFB: 'https://www.facebook.com/aibietcaij',
      decsription: 'Front-end Developer of JuniorViec',
      position:'Front-end Developer'
    },
    {
      name: 'Le Khanh Duy',
      avatar: '../../../../assets/images/duy.jpg',
      linkFB: 'https://www.facebook.com/khanhduy.179',
      decsription: 'Back-end Developer of JuniorViec',
      position:'Back-end Developer'
    },
    {
      name: 'Vo Hong Van',
      avatar: '../../../../assets/images/van.jpg',
      linkFB: 'https://www.facebook.com/vonguu',
      decsription: 'Front-end Developer of JuniorViec',
      position:'Front-end Developer'
    },
    {
      name: 'Phan Hoang Long',
      avatar: '../../../../assets/images/long.jpg',
      linkFB: 'https://www.facebook.com/long.lch',
      decsription: 'Front-end Developer of JuniorViec',
      position:'Front-end Developer'
    },
    {
      name: 'Nguyen Van Vu',
      avatar: '../../../../assets/images/vu.jpg',
      linkFB: 'https://www.facebook.com/vunv.uk',
      decsription: 'Front-end Developer of JuniorViec',
      position:'Front-end Developer'
    },
    {
      name: 'Vo Quang Tuan',
      avatar: '../../../../assets/images/tuan.jpg',
      linkFB: 'https://www.facebook.com/quangtuandev',
      decsription: 'Front-end Developer of JuniorViec',
      position:'Front-end Developer'
    },
    {
      name: 'Vo Van Chuong',
      avatar: '../../../../assets/images/profile-placeholder.png',
      linkFB: '',
      decsription: 'Back-end Developer of JuniorViec',
      position:'Back-end Developer'
    },
  ];
  constructor() { }

  ngOnInit() {
    
  }

}
