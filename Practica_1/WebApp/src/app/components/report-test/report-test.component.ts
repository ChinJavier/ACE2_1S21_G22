import { Component, OnInit } from '@angular/core';
import { MedicionesService } from 'src/app/services/mediciones.service';
import Swal from 'sweetalert2'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import {ConsultasService} from '../../services/consultas.service'
import { groupBy } from 'rxjs/operators';

@Component({
  selector: 'app-report-test',
  templateUrl:'./report-test.component.html',
  styleUrls: ['./report-test.component.css']
})
export class ReportTestComponent implements OnInit {

  showRep1: any = [];
  showRep1_1: any = [];
  showRep3: any = [];
  showRep2: any = [];
  
  showRep4: any = [];
  showRep5: any = [];

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


  constructor(private medicionesService: MedicionesService , private repService: ConsultasService) {

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
            if (valores[i].rhythm != 0){
              this.ritmoDataAux.push(valores[i].rhythm);
              this.fecha_ritmoDataAux.push(valores[i]);
            }

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
            if (velocities[i].velocity > 0){
              this.velocityDataAux.push(velocities[i].velocity);
            }
            this.fecha_velocityDataAux.push(velocities[i]);
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
        this.fecha_distanceDataAux = [];
      //  console.log('VALUES',values);
        if(values.length > 0 || values.length !== undefined) {
          for(let i = 0; i < values.length; i++) {
            if (values[i].distance > 0 ){
              this.distanceDataAux.push(values[i].distance);
              this.fecha_distanceDataAux.push(values[i]);
            }
          }
        }
        this.distanceLabels = this.distanceDataAux;
        this.distanceData = this.distanceDataAux;
       // console.log('ARR2', this.velocityData);
       // this.getTotalDistance()
      });
  }

  getMeditionFallos(){
    this.getReporte4();
    let aux:any = [];
    aux.push(this.showRep4.length);
    this.failsData = aux;
    this.failsLabels = aux;
  }





  getMeditionsRepetition(){
    let username=localStorage.getItem('username');
    this.medicionesService.getMediciones('Repetition',username)
      .subscribe( (res: any)  => {

        let values  = res.repeticiones;
       // console.log('VALUES',values);
        this.repeticionesDataAux = [];
        this.fecha_repeticionesDataAux = [];
        if(values.length > 0 || values.length !== undefined) {
          for(let i = 0; i < values.length; i++) {
            if (Math.round(values[i].repetition) != 0   &&  Math.round(values[i].repetition) < 23){
              if(!(this.esRepetido(Math.round(values[i].repetition)))){
                this.repeticionesDataAux.push(Math.round(values[i].repetition));
              }
              this.fecha_repeticionesDataAux.push(values[i]);
            }
          }
        }
        this.repetitionLabels = this.repeticionesDataAux;
        this.repetitionData = this.repeticionesDataAux;
      });
  }

  public esRepetido( valor :any ){
    for(let i = 0; i < this.repeticionesDataAux.length; i++) {
      if (this.repeticionesDataAux[i] == valor ){
      return true ;
      }
    }
    return false;
  }
  

  // constructor cuanado esta todo montado
ngOnInit(): void {
  


  this.getMeditionsVelocity();
  this.getMeditionsDistance();
  this.getMeditionsRepetition();
  this.getMedicionesRitmoC();
  this.getMeditionFallos();

  this.hilo1 = setInterval(() =>{this.getMeditionsVelocity();},1500);
  this.hilo2 = setInterval(() =>{this.getMeditionsDistance();},2000);
  this.hilo3 = setInterval(() =>{this.getMedicionesRitmoC();},1500);
  this.hilo4 = setInterval(() =>{this.getMeditionsRepetition();},1500);
  this.hilo5 = setInterval(() =>{this.getMeditionFallos();},3000);

  this.getRep2();
  this.getReporte4();
  this.getRep1();
  this.getRep5();

  this.getRep3();
 
}


public getRep1(): any{
  this.repService.getReporte1(localStorage.getItem('username')).subscribe(res => { 
    this.showRep1 = res;
    for(let x = 0 ; x < this.showRep1.length; x++){

      if(this.isNewWeek(this.showRep1[x].semana)){
        this.showRep1_1.push(
          {
            semana: this.showRep1[x].semana  ,
            min: this.showRep1[x].cantidadRepeticiones ,
            max: this.showRep1[x].cantidadRepeticiones ,
            promedio: this.showRep1[x].cantidadRepeticiones ,
            allRepeticiones: [this.showRep1[x].cantidadRepeticiones]
          });
      }else{
        // miremos si tiene la menor repeticion  o si tiene la mayor
        this.insertToWeek( this.showRep1[x].semana ,  this.showRep1[x].cantidadRepeticiones );
      }
    }
    this.completeRep1();
  } , err => console.log("error reporte1"));
}

public completeRep1():any{

  for(let yy = 0 ; yy < this.showRep1_1.length; yy++){
    let promedio = this.calcularPromedio(this.showRep1_1[yy].allRepeticiones);
    let max = this.getMaximo(this.showRep1_1[yy].allRepeticiones);
    let min = this.getMinimo(this.showRep1_1[yy].allRepeticiones);
    this.showRep1_1[yy].promedio = promedio;
    this.showRep1_1[yy].max = max;
    this.showRep1_1[yy].min = min;
  }
}

public isNewWeek( semana_ : any): Boolean{
  // objeto esperado  { semana , repeticionMin , repeticionMax ,  { arreglo de repeticiones} }
  for(let x = 0 ; x < this.showRep1_1.length; x++){
    if(this.showRep1_1[x].semana == semana_){
      return false;
    }
  }
  return true
}

