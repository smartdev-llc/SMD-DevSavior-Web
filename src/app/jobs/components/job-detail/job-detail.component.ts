import {environment} from '../../../../environments/environment';

import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {JobService} from '../../../core/services/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '@ngx-share/core';
import {switchMap, take} from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import {faGooglePlusG} from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import {faPinterest} from '@fortawesome/free-brands-svg-icons/faPinterest';

import {Role, User} from '../../../core/models/user';
import {AuthService} from '../../../core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppErrors} from '../../../core/error/app-errors';
import {Forbidden} from '../../../core/error/forbidden';
import {InternalServer} from '../../../core/error/internal-server';
import {Unauthorized} from '../../../core/error/unauthorized';
import {Duplicate} from '../../../core/error/duplicate';
import {Company} from '../../../core/models/company';
import {NotFound} from '../../../core/error/not-found';
import {Job} from '../../../core/models/job';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from '../../../core/services/profile.service';
import { SeoService } from '../../../shared/services/seo.service';

declare  var $: any;

@Component({
  selector: 'job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})

export class JobDetailComponent implements OnInit {

  @ViewChild('applyJobModal') applyJobModal: ModalDirective;
  @ViewChild('remindUpdateModal') remindUpdateModal: ModalDirective;
  job: any;
  user: User;
  jobId: string;
  jobSlug: string;
  isStudentRole: boolean;
  isCompanyRole: boolean;
  isLoading: boolean;
  company: Company;
  listSkills: any;
  enviromentObj = environment;
  coverCompany = '/assets/images/headerimage1.jpg';
  logoCompany = 'assets/images/widget1image.png';
  fbIcon = faFacebookSquare;
  pinIcon = faPinterest;
  linkedInIcon = faLinkedinIn;
  googlePlusIcon = faGooglePlusG;
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
    private translate: TranslateService,
    private seo: SeoService ) {}

  ngOnInit() {
    this.jobSlug = this.route.snapshot.paramMap.get('slug');
    this.isLoading = true;

    this.route.paramMap.pipe(
      switchMap((route) => {
          this.jobSlug = route.get('slug');
          return this.jobService.getDetailJob(this.jobSlug);
        }
      )
    ).subscribe(data => {
      this.job = data;
      this.company = <Company>data['company'];
      this.isLoading = false;
      this.getRecommendedJob(this.jobSlug);

      const imageCompany = this.company.logoURL ? this.enviromentObj.apiEndpoint + this.company.logoURL : './assets/images/headerimage1.jpg';
      const jobDescription = this.removeHtmlTags(this.job.description);
      // update meta tags for Seo
      this.seo.generateTags({
        title: this.job.title,
        description: jobDescription,
        image: imageCompany,
        slug: this.router.url
      });
    }, (error: AppErrors) => this.handleErrorJobDetailComponent(error));

    this.user = this.authService.getCurrentUser();
    this.isStudentRole = (this.user && this.user.role) === Role.Student;
    this.isCompanyRole = (this.user && this.user.role) === Role.Company;
  }

  redirectToLogin() {
    $('#myModal').modal('hide');
    this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
  }

  checkBeforeApplyJob() {
    if (this.job.isApplied) {
      return false;
    }
    this.authService.checkUpdateProfile()
      .subscribe(
        data => {
          if (data) {
            this.remindUpdateModal.show();
          } else {
            this.applyJobModal.show();
          }
        }
      )
  }

  navigateToUpdateProfile() {
    this.remindUpdateModal.hide();
    this.router.navigate(['/my-career-center/update-profile/step1'], {queryParams: {returnUrl: this.router.url}});
  }

  applyJob() {
    this.jobService
      .applyJobForStudent(this.job.id)
      .subscribe(
        data => {
          this.job.isApplied = true;
          this.applyJobModal.hide();
          this.toastr.success(
            this.translate.instant('notification.applyJobSuccess'),
            this.translate.instant('notification.applyJob'));
        },
        (error: AppErrors) => {
          this.job.isApplied = false;
          this.toastr.error(error.originalError, this.translate.instant('notification.applyJob'));
        }
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
    }
    else if (error instanceof NotFound) {
      this.isLoading = false;
      this.router.navigate(['not-found']);
    }
    else {
      throw error;
    }
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

  getRecommendedJob(jobSlug: string) {
    this.jobService.getRecommenedJob(jobSlug).pipe(take(1))
      .subscribe((data: any) => {
        this.recommencedJobs = data.list as Job[];

        this.cdRef.detectChanges();
        this.initRecommendJob();
      }, this.handleErrorJobDetailComponent);
  }

  fixBugAutoRecreateNestedOwlCarousel() {
    $('.owl-item .owl-wrapper-outer').remove();
  }

  getCompanyWebsite() {
    if(this.company.website && this.company.website.indexOf('http') != 0) {
      return 'http://' + this.company.website;
    }

    return this.company.website;
  }

  private removeHtmlTags(text: string) {
    const regex = /(<([^>]+)>)/ig;
    const result = text.replace(regex, '');
    return result.trim();
  }
}
