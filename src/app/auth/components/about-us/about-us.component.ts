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
      decsription: 'Web Developer of JuniorViec',
      position:'Web Developer'
    },
    {
      name: 'Nguyen Phuoc Anh THu',
      avatar: '../../../../assets/images/thu.jpg',
      linkFB: 'https://www.facebook.com/anhthu.nguyenphuoc',
      decsription: 'Web Developer of JuniorViec',
      position:'Web Developer'
    },
    {
      name: 'Huynh Phi Thien Tai',
      avatar: '../../../../assets/images/tai.jpg',
      linkFB: 'https://www.facebook.com/aibietcaij',
      decsription: 'Web Developer of JuniorViec',
      position:'Web Developer'
    },
    {
      name: 'Vo Van Chuong',
      avatar: '../../../../assets/images/chuong.png',
      linkFB: '',
      decsription: 'Web Developer of JuniorViec',
      position:'Web Developer'
    },
    {
      name: 'Vo Hong Van',
      avatar: '../../../../assets/images/van.jpg',
      linkFB: 'https://www.facebook.com/vonguu',
      decsription: 'Web Developer of JuniorViec',
      position:'Web Developer'
    },
    {
      name: 'Phan Hoang Long',
      avatar: '../../../../assets/images/long.jpg',
      linkFB: 'https://www.facebook.com/long.lch',
      decsription: 'Web Developer of JuniorViec',
      position:'Web Developer'
    },
    {
      name: 'Le Khanh Duy',
      avatar: '../../../../assets/images/duy.jpg',
      linkFB: 'https://www.facebook.com/khanhduy.179',
      decsription: 'Web Developer of JuniorViec',
      position:'Web Developer'
    },
    {
      name: 'Vo Quang Tuan',
      avatar: '../../../../assets/images/tuan.jpg',
      linkFB: 'https://www.facebook.com/quangtuandev',
      decsription: 'Web Developer of JuniorViec',
      position:'Web Developer'
    },
    {
      name: 'Pham Hong Phuc',
      avatar: '../../../../assets/images/phuc.jpg',
      linkFB: 'https://www.facebook.com/hongphucpham97',
      decsription: 'QA of JuniorViec',
      position:'QA'
    },
    {
      name: 'Vo Ngoc Anh',
      avatar: '../../../../assets/images/anh.jpg',
      linkFB: 'https://www.facebook.com/ngocanh.le.1029',
      decsription: 'QC of JuniorViec',
      position:'QC'
    },
    {
      name: 'Le Nguyen Thanh Tuyen',
      avatar: '../../../../assets/images/tuyen.jpg',
      linkFB: 'https://www.facebook.com/dau.eyo',
      decsription: 'QC of JuniorViec',
      position:'QC'
    },
    
  ];
  constructor() { }

  ngOnInit() {
    
  }

}
