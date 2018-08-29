import { Component, OnInit, AfterViewInit } from '@angular/core';



declare var $:any;
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})

export class HomeHeaderComponent implements OnInit, AfterViewInit {
  constructor(){}
  
  

  ngOnInit() {
  }
  ngAfterViewInit() {	
      $(document).ready(function(){
      $("#search-icon").click(function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
        scrollTop: $(hash).offset().top - 70
        }, 800, function(){
        });
      } 
      });
    });
  }

}
