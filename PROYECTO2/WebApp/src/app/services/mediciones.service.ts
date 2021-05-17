import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL_sensores } from '../shared/URL';
import {server} from '../shared/URL';
import { DatosTimepoReal, Medition } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {
  private backend: string = ""; // backend para sensores
  
  constructor(private http: HttpClient) {
    this.backend = baseURL_sensores;
  }


  // PETICION GET DESDE ANGULAR
  // public getTemperatura(): Observable<any>{
  //     return this.http.get(`${this.backend}temperature`);
  // }

  // public getOxygen(): Observable<any>{
  //   return this.http.get(`${this.backend}oxygen`); //sensores/  + 'oxygen'
  // }

  // public getrhythm(): Observable<any>{
  //   return this.http.get(`${this.backend}rhythm`);
  // }

  public saveMedicion(objeto_body: Medition): Observable<any>{ // FUNCION GENERICA
   //     http://localhost:3000/logic/saveMedition
    return this.http.post(`${server}/logic/saveMedition` , objeto_body);
  }

  public getHistorialMediciones(idMongo: string | null): Observable<Medition[]>{// general
    // http://localhost:3000/logic/allMeditions/id_mongo
    return this.http.get<Medition[]>(`${server}/logic/allMeditions/${idMongo}`);
  }
  public getTest(idMongo: string | null , numTest: any): Observable<Medition[]>{// general
     //http://localhost:3000/logic/getTest/60a18e76592d010b1ce59025/1
    return this.http.get<Medition[]>(`${server}/logic/getTest/${idMongo}/${numTest}`);
  }



  public getNumUltimeTest(idMongo: string |null){
    // http://localhost:3000/logic/getNumTest/id_mongo
    return this.http.get<any>(`${server}/logic/getNumTest/${idMongo}`);// res.num +1
  }

  public getMedicionesTiempoReal(){
     //  http://localhost:3000/sensores/datos
    return this.http.get<DatosTimepoReal>(`${this.backend}datos`);
  }



}
