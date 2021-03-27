import { Component, OnInit } from '@angular/core';
import { MedicionesService } from 'src/app/services/mediciones.service';
import Swal from 'sweetalert2'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

import { Chart } from 'chart.js';
@Component({
  selector: 'app-report-test',
  templateUrl:'./report-test.component.html',
  styleUrls: ['./report-test.component.css']
})
export class ReportTestComponent implements OnInit {
  ok: boolean = false;
  medicionesOxigeno=[];
  medicionesTemperatura=[];
  medicionesRitmo:any=[];
  meditionsVelocity:any=[];
  meditionsDistance:any=[];
  lista:string[]=["120","98","88","56","102","76","11","estas","tal","estas"];
  promedioVelocity:any=0;
  maxVelocity:any=0;
  minVelocity:any=0;
  TotalDistance:any=0;
  RepetitionsCount:any=0;
  RealVelocity:any=0;
  RealRythm:any=0;
  RealDistance:any=0;

  velocityDataAux: any = [];
  failsDataAux: any = [];
  repetitionDataAux: any = [];
  distanceDataAux: any = [];


   // PARA LA GRAFICA DE RITMO
   private hilo: any = null;
   public chart_ritmo: any = null;
   public ritmoActual = 0;
   //--------------------- fin


  constructor(private medicionesService: MedicionesService) {

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
    let username=localStorage.getItem('username');
    this.medicionesService.getVelocityByUser(username || '')
      .subscribe( (res: any)  => {

        const {velocities} = res;
        this.velocityDataAux = [];
        if(velocities.length > 0 || velocities.length !== undefined) {
          for(let i = 0; i < velocities.length; i++) {
            this.velocityDataAux.push(velocities[i].velocity);
            this.velocityDataAux.push(234 + i)

          }
        }
        this.velocityLabels = this.velocityDataAux;
        this.velocityData = this.velocityDataAux;

      });
  }
  getMeditionsDistance(){
    let username=localStorage.getItem('username');
    this.medicionesService.getDistanceByUser(username || '')
      .subscribe( (res: any)  => {

        const {values} = res;
        this.distanceDataAux = [];
        console.log('VALUES',values);
        if(values.length > 0 || values.length !== undefined) {
          for(let i = 0; i < values.length; i++) {
            this.distanceDataAux.push(values[i].distance);
            this.distanceDataAux.push(234 + i)

          }
        }
        this.distanceLabels = this.distanceDataAux;
        this.distanceData = this.distanceDataAux;

        console.log('ARR2', this.velocityData);

      });
  }




  AVGVelocity(){
    let suma=0;
    for(let i = 0 ; i < this.meditionsVelocity.length; i++){
      suma += this.meditionsVelocity[i].valor;
    }
    if (this.meditionsVelocity.length == 0){
      Swal.fire('Error', 'El usuario no tiene mediciones.', 'error')
      return
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

  getTotalDistance(){
    let totalDistance=0;
    for(let i=0; i<this.meditionsDistance.length; i++){
      totalDistance += this.meditionsDistance[i].valor;
    }
    if(this.meditionsDistance.length==0){
      Swal.fire('Error', 'No hay medidas de distancia!', 'error')
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

  //this.getMedicionesRitmoC();
  this.getMeditionsVelocity();
  this.getMeditionsDistance();
  //this.getRealRythm();
  this.getRepetition();
  this.getRealVelocity();
  this.getRealDistance();

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
      //console.log('error' , err);
    });
  }

/********** Gráfica de velocidad *************/

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public velocityLabels: Label[] = [];
  public velocityChartType: ChartType = 'bar';
  public velocityChartLegend = true;

  public velocityData: MultiDataSet = [];



  /* **************************************** */

/********** Gráfica de repeticiones *************/


  public repetitionLabels: Label[] = [];
  public repetitionChartType: ChartType = 'bar';
  public repetitionChartLegend = true;

  public repetitionData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];


  /* **************************************** */

/********** Gráfica de Distancia *************/


  public distanceLabels: Label[] = [];
  public distanceLegend = true;

  public distanceData: MultiDataSet = [];


  /* **************************************** */
/********** Gráfica de ritmo *************/


  public rythmLabels: Label[] = [];
  public rythmLegend = true;

  public rythmData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 30], label: 'Series A' },
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series B' },
    { data: [95, 59, 80, 55, 56, 55, 10], label: 'Series C' },
    { data: [65, 90, 11, 44, 33, 55, 50], label: 'Series D' },
  ];


  /* **************************************** */

/********** Gráfica de Fallos *************/


  public failsLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public failsLegend = true;

  public failsData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [10, 59, 33, 81, 56, 2, 40], label: 'Series B' },
    { data: [95, 59, 80, 55, 56, 55, 40], label: 'Series C' },
  ];


  /* **************************************** */

}
