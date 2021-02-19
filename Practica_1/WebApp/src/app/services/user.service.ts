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

}
