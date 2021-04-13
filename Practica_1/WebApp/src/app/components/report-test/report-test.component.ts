import { Component, OnInit } from '@angular/core';
import { MedicionesService } from 'src/app/services/mediciones.service';
import Swal from 'sweetalert2'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';


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
  avgVelocity:any=0;
  maxVelocity:any=0;
  minVelocity:any=0;
  totalDistance:any=0;
  RepetitionsCount:any=0;
  RealVelocity:any=0;
  RealRythm:any=0;
  RealDistance:any=0;

  //---------------------------- DATA AUXS 
  velocityDataAux: any = [];
  failsDataAux: any = [];
  repetitionDataAux: any = [];
  distanceDataAux: any = [];
  repeticionesDataAux: any = [];
  fallosDataAux: any = [];
  ritmoDataAux: any = [];

   // PARA LA GRAFICA DE VELOCIDAD
   private hilo1: any = null;
   private hilo2: any = null;
   private hilo3: any = null;
   private hilo4: any = null;
   private hilo5: any = null;


  //---------------------------- DATA AUXS 2
   //---------------------------- DATA AUXS 
   fecha_velocityDataAux: any = [];      //OK       
   fecha_distanceDataAux: any = [];      //OK
   fecha_repeticionesDataAux: any = [];  //OK
   fecha_ritmoDataAux: any = [];         //OK
   fecha_failsDataAux: any = [];  
   fecha_fallosDataAux: any = [];


  constructor(private medicionesService: MedicionesService) {

  }

  getMedicionesRitmoC(){
    let username=localStorage.getItem('username');
    this.medicionesService.getRhythmByUser(username || '')
      .subscribe( (res: any)  => {
        const valores = res.registrosRitmo;
        this.ritmoDataAux = [];
        this.fecha_ritmoDataAux = [];
        if(valores.length > 0 || valores.length !== undefined) {
          for(let i = 0; i < valores.length; i++) {
            this.ritmoDataAux.push(valores[i].rhythm);
            this.fecha_ritmoDataAux.push(valores[i]);
          }
        }
        this.rythmLabels = this.ritmoDataAux;
        this.rythmData = this.ritmoDataAux;
      });
  }

  getMeditionsVelocity(){
    let username=localStorage.getItem('username');
    this.medicionesService.getVelocityByUser(username || '')
      .subscribe( (res: any)  => {

        const {velocities} = res;
        this.velocityDataAux = [];
        this.fecha_velocityDataAux = [];
        if(velocities.length > 0 || velocities.length !== undefined) {
          for(let i = 0; i < velocities.length; i++) {
            this.velocityDataAux.push(velocities[i].velocity);
            this.fecha_velocityDataAux.push(velocities[i]);
          }
        }
        this.velocityLabels = this.velocityDataAux;
        this.velocityData = this.velocityDataAux;
        this.AVGVelocity();
        this.getVelocityMax();
      });



  }
  getMeditionsDistance(){
    let username=localStorage.getItem('username');
    this.medicionesService.getDistanceByUser(username || '')
      .subscribe( (res: any)  => {

        const {values} = res;
        this.distanceDataAux = [];
        this.fecha_distanceDataAux = [];
        console.log('VALUES',values);
        if(values.length > 0 || values.length !== undefined) {
          for(let i = 0; i < values.length; i++) {
            this.distanceDataAux.push(values[i].distance);
            this.fecha_distanceDataAux.push(values[i]);
          }
        }
        this.distanceLabels = this.distanceDataAux;
        this.distanceData = this.distanceDataAux;
        console.log('ARR2', this.velocityData);
       // this.getTotalDistance()
      });
  }




  AVGVelocity(){
    let suma=0;
    console.log('data1', this.velocityData);
    for(let i = 0 ; i < 1000; i++){
      suma += Number(this.velocityData[i]);
    }
    console.log('SUMA', suma);
    console.log('fd',this.meditionsVelocity);
    if (this.velocityData.length == 0){
      Swal.fire('Error', 'El usuario no tiene mediciones.', 'error')
      return
    }
    this.avgVelocity = suma/1000;
    console.log('AVG VELOCITY:', this.avgVelocity);
  }
  getVelocityMax(){
    let max =-1;
    for(let i=0; i<1000; i++){
      if (Number(this.velocityData[i]) > max){
        max = Number(this.velocityData[i]);
      }
    }
    console.log('MAX:', max);
    this.maxVelocity=max;
  }
  getVelocityMin(){
    let min=99999;
    for(let i=0; i<1000; i++){
      if (Number(this.velocityData[i]) < min){
        min = Number(this.velocityData[i]);
      }
    }
    this.minVelocity=min;
  }

  getTotalDistance(){
    let totalDistance=0;
    for(let i=0; i<this.distanceData.length; i++){
      totalDistance += Number(this.distanceData[i]);
    }
    if(this.distanceData.length==0){
      Swal.fire('Error', 'No hay medidas de distancia!', 'error')
      return 0
    }
    this.totalDistance = totalDistance;
    return;
  }



  getMeditionsRepetition(){
    let username=localStorage.getItem('username');
    this.medicionesService.getMediciones('Repetition',username)
      .subscribe( (res: any)  => {

        let values  = res.repeticiones;
        console.log('VALUES',values);
        this.repeticionesDataAux = [];
        this.fecha_repeticionesDataAux = [];
        if(values.length > 0 || values.length !== undefined) {
          for(let i = 0; i < values.length; i++) {
            this.repeticionesDataAux.push(values[i].repetition);
            this.fecha_repeticionesDataAux.push(values[i]);
          }
        }
        this.repetitionLabels = this.repeticionesDataAux;
        this.repetitionData = this.repeticionesDataAux;
      });
  }


  // constructor cuanado esta todo montado
