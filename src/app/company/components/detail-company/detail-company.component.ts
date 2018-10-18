import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router'
import { InfoCompanyService } from '../../../core/services/company/InfoCompany.service'
import { Company } from '../../../core/models/company'
declare var $: any;
@Component({
  selector: 'app-detail-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['./detail-company.component.scss']
})
export class DetailCompanyComponent implements OnInit {
  slides = [
    {
      image: '../../../../assets/images/slide01.jpg',
     
    },
    {
      image: '../../../../assets/images/slide02.jpg',
     
    },
    {
      image: '../../../../assets/images/slide03.jpg',
     
    }
  ];
  company : Company;
  constructor(
    private route: ActivatedRoute,
    private infoCompanyService : InfoCompanyService
  ) {
    
   }

  ngOnInit() {
    this.getIdcompany();
  }
  getIdcompany (){
    const id = +this.route.snapshot.paramMap.get('id');
    this.infoCompanyService.getInfoCompany(id).subscribe(company => this.company = company);
    
  } 

  ngAfterViewInit() {
    $(document).ready(function(){
		  $("a").click(function(event) {

			if (this.hash !== "") {
			  event.preventDefault();

			  var hash = this.hash;

			  $('html, body').animate({
				scrollTop: $(hash).offset().top - 62
			  }, 800, function(){
		   
			  });
			}
		  });
		});
  }
}
