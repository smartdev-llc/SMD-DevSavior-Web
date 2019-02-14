import { Component,
         OnInit,
         ViewChild,
         ElementRef,
         Output,
         Input,
         EventEmitter } from '@angular/core';
import { Image } from '../../../core/models/image';
import { FileUploader, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment.prod';
import { AuthService } from '../../../core/services/auth.service';
import { PhotoURLConverterPipe } from '../../../core/pipes/photo-urlconverter.pipe';
import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-upload-logo-company',
  templateUrl: './upload-logo-company.component.html',
  styleUrls: ['./upload-logo-company.component.css']
})
export class UploadLogoCompanyComponent implements OnInit {
  UNITS = ['byte', 'KB', 'MB', 'TB'];
  UPLOADING_ERROR = 'Error while uploading images';
  WRONG_FORMAT_OR_SIZE_ERROR = '';
  private photoURLConverter: PhotoURLConverterPipe;
  @Input()
  croppedImage: string;
  @Input()
  uploadURL: string;
  @Input()
  maxSizeInByte: number;
  maxSizeInString: string;
  @Input()
  fileType: string[];
  @ViewChild("inputFile")
  inputFile: ElementRef;
  public photo: Image;
  public previewImage: any;
  public showConfirmation = false;
  public isLoading = false;
  public hasError = false;
  public errorMessage: string;
  public fileUploader: FileUploader;
  
  imageChangedEvent: any = '';
  // croppedImage: any = '';
  constructor(private authService: AuthService,
              private translate: TranslateService,
              private toastrService: ToastrService) { 
    this.photoURLConverter = new PhotoURLConverterPipe();
  }

  ngOnInit() {
    this.fileUploader = new FileUploader({
      url: this.fixUrl(this.uploadURL),
      disableMultipart: false,
      autoUpload: false,
      method: 'PUT',
      authToken: this.authService.getAccessToken()
    })
    this.convertToLargerUnit(this.maxSizeInByte);
    this.fileUploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.fileUploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  ngAfterViewInit() {
    this.fileUploader.onAfterAddingFile = (item => {
       item.withCredentials = false;
    });
 }
  

  triggerEventInputFile() {
    this.inputFile.nativeElement.click();
  }

  checkImagePreview(event: any) {
      if (event.target.files && event.target.files[0]) {
        this.hasError = false;
        if(this.isValidFileTypeAndSize(event.target.files[0])) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = e => this.previewImage = reader.result;
          reader.readAsDataURL(file);
        } else {
          this.showError(
            this.translate.instant('notification.wrongImageSize') 
            + this.fileType.toString() 
            + this.translate.instant('notification.endLessThan') 
            + this.maxSizeInString);
        }
      }
  }

  convertToLargerUnit(size: number) {
    let unitIndex = 0;
    while(size >=1024 && Math.floor(size /= 1024) > 0) {
      unitIndex++;
    }
    this.maxSizeInString = size + ' ' + this.UNITS[unitIndex];
  }

  isValidFileTypeAndSize(file: any): boolean {
    let size = file.size;
    let type = file.type.substring(file.type.lastIndexOf('/') + 1);
    return size <= this.maxSizeInByte && this.fileType.findIndex(item => item.toUpperCase() === type.toUpperCase()) >= 0;
  }
  
  get image() {
    if (this.previewImage) {
      return this.previewImage;
    } else if (this.croppedImage) {
      return this.croppedImage;
    } else {
      return null;
    }
  }

  uploadFile() {
    if (this.fileUploader.queue.length > 0 && !this.isLoading && !this.hasError) {
      this.startLoading();
      this.fileUploader.queue[0].upload();
    }
  }

  onSuccessItem(item: FileItem, response: any, status: number, headers: ParsedResponseHeaders): any  {
    this.stopLoading();
    this.previewImage = null;
    this.croppedImage = JSON.parse(response).photoUrl;
    this.toastrService.success(
      this.translate.instant('notification.uploadImage'), 
      this.translate.instant('notification.uploadImageSuccess'));
  }

  onErrorItem(item: FileItem, response: any, status: number, headers: ParsedResponseHeaders): any  {
    this.stopLoading();
    this.showError(this.UPLOADING_ERROR);
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }

  resetError() {
    this.hasError = false;
  }

  showError(message: string) {
    this.hasError = true;
    this.errorMessage = message;
  }

  setErrorFlag() {
    this.hasError = true;
  }

  private fixUrl(url: string) {
    if (url && url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
      return url;
    } else {
      return environment.apiEndpoint + url;
    }
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.previewImage = true;
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  }
}
