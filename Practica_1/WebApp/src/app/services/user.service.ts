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

  public asignar(_idUserMongo: any , coachNew:any ):Observable<any>{
    let cuerpo = {coach: coachNew };
    console.log();
    return this.http.put(`${this.url_api}${_idUserMongo}`, cuerpo);
  }

}
