import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL_sensores, baseURL } from '../shared/URL';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {
  private backend: string = "";
  constructor(private http: HttpClient) {
    this.backend = baseURL_sensores;// redundante :v
  }
   // metodos que hacen peticiones al servidor de node

   // PETICION POST DESDE ANGULAR
  // public crearAlgo(obj: any): Observable<any>{
  //   return this.http.post(`${this.backend}`, obj);
  // }

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

  // JALA LOS DATOS GUARDADOS EN MONGO
  public getMediciones(typeMedition: string , username: string | null): Observable<any>{
    return this.http.get(`${baseURL}meditions/all/${typeMedition}/${username}`);
  }

  public saveMedicion(objeto_body: any ,ruta: string): Observable<any>{ // FUNCION GENERICA
    return this.http.post(`${baseURL}${ruta}` , objeto_body);
  }

}
