import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url_api: string = "http://localhost:3000/logic/";
  constructor(private http: HttpClient) {}

  public getInfoUser(username: string | null):Observable<any>{
    return this.http.get(`${this.url_api}${username}`);
  }

  public getUsersAvailable():Observable<any>{
    return this.http.get(`${this.url_api}search/getUsersAvailable`);
  }

  public getMyUsers(username:any):Observable<any>{
    return this.http.get(`${this.url_api}search/getMyUsers/${username}`);
  }

}
