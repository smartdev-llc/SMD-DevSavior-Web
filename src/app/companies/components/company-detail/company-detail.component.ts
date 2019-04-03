import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Company } from '../../../core/models/company'
import { LanguageService } from '../../../layout/services/language.service';
import { ReviewCompany } from '../../../shared/components/review-company/review-company.component';
import { JobService } from '../../../core/services/job.service';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap';
import { AuthService } from '../../../core/services/auth.service';
import { AppErrors } from '../../../core/error/app-errors';
import { InternalServer } from 'src/app/core/error/internal-server';
import { BadRequest } from 'src/app/core/error/bad-request';
import { Unauthorized } from 'src/app/core/error/unauthorized';

import {Role, User} from '../../../core/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class DetailCompanyComponent implements OnInit {
  @ViewChild('reviewCompanyAlert') reviewCompanyAlert: ModalDirective;
  @ViewChild('remindLoginAlert') remindLoginAlert: ModalDirective;
  modalRef: BsModalRef;
  /* Integrate later(next release)
  slides = [
    {
      image: 'assets/images/company-detail.png',
    }
  ];
  */
  user: User;
  score : number = 0;
  reviewFormGroup: FormGroup;
  company: Company = new Company();
  isStudentRole: boolean;
  isCompanyRole: boolean;
  jobs: any[];
  isLoadJob = false;
  size = 5;
  page = 0;
  companyId: string;
  hideShowMoreButton = true;
  submittedReview:boolean = false;
  isSubmittedReview:boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private jobService: JobService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    const lang = languageService.getCachedLanguage()
    languageService.setDefaultLang()
  }

  ngOnInit() {
    this.getCompanyInformation();
    this.initForms();
    this.user = this.authService.getCurrentUser();
    this.isStudentRole = (this.user && this.user.role) === Role.Student;
    this.isCompanyRole = (this.user && this.user.role) === Role.Company;
  }

  initForms():void{
    this.reviewFormGroup = this.formBuilder.group({
      comment: ['', Validators.required]
    })
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

  reviewSubmit(): void{
    this.submittedReview = true;
    if(this.reviewFormGroup.invalid){
      return;
    }
    this.route.data.subscribe(({ companyDetail }) => {
      this.company = companyDetail;
    });

    this.companyId = this.route.snapshot.paramMap.get('id');
    console.log(this.companyId);

    const { comment } = this.reviewFormGroup.value;
    this.isSubmittedReview = true;
    this.updateReview(this.companyId, this.score, comment);
  }

  updateReview(companyId: string, stars: any, comment: any): void {
    this.authService.updateReview(companyId, stars, comment)
    .subscribe(response => {
      this.isSubmittedReview = false;
      this.submittedReview = false;
      this.resetReviewForm();
      this.showReviewSuccess();
      this.reviewCompanyAlert.hide();
    },
    (error: AppErrors) => {
      this.isSubmittedReview = false;
      this.showReviewError(error);
    });
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

  resetReviewForm(){
    this.reviewFormGroup.reset();
  }

  appendJob(jobs: any[]) {
    if (!this.jobs) {
      this.jobs = jobs
    } else {
      this.jobs = this.jobs.concat(jobs);
    }
  }

  handleError(error: AppErrors) {
    let serverError = undefined;
    switch (error.constructor) {
      case InternalServer:
        serverError = 'Opps! Something wrong. Please try again later.';
        break;

      case BadRequest:
      case Unauthorized:
        serverError = error.originalError;
        break;
    }

    this.reviewFormGroup.setErrors({
      serverError: serverError
    });
  }

  onRateChange = (score) => {
    this.score = score;
  }

  redirectToLogin() {
    this.remindLoginAlert.hide();
    this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
  }

  get hasRatingError(){
    return(
      this.score == 0
    )
  }
  get hasServerError(){
    return(
      this.submittedReview &&
      this.reviewFormGroup.errors != null &&
      this.reviewFormGroup.errors.serverError != null
    )
  }

  get controls(){
    return this.reviewFormGroup.controls;
  }

  showReviewSuccess(){
    this.toastr.success('Review success');
  }

  showReviewError(error:any){
    this.toastr.error('Review failed');
  }
  
  openModalRemindLogin(){
    this.remindLoginAlert.show();
  }

  openModalAddReview(){
    this.reviewFormGroup.reset();
    this.reviewCompanyAlert.show();
  }

  decline(){
    this.reviewCompanyAlert.hide();
    this.remindLoginAlert.hide();
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
