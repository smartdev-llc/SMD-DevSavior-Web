import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
  providers: [ AuthService ]
})
export class JobItemComponent implements OnInit {
  loading = true;

  constructor(private authService:AuthService){ 
  }

  ngOnInit() {
    this.loading = true;
  }

  getJobItem(){
    this.authService.getJobItem()
    .subscribe(
      (response) => {
        this.loading = false;
        console.log(response)
      },
      error => {
        this.loading = false;
        console.log(error)
      }
    )
  }

  // getJobItem(){
  //   this.authService.getJobItem()
  //   .subscribe(
  //     response => console.log(response),
  //     error => console.log(error)
  //   )
  // }

}
