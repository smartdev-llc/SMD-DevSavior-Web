import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    /* Handle for UI using Jquery */
    var header = $('#header');

    $(document).ready(() => {
      setTimeout(() => {
        $('#loadessr').fadeOut();
        $('[data-parallax="scroll"]').parallax();
      }, 500);

      $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
          header.addClass('fixed-header');

        } else {
          header.removeClass('fixed-header');
        }
      });
    });
    /* End Handle for UI using Jquery */

  }

}
