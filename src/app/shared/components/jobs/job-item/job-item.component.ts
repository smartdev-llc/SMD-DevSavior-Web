import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
  providers: [ AuthService ]
})
export class JobItemComponent implements OnInit {
  @Input() job: any;
  loading = true;
  data: any = [];

  constructor(private authService:AuthService){ 
  }

  ngOnInit() {
    this.loading = true;
    this.getJobItem();
  }

  getJobItem(){
    this.authService.getJobItem()
    .subscribe(
      data => {
        this.loading = false;
        console.log(data)
        this.data = data;
      },
      error => {
        this.loading = false;
        console.log(error)
      }
    )
  }
}