ngOnInit(): void {

  this.getMeditionsVelocity();
  this.getMeditionsDistance();
  this.getMeditionsRepetition();
  this.getMedicionesRitmoC();

  this.hilo1 = setInterval(() =>{this.getMeditionsVelocity();},1000);
  this.hilo2 = setInterval(() =>{this.getMeditionsDistance();},1000);
  this.hilo3 = setInterval(() =>{this.getMedicionesRitmoC();},1000);
  this.hilo4 = setInterval(() =>{this.getMeditionsRepetition();},1000);

  /*this.hilo5 = setInterval(() =>{this.getMeditionsVelocity();},1000);*/
}
//Called once, before the instance is destroyed.
  ngOnDestroy(): void {
    clearInterval(this.hilo1);// deja de llamar a las peticiones
    clearInterval(this.hilo2);
    clearInterval(this.hilo3);
    clearInterval(this.hilo4);
    clearInterval(this.hilo5);
  }

/********** Gráfica de velocidad *************/
  public barChartOptions: ChartOptions = {responsive: true,};
  public velocityLabels: Label[] = [];
  public velocityChartType: ChartType = 'bar';
  public velocityChartLegend = true;
  public velocityData: MultiDataSet = [];
  /* **************************************** */

/********** Gráfica de repeticiones *************/
  public repetitionLabels: Label[] = [];
  public repetitionChartType: ChartType = 'bar';
  public repetitionChartLegend = true;
  public repetitionData:  MultiDataSet= [];
  /* **************************************** */

/********** Gráfica de Distancia *************/
  public distanceLabels: Label[] = [];
  public distanceLegend = true;
  public distanceData: MultiDataSet = [];

  /* **************************************** */
/********** Gráfica de ritmo *************/
  public rythmLabels: Label[] = [];
  public rythmLegend = true;
  public rythmData: MultiDataSet= [];
 /* **************************************** */
/********** Gráfica de Fallos *************/
  public failsLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public failsLegend = true;
  public failsData:  MultiDataSet= [];
  /* **************************************** */

}
