import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Company, UpdateCompanyProfileRequest } from '../../core/models/company';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient, 
              private authService: AuthService  ) { }

  getprofile(): Observable<Company> {
    const id = this.authService.getCurrentUser().id;
    return this.http.get<Company>("/companies/" + id);
  }

  updateProfile(company: UpdateCompanyProfileRequest): Observable<any> {
    return this.http.put("/my-company/info", company);
  }

  updatePhoto(photo: any) {

  }
}
