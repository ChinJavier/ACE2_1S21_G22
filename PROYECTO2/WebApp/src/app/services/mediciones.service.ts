import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL_sensores } from '../shared/URL';
import {server} from '../shared/URL';
import { Medition } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {
  private backend: string = "";
  constructor(private http: HttpClient) {
    this.backend = baseURL_sensores;
  }


  // PETICION GET DESDE ANGULAR
  public getTemperatura(): Observable<any>{
      return this.http.get(`${this.backend}temperature`);
  }

  public getOxygen(): Observable<any>{
    return this.http.get(`${this.backend}oxygen`); //sensores/  + 'oxygen'
  }

  public getrhythm(): Observable<any>{
    return this.http.get(`${this.backend}rhythm`);
  }

  public saveMedicion(objeto_body: Medition): Observable<any>{ // FUNCION GENERICA
   //     http://localhost:3000/logic/saveMedition
    return this.http.post(`${this.backend}/logic/saveMedition` , objeto_body);
  }

  public getHistorialMediciones(idMongo: string | null): Observable<Medition[]>{
    // http://localhost:3000/logic/allMeditions/id_mongo
    return this.http.get<Medition[]>(`${this.backend}/logic/allMeditions/${idMongo}`);
  }

  public getNumUltimeTest(idMongo: string){
    // http://localhost:3000/logic/getNumTest/id_mongo
    return this.http.get(`${this.backend}/logic/getNumTest/${idMongo}`);// res.num +1
  }

}
