import { Component, OnInit } from '@angular/core';
import { MedicionesService } from 'src/app/services/mediciones.service';
import { Chart } from 'chart.js';
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
   // PARA LA GRAFICA DE RITMO
   private hilo: any = null;
   public chart_ritmo: any = null;
   public ritmoActual = 0;
   //--------------------- fin


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


  // constructor cuanado esta todo montado
ngOnInit(): void {
  //------------------------------------------- GRAFICA DE RITMO
  this.chart_ritmo = new Chart('realtime', {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
        label: 'ritmo cardiaco vs tiempo',
        fill: false,
        data: [7,7],
        backgroundColor: '#168ede',
        borderColor: '#FF0C00'
        }
      ]
      },
      options: {
      tooltips: {
        enabled: false
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: 'black'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "black",
            suggestedMin: 70,
            suggestedMax: 200
          }
        }],
        xAxes: [{
        ticks: {
          fontColor: "black",
          beginAtZero: true
        }
        }]
      }
      }
  });
  this.showGraphic();
  this.hilo = setInterval(() =>{this.showGraphic();},1000);
  //----------------------------------------- FIN DE LA GRAFICA DE RITMO


}
//Called once, before the instance is destroyed.
ngOnDestroy(): void {
  clearInterval(this.hilo);// deja de llamar a las peticiones
}

private showGraphic(): void {
  this.medicionesService.getrhythm().subscribe(res => {
    let chart_ritmoTime: any = new Date();
    // PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
    chart_ritmoTime = chart_ritmoTime.getHours() + ':' + ((chart_ritmoTime.getMinutes() < 10) ? '0' + chart_ritmoTime.getMinutes() : chart_ritmoTime.getMinutes()) + ':' + ((chart_ritmoTime.getSeconds() < 10) ? '0' + chart_ritmoTime.getSeconds() : chart_ritmoTime.getSeconds());
    if(this.chart_ritmo.data.labels.length > 15) {
        this.chart_ritmo.data.labels.shift();
        this.chart_ritmo.data.datasets[0].data.shift();
    }
    this.chart_ritmo.data.labels.push(chart_ritmoTime);
    this.chart_ritmo.data.datasets[0].data.push(res); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
    this.chart_ritmo.update();
    this.ritmoActual = res;
  } , err => {
    console.log('error' , err);
  });
}

}
