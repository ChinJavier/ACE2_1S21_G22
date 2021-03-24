import { Component, OnInit } from '@angular/core';
import { MedicionesService } from 'src/app/services/mediciones.service';

@Component({
  selector: 'app-report-test',
  templateUrl:'./report-test.component.html',
  styleUrls: ['./report-test.component.css']
})
export class ReportTestComponent implements OnInit {
  medicionesOxigeno=[];
  medicionesTemperatura=[];
  medicionesRitmo:any=[];
  meditionsVelocity:any=[];
  meditionsDistance:any=[];
  lista:string[]=["hola","que","tal","estas"];
  promedioVelocity:any=0;
  maxVelocity:any=0;
  minVelocity:any=0;
  TotalDistance:any=0;
  RepetitionsCount:any=0;
  RealVelocity:any=0;
  RealRythm:any=0;
  RealDistance:any=0;
  constructor(private medicionesService: MedicionesService) { 
    this.getMedicionesRitmoC();
    this.getMeditionsVelocity();
    this.getMeditionsDistance();
    this.getRepetition();
    this.getRealVelocity();
    this.getRealRythm();
    this.getRealDistance();
  }

  getMedicionesRitmoC(){
    let user=localStorage.getItem('uid');
    this.medicionesService.getMediciones('rhythm',user).subscribe(res=>{
      for( let i=0; i<res.length; i++){
        const objectRythm={
          valor : res[i].valor
        };
        this.medicionesRitmo.push(objectRythm);
      }
    }, err =>{
      console.log("Error en getMedicionesRitmoC")
    })
  }
  getMeditionsVelocity(){
    let user=localStorage.getItem('username');
    this.medicionesService.getMediciones('velocity',user).subscribe(res=>{
      for (let i = 0 ; i < res.length; i++){
        const objetoVelocity = {
          valor: res[i].valor,
          fecha: res[i].fecha
        };
        this.meditionsVelocity.push(objetoVelocity);
      }
      this.promedioVelocity = this.AVGVelocity();
      if (this.promedioVelocity!=0){
        this.getVelocityMax();
        this.getVelocityMin();
      }
    }, err =>{
      console.log("Error en getMeditionsVelocity")
    })
  }
  AVGVelocity(){
    let suma=0;
    for(let i = 0 ; i < this.meditionsVelocity.length; i++){
      suma += this.meditionsVelocity[i].valor;
    }
    if (this.meditionsVelocity.length == 0){
      alert('por el momento no tienes registros');
      return 0
    }
    return suma/this.meditionsVelocity.length;
  }
  getVelocityMax(){
    let max =-1;
    for(let i=0; i<this.meditionsVelocity.length; i++){
      if (this.meditionsVelocity[i].valor > max){
        max = this.meditionsVelocity[i].valor;
      }
    }
    this.maxVelocity=max;
  }
  getVelocityMin(){
    let min=99999;
    for(let i=0; i<this.meditionsVelocity.length; i++){
      if (this.meditionsVelocity[i].valor < min){
        min = this.meditionsVelocity[i].valor;
      }
    }
    this.minVelocity=min;
  }
  
  getMeditionsDistance(){
    let user = localStorage.getItem('username');
    this.medicionesService.getMediciones('Distance', user).subscribe(res =>{
      this.getMeditionsDistance = res;
      for(let i=0; i< res.length; i++){
        const objectDistance={
          valor: res[i].valor

        };
        this.meditionsDistance.push(objectDistance);
      }
      this.TotalDistance = this.getTotalDistance();
      
    }, err =>{
      console.log("Error en getMeditionsDistance")
    })
  }
  getTotalDistance(){
    let totalDistance=0;
    for(let i=0; i<this.meditionsDistance.length; i++){
      totalDistance += this.meditionsDistance[i].valor;
    }
    if(this.meditionsDistance.length==0){
      alert('Por el momento no hay registros');
      return 0
    }
    return totalDistance;
  }
  
  getRepetition(){
    let user=localStorage.getItem('username');
    this.medicionesService.getMediciones('Repetition',user).subscribe(res=>{
      this.RepetitionsCount =res;
    }
    , err =>{
      console.log("Error en getRepetition")
    })
  }
  getRealVelocity(){
    let user=localStorage.getItem('username');
    this.medicionesService.getMediciones('Repetition',user).subscribe(res=>{
      this.RealVelocity =res;
    }
    , err =>{
      console.log("Error en getRealVelocity")
    })
  }
  getRealRythm(){
    let user=localStorage.getItem('username');
    this.medicionesService.getMediciones('Ryhtm',user).subscribe(res=>{
      this.RealRythm =res;
    }, err =>{
      console.log("Error en getRealRythm")
    })
  }
  getRealDistance(){
    let user=localStorage.getItem('username');
    this.medicionesService.getMediciones('Distance',user).subscribe(res=>{
      this.RealDistance =res;
    }, err =>{
      console.log("Error en getRealDistance")
    })
  }
  ngOnInit(): void {
  }

}
