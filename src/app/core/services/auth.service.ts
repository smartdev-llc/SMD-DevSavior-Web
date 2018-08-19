import { User } from "../models/user";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient,
         HttpRequest,
         HttpHeaders, 
         HttpEvent} from "@angular/common/http";
@Injectable()
export class AuthService {
 constructor(
   private http: HttpClient,
   private router: Router
  ){}

  register(data: User): Observable<User> {
    return this.http.post<User>('/auth/signup',
                                data);
  }

  getTokenHeader(request: HttpRequest<any>): HttpHeaders{
      return null;
  }
}
