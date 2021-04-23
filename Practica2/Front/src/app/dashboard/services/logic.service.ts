import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor(private http: HttpClient) { }

  getRealtime():Observable<any>{
    return this.http.get(environment.BASE_URL+'logic/getRelatime');
  }
  setPrimaryValue():Observable<any>{
    let cero = 0 ;
    return this.http.post(environment.BASE_URL+'logic/mobile/0/p',0);
  }

  saveMeditions( medicion: any): Observable<any>{
    return this.http.post(environment.BASE_URL+'logic/saveMedition' , medicion)
  }
  getAllTest( username: any): Observable<any>{
    return this.http.get(environment.BASE_URL+'logic/getAllTest/'+username)
  }
}
