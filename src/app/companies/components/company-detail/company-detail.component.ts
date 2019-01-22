import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router'
import { Company } from '../../../core/models/company'
import { LanguageService } from '../../../layout/services/language.service';
import { JobService } from '../../../core/services/job.service';
declare var $: any;
@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class DetailCompanyComponent implements OnInit {
  /* Integrate later(next release)
  slides = [
    {
      image: 'assets/images/company-detail.png',
    }
  ];
  */
  company: Company = new Company();
  jobs: any[];
  isLoadJob = false;
  size = 5;
  page = 0;
  companyId: string;
  hideShowMoreButton = true;

  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private jobService: JobService
  ) {
    const lang = languageService.getCachedLanguage()
    languageService.setDefaultLang()
  }

  ngOnInit() {
    this.getCompanyInformation();
  }

  getCompanyInformation() {
    this.route.data.subscribe(({ companyDetail }) => {
      this.company = companyDetail;
    });

    this.companyId = this.route.snapshot.paramMap.get('id');
    this.getJobsOfCompany(this.companyId);
  }

  async getJobsOfCompany(id: any) {
    this.getJob();
  }

  loadMoreJob() {
    this.getJob();
  }

  getJob() {
    this.isLoadJob = true;
    this.hideShowMoreButton = true;
    this.jobService.getJobsOfCompany(this.companyId, this.size, this.page)
      .subscribe(response => {
        this.appendJob(response.list);
        this.page++;
        this.hideShowMoreButton =  this.page * response.size >= response.total;
        this.isLoadJob = false;
      },
        error => {
          this.isLoadJob = false;
          this.hideShowMoreButton = true;
        }
      );
 
  }

  appendJob(jobs: any[]) {
    if (!this.jobs) {
      this.jobs = jobs
    } else {
      this.jobs = this.jobs.concat(jobs);
    }
  }

  ngAfterViewInit() {
    $(document).ready(function() {
      $("a").click(function(event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 62
          }, 800, function() {
          });
        }
      });
    });
  }
}
