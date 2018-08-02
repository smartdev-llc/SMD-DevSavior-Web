import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(() => {
      setTimeout(() => {
        $("#loadessr").fadeOut();
        $('[data-parallax="scroll"]').parallax();
      }, 500);
    });
  }
}
