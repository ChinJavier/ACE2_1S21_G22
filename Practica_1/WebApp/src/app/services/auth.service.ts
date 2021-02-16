import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, pipe } from 'rxjs';
import { baseURL } from '../shared/URL';
import { Router } from '@angular/router';
import { HttpErrorHanldingService } from './http-error-hanlding.service';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandling: HttpErrorHanldingService,
  ) { }

    logUser(user:User): Observable<any> {
      return this.http.post<any>(baseURL + 'auth/',  user)
      .pipe(catchError(this.errorHandling.handleError));
    }

    createUser(user: User): Observable<any> {
      return this.http.post<any>(baseURL + 'auth/new', user)
        .pipe(catchError(this.errorHandling.handleError));
    }

    revalidateToken() {

    } 

    isLogged(): Boolean {
      return localStorage.getItem('x-token') ? true : false;
    }

    getToken() {
      return localStorage.getItem('x-token');
    }

    logout() {
      localStorage.removeItem('x-token');
      this.router.navigate(['/']);
    }

}
