import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../core/services/job.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { LanguageService } from '../../../layout/services/language.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  jobId: string;
  candidates: any[];
  isLoading: boolean;
  jobs: any[];
  currentPage: number;


  constructor(private jobService: JobService, 
              private router: ActivatedRoute, 
              private languageService: LanguageService) { 

  }

  ngOnInit() {
    this.jobId = this.router.snapshot.paramMap.get('jobId');
    if(this.jobId) {
      this.loadCandidateForJob();
    } else {
      this.isLoading = false;
    }
  }

  loadCandidateForJob() {
    this.isLoading = true;
    this.jobService.getCandidateForJob(this.jobId)
                    .subscribe(
                      data => {
                        this.candidates = data.list;
                        this.currentPage = data.page;
                        this.isLoading = false;
                      },
                      error => {
                        this.isLoading = false;
                      }
                    );
  }


  doSomething() {
    console.log("job")
  }


  selectAll() {
    
  }

}
