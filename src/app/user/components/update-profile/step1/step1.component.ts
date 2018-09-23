import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'update-profile-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class UpdateProfileStep1Component implements OnInit {
  public uploader: FileUploader;

  jobsLevel = [
    { id: 1, name: 'Sinh Viên năm 3' },
    { id: 2, name: 'Sinh Viên năm 4' },
    { id: 3, name: 'Sinh Viên năm cuối' },
    { id: 4, name: 'Đã ra trường' }
  ]

  constructor() {
    this.uploader = new FileUploader({
      url: '',
      disableMultipart: false,
      autoUpload: true
    });

    this.uploader.response.subscribe(res => {
      console.log(res)
      // this.url = 'http://localhost:9090/get/' + JSON.parse(res).id;
      // this.urlChange.emit(this.url);
    });
  }

  ngOnInit() {
  }
  public fileOver(e: any): void {
    console.log(e)
  }
}
