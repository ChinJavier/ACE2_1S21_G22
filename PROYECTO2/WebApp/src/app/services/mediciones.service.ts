import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL_sensores } from '../shared/URL';
import {server} from '../shared/URL';

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



  /*

  public getMediciones(typeMedition: string , id: string | null): Observable<any>{
    return this.http.get(`${this.backCreate}all/${typeMedition}/${id}`);
  }

  public saveMedicion(objeto_body: any ,ruta: string): Observable<any>{ // FUNCION GENERICA
    return this.http.post(`${this.backCreate}${ruta}` , objeto_body);
  }

  */

}
