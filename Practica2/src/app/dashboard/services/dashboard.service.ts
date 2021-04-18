import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/shared/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _user: User = {} as User;

  constructor(
    private http: HttpClient
  ) { }

  setWeight(username: string, weight: string): Observable<boolean | undefined> {
    const body = {username, weight};
    return this.http.post(`https://tve-app-g22.herokuapp.com/logic/user/weight`, body)
      .pipe(
        map( (res: any) => {
          this._user = res;
          localStorage.setItem('weight', this._user.weight! );
          return true
        }),
        catchError( error => of(false))
      );
  }

}
