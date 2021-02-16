import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL_sensores } from '../shared/URL';
import { baseURL } from '../shared/URL';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // TODO: getUser()

  // TODO: getUserByCoach()

  // TODO: getUserStats()
  
  constructor(private http: HttpClient) { }


}
