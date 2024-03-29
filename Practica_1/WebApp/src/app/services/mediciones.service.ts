import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL_sensores, baseURL } from '../shared/URL';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {
  private backend: string = "";
  constructor(private http: HttpClient) {
    this.backend = baseURL_sensores;// redundante :v
  }
  // PETICION GET DESDE ANGULAR
  public getTemperatura(): Observable<any>{
      return this.http.get(`${this.backend}temperature`);
  }

  public getOxygen(): Observable<any>{
    return this.http.get(`${this.backend}oxygen`); //sensores/  + 'oxygen'
  }

  public getrhythm(): Observable<any>{
    return this.http.get(`${this.backend}rhythm`)
  }

  // JALA LOS DATOS GUARDADOS EN MONGO
  public getMediciones(typeMedition: string , username: string | null): Observable<any>{
    return this.http.get(`${baseURL}meditions/all/${typeMedition}/${username}`);
  }

  public saveMedicion(objeto_body: any ,ruta: string): Observable<any>{ // FUNCION GENERICA
    return this.http.post(`${baseURL}${ruta}` , objeto_body);
  }


  // MEDICIONES PROYECTO 1
  getVelocityByUser( username: string ){
    return this.http.get( `${ baseURL }meditions/all/velocity/${username} ` )
      .pipe(
        catchError(res => of(false))
      );
  }
  getDistanceByUser( username: string ){
    return this.http.get( `${ baseURL }meditions/all/distance/${username} ` )
      .pipe(
        catchError(res => of(false))
      );
  }

  getRhythmByUser( username: string ){
    return this.http.get( `${ baseURL }meditions/all/rhythm/${username}`)
      .pipe(
        catchError(res => of(false))
      );
  }

  getRepetitionByUser( username: string ){
    return this.http.get( `${ baseURL }meditions/all/repetition/${username}`)
      .pipe(
        catchError(res => of(false))
      );
  }




 

}
