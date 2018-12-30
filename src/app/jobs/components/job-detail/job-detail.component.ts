import {ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {JobService} from '../../../core/services/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ShareService } from '@ngx-share/core';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest';
import { Meta } from '@angular/platform-browser';

import {Role, User} from '../../../core/models/user';
import {AuthService} from '../../../core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppErrors} from '../../../core/error/app-errors';
import {Forbidden} from '../../../core/error/forbidden';
import {InternalServer} from '../../../core/error/internal-server';
import {Unauthorized} from '../../../core/error/unauthorized';
import {Duplicate} from '../../../core/error/duplicate';
import {ProfileService} from '../../../company/services/profile.service';
import {Company} from '../../../core/models/company';
import {environment} from '../../../../environments/environment';
import {NotFound} from '../../../core/error/not-found';
import {Job} from '../../../core/models/job';
import {map, switchMap, take} from 'rxjs/operators';
declare  var $: any;

@Component({
  selector: 'job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})

export class JobDetailComponent implements OnInit {
  job: any;
  user: User;
  jobId: string;
  isStudentRole: boolean;
  isCompanyRole: boolean;
  isLoading: boolean;
  company: Company;
  enviromentObj = environment;
  coverCompany = 'assets/images/job-image.png';
  logoCompany = 'assets/images/widget1image.png';
  fbIcon = faFacebookSquare;
  pinIcon = faPinterest;
  linkedInIcon = faLinkedinIn;
  googlePlusIcon = faGooglePlusG;
  btnApplyJob: HTMLElement;
  recommencedJobs: Job[] = [];


  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router,
    private jobService: JobService,
    private route: ActivatedRoute,
    private authService: AuthService,
    public share: ShareService,
    private cdRef: ChangeDetectorRef,
    private meta: Meta ) {}

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.isLoading = true;

    this.route.paramMap.pipe(
      switchMap(route =>
         this.jobService.getDetailJob(route.get('id'))
      )
    ).subscribe(data => {
      this.job =  data;
      this.company = <Company> data['company'];
      this.isLoading = false;

      this.company.logoURL && (this.logoCompany = this.enviromentObj.apiEndpoint + this.company.logoURL);
      this.company.coverURL && (this.coverCompany = this.enviromentObj.apiEndpoint + this.company.coverURL);

      this.meta.updateTag({ name: 'title', content: this.job.title });
      this.meta.updateTag({ name: 'description', content: this.job.description });
      this.meta.updateTag({ name: 'image', content: this.enviromentObj.appUrl + this.coverCompany });
      this.meta.addTag({ name: 'url', content: this.enviromentObj.appUrl + this.router.url });

      var url = this.meta.getTag('name=url');
      var title = this.meta.getTag('name=title');
      var description = this.meta.getTag('name=description');
      var image = this.meta.getTag('name=image');

      this.getRecommendedJob(this.jobId);

    }, (error: AppErrors) => this.handleErrorJobDetailComponent(error));

    this.user = this.authService.getCurrentUser();
    this.isStudentRole = (this.user && this.user.role) === Role.Student;
    this.isCompanyRole = (this.user && this.user.role) === Role.Company;
  }

  redirectToLogin() {
    this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
  }

  applyJob(isApplied, btnApplyJobElement: HTMLElement) {
    if (isApplied) {
      return false;
    }

    //Change style for btn
    btnApplyJobElement.className = 'label job-type pointer isApplied';
    btnApplyJobElement.innerText = this.renderTextForBtnApplyJob(!isApplied);

    this.btnApplyJob = btnApplyJobElement;

    this.jobService
      .applyJobForStudent(this.jobId)
      .subscribe(
        data => {
          this.toastr.success('Applied Job Success', 'Apply Job');
        },
        (error: AppErrors) => this.handleErrorJobDetailComponent(error)
      );
  }

  handleErrorJobDetailComponent(error: AppErrors) {
    if (error instanceof InternalServer) {
    }
    else if (error instanceof Unauthorized) {
    }
    else if (error instanceof Forbidden) {
    }
    else if (error instanceof Duplicate) {
      this.btnApplyJob.className = 'label job-type pointer apply-job';
      this.btnApplyJob.innerText = this.renderTextForBtnApplyJob(false);
      this.toastr.error(error.originalError, 'Apply Job');
    }
    else if (error instanceof NotFound) {
      this.isLoading = false;
      this.router.navigate(['not-found']);
    }
    else {
      throw error;
    }
  }

  renderTextForBtnApplyJob(isApplied): string {
    if (isApplied) return 'Job Is Applied';
    return 'Apply Job';
  }

  initRecommendJob() {
    let isCarouselExist = $('.owl-wrapper').data('owlCarousel');

    if (isCarouselExist) {
      $('.owl-wrapper').data('owlCarousel').destroy();
    }
      $('.owl-wrapper').owlCarousel({
        navigation: false, // Show next and prev buttons
        items: 4,
        loop:true,
        margin:10,
        autoPlay:false,
        autoPlayTimeout:1000,
        autoPlayHoverPause:true,
      });

    this.fixBugAutoRecreateNestedOwlCarousel();
  }

  getRecommendedJob(jobId: string) {
    this.jobService.getRecommenedJob(jobId).pipe(take(1))
      .subscribe((data: any) => {
        this.recommencedJobs = data.list as Job[];

        this.cdRef.detectChanges();
        this.initRecommendJob();
      }, this.handleErrorJobDetailComponent);
  }

  fixBugAutoRecreateNestedOwlCarousel() {
    $('.owl-item .owl-wrapper-outer').remove();
  }
}
