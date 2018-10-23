import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../../core/models/company';
import { ToastrService } from 'ngx-toastr';
import { City } from '../../../core/models/city.enum';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  public COVER_UPLOADING_URL = "/my-company/cover";
  public LOGO_UPLOADING_URL = "/my-company/logo";
  private PHONE_NUMBER_PATTERN = '^[0-9\+]{1,}[0-9\-]{3,15}$';

  public isEdit= false;
  public isLoading = true;
  public company: Company;
  public submitted = false;
  public updateProfileForm: FormGroup;
  public cities = [{key: 'DN', value: City.DN},
  {key: 'HCM', value: City.HMC},
  {key: 'HN', value: City.HN},
  {key: 'OTHER', value: City.OTHER}];

  constructor(private profileService: ProfileService, 
              private formBuilder: FormBuilder, 
              private toastr: ToastrService) {
    this.company = new Company();
    this.initUpdateProfileForm();
  }

  ngOnInit() {
    this.getProfile();
  }

  initUpdateProfileForm() {
    this.updateProfileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.PHONE_NUMBER_PATTERN)]],
      website: [''],
      description: ['', [Validators.required]]
    });
  }

  getProfile() {
    this.profileService.getprofile()
                      .subscribe(company => {
                        this.company = company;
                        this.isLoading = false;
                        this.updateDataIntoForm(this.company);
                      });
  }

  changeToEditMode() {
    this.isEdit = !this.isEdit;
    this.updateDataIntoForm(this.company);
  }

  updateDataIntoForm(company: Company) {
    this.updateProfileForm.setValue({
      name: company.name,
      address: company.address,
      city: company.city,
      phoneNumber: company.phoneNumber,
      contactName: company.contactName,
      website: company.website,
      description: company.description,
    });
  }
  

    updateProfile() {
      this.isLoading = true;
      this.submitted = true;
      if(this.updateProfileForm.invalid) {
        console.log(this.updateProfileForm.errors)
        this.isLoading = false;
        return;
      }

      this.profileService.updateProfile(this.updateProfileForm.value)
                          .subscribe(
                            data => {
                                this.isLoading = false;
                                this.isEdit = false;
                                this.toastr.success('You\'ve just updated your company profile successfully', 'Update profile');
                                this.company = data;
                            },
                            error => {
                                  throw error;
                            }
                          )
    }

  uploadLogo(event: Event) {
    event.stopPropagation();
  }

  uploadCover() {

  }

  get f() {
    return this.updateProfileForm.controls;
  }

  get coverUploadURL() {
    return this.COVER_UPLOADING_URL;
  }

  get logoUploadURL() {
    return this.LOGO_UPLOADING_URL;
  }

  getCityName(cityCode) {
    try {
      return City[cityCode];
    } catch {
      return cityCode;
    }
    
  }



}
