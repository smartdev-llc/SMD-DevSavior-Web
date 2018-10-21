import {Component, OnInit} from '@angular/core';
import {JobService} from '../../../core/services/job.service';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {Authenticate, Role, User} from '../../../core/models/user';
import {AuthService} from '../../../core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppErrors} from '../../../core/error/app-errors';
import {Forbidden} from '../../../core/error/forbidden';
import {InternalServer} from '../../../core/error/internal-server';
import {Unauthorized} from '../../../core/error/unauthorized';
import {Duplicate} from '../../../core/error/duplicate';


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

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private jobService: JobService,
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    console.log('[QueryParam]', this.router.url);
    this.jobService.getDetailJob(this.jobId).subscribe(data => {
      this.job = data;
    });


    this.user = this.authService.getCurrentUser();
    this.isStudentRole = (this.user && this.user.role) === Role.Student;
    this.isCompanyRole = (this.user && this.user.role) === Role.Company;

    console.log('role', this.isStudentRole);
  }

  redirectToLogin() {
    this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
  }

  applyJob() {
    this.jobService
      .applyJobForStudent(this.jobId)
      .subscribe(
        data => {
          this.toastr.success('Applied Job Success', 'Apply Job');
          console.log('[JobDetailComponent][applyJob()]');
        },
        (error: AppErrors) => this.handleErrorJobDetailComponent(error)
      );
  }

  handleErrorJobDetailComponent(error: AppErrors) {
    console.log('[JobDetailComponent][handleErrorJobDetailComponent()]');
    if (error instanceof InternalServer) {
      console.log('Internal server', error.originalError);
    }
    else if (error instanceof Unauthorized) {
      console.log('Unauthorized ', error.originalError);
    }
    else if (error instanceof Forbidden) {
      console.log('Forbidden ', error.originalError);
    }
    else if (error instanceof Duplicate) {
      console.log('Duplicate ', error.originalError);
      this.toastr.error (error.originalError, 'Apply Job');
    }
    else {
      console.log('app error', error);
      throw error;
    }
  }

}
