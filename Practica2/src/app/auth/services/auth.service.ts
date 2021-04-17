import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/shared/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseURL: string = environment.API_URL;

  private _user: User = {} as User;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  login( username: string, password: string ): Observable<Boolean | void>   {

    const body = { username, password };

    return this.http.post<User>(`${this._baseURL}auth`, body)
      .pipe(
        map( res => {
          this._user = res;
          localStorage.setItem('id', this._user.uid!);
          localStorage.setItem('username', this._user.username);
          return true;
        }),
        catchError(error => of(false))
      );

  }

  signup( username: string, password: string): Observable<Boolean | void > {

    const body = { username, password };

    return this.http.post<User>(`${this._baseURL}auth/new`, body)
    .pipe(
      map( res => {
        this._user = res;
        localStorage.setItem('id', this._user.uid!);
        localStorage.setItem('username', this._user.username);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login'])
  }


}
