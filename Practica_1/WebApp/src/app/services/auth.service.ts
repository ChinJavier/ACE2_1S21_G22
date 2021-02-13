import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/URL';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

    logUser(user:User): Observable<any> {
      return this.http.post<any>(baseURL + 'auth/',  user);
    }

    createUser(user: User): Observable<any> {
      return this.http.post<any>(baseURL + 'auth/new', user);
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
