import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {baseLogic} from '../shared/URL';
@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  private url_api: string = baseLogic;
  constructor(private http: HttpClient){ 
  }
  ///url_api+rep/1/proyecto1/:username
  public getReporte1(username: any): Observable<any>{
    return this.http.get(`${this.url_api}rep/1/proyecto1/${username}`);
  }

  public getReporte4(username: any): Observable<any>{
    return this.http.get(`${this.url_api}rep/4/proyecto1/${username}`);
  }
}