public insertToWeek(semana_:any , repeticion : any): any{
  for(let x = 0 ; x < this.showRep1_1.length; x++){
    if(this.showRep1_1[x].semana == semana_){
      this.showRep1_1[x].allRepeticiones.push(repeticion);
    }
  }
}


calcularPromedio(arreglo: any){
  let suma= 0;
  for(let i = 0 ; i < arreglo.length; i++){
    suma += arreglo[i];
  }
  if (arreglo.length == 0){
    alert('por el momento no tienes registros');
    return -777
  }
  return suma/arreglo.length;
}

public getMinimo(arreglo: any):any{
  let min= 1000*9999;
  for(let i = 0 ; i < arreglo.length; i++){
  if( Number(arreglo[i]) < min){
    min = arreglo[i];
  }
  }
  if (arreglo.length == 0){
    console.log('por el momento no tienes registros');
    min = 0 ;
  }
  return min;
}

public getMaximo(arreglo: any): any{
  let max= -500;
  for(let i = 0 ; i < arreglo.length; i++){
   if( arreglo[i] > max ){
    max = arreglo[i];
   }
  }
  if (arreglo.length == 0){
    console.log('por el momento no tienes registros');
    max = 0 ;
  }
  return max;
}

public getReporte4(): any{
  this.repService.getReporte4(localStorage.getItem('username')).subscribe(res=>{this.showRep4 = res;} , err => console.log("error rep4"));
}

public getRep5(){
  this.repService.getReporteGenerico(localStorage.getItem('username') , "5").subscribe(res =>{
    this.showRep5 = res;
  }, 
  err=>{ console.log("err rep 5")
  });
}

public getRep3(){
  this.repService.getReporteGenerico(localStorage.getItem('username') , "3").subscribe(res =>{
    let data = res;
   
    // UserDistances.distance
    // UserRepetitions.repetition
    // solo al cambio guardar la ultima :v
    let anteriorDistancia  = 0,anteriorRep = 0;
    let fechaAnt ="";
    if (data.length > 1){
      for(let u_u = 0 ; u_u < data.length; u_u++){
          let actDist = data[u_u].UserDistances.distance;
          let actRep = Math.round(data[u_u].UserRepetitions.repetition);
          let fechaAct = data[u_u].UserRepetitions.fecha;
          if(actRep != anteriorRep && anteriorDistancia != 0 && anteriorRep != 0 && anteriorDistancia > 11 && anteriorDistancia < 23 ){// aun no ha cambiado
              this.showRep3.push({fecha: fechaAnt,repeticion: anteriorRep , distancia: anteriorDistancia});
          }

          if(data[u_u+1]!= undefined){
            anteriorRep = actRep;
            anteriorDistancia = actDist;
            fechaAnt = fechaAct;
          }
      }
     // console.log(this.showRep3);
    }
     // inserto la ultima fijo
     if (data.length != 0){
      this.showRep3.push({repeticion: Math.round(data[data.length-1].UserRepetitions.repetition) , distancia: data[data.length-1].UserDistances.distance , fecha:data[data.length-1].UserDistances.fecha});
     }
    
  },
  err=>{ console.log("err rep 3")
  });
}



public getRep2(){
  this.repService.getReporteGenerico(localStorage.getItem('username') , "2").subscribe(res =>{
    let data = res;
    let anteriorvelocity  = 0,anteriorRep = 0;

    if (data.length > 1){
      for(let u_u = 0 ; u_u < data.length; u_u++){
          let actVel = data[u_u].UserVelocities.velocity;
          let actRep = Math.round(data[u_u].UserRepetitions.repetition);

          if(actRep != anteriorRep && anteriorvelocity != 0 && anteriorRep != 0 ){// aun no ha cambiado
            // aca hay un new test
            // objeto esperado  { repeticion  , promedio , min ,  max ,  { arreglo de allvelocities }
            this.showRep2.push(
              {
                repeticion: anteriorRep  ,
                min: anteriorvelocity ,
                max: anteriorvelocity ,
                promedio: anteriorvelocity ,
                allvelocities: [anteriorvelocity]
              });
          }else{
            // insertar en el test
            this.insertToTest(actVel,actRep);
          }

          if(data[u_u+1]!= undefined){
            anteriorRep = actRep;
            anteriorvelocity = actVel;
          }
      }
      
    }
     // inserto la ultima fijo
     if (data.length != 0){

      this.insertToTest(Math.round(data[data.length-1].UserRepetitions.repetition) , data[data.length-1].UserVelocities.velocity);
     }else if(data.length == 1){
      this.showRep2.push(
        {
          repeticion: Math.round(data[data.length-1].UserRepetitions.repetition)  ,
          min: data[data.length-1].UserVelocities.velocity ,
          max: data[data.length-1].UserVelocities.velocity ,
          promedio: data[data.length-1].UserVelocities.velocity ,
          allvelocities: [data[data.length-1].UserVelocities.velocity]
        });
     }

     this.completeRep2();
     console.log(this.showRep2);

  },
  err=>{ console.log("err rep 2")
  });
}

public completeRep2(){
  for(let yy = 0 ; yy < this.showRep2.length; yy++){
    this.showRep2[yy].promedio = this.calcularPromedio(this.showRep2[yy].allvelocities);
    this.showRep2[yy].max = this.getMaximo(this.showRep2[yy].allvelocities);
    this.showRep2[yy].min = this.getMinimo(this.showRep2[yy].allvelocities);
  }
}


public insertToTest(velocidad:any , repeticion : any): any{
  // objeto esperado  { repeticion  , promedio , min ,  max ,  { arreglo de allvelocities }
  for(let x = 0 ; x < this.showRep2 .length; x++){
    if(this.showRep2[x].repeticion == repeticion){
      this.showRep2[x].allvelocities.push(velocidad);
    }
  }
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
