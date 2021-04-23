import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts/ng2-charts';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Chart } from 'chart.js';
import { LogicService } from '../../services/logic.service';
import { Test } from '../../../models/Test';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	private hilo: any = null;
  private hiloTimer:any = null;
	public char_grafica: any = null;
  vxData: any = [];
  vxDataAux: any = [];
  time: Date = new Date();
  username: string | null = '';

  weight: any;

  // Timer

  minutes: any = '00';
  seconds: any = '00';

  pauseTime: boolean = false;
//-------------------------------------------------------
//---------------------------------------- arreglo de mediciones
  mediciones: any[]=[];// del 1 al 5
  nMedicion = 0;

//---------------------------------------- ACUMULADORES
  exhalacion: any = 0 ;
  inhalacion: any = 0 ;

  volumenTotalInhalado: any = 0; 
  volumenTotalExhalado: any = 0;

//----------------------------------------

  banderaTest = false;
  testActual = 0;
  listaTest:Test[] =[];
//----------------------------------------

  volEMin: any =999;
  volEMax: any = -999;
  volIMin: any = 999;
  volIMax: any = -999;
  promE: any =0;
  promI: any =0;
  vo2: any=0;


  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService, private logicservice: LogicService
  ) {
    this.username = localStorage.getItem('username');
  }

  limpiarVariables():void{
    this.vo2 = 0;
    this.inhalacion = 0;
    this.exhalacion = 0;
    this.volumenTotalInhalado = 0;
    this.volumenTotalExhalado = 0;
    // no necesarias :v
    this.mediciones = [];
    this.nMedicion = 0;

    this.volEMin =  999;
    this.volEMax = -999;
    this.volIMin =  999;
    this.volIMax = -999;
    this.promE=0;
    this.promI=0;
    
  }

  mostrarTest():void{
    console.log(this.testActual);
    for(let i = 0 ; i <this.listaTest.length; i++){
      if(this.testActual == this.listaTest[i].test){
        this.volEMin =  this.listaTest[i].volEmin;
        this.volEMax = this.listaTest[i].volEmax;
        this.volIMin =  this.listaTest[i].volImin;
        this.volIMax =  this.listaTest[i].volImax;
        this.promE= this.listaTest[i].promE;
        this.promI= this.listaTest[i].promI;
        this.weight = this.listaTest[i].peso;
        this.vo2 = this.listaTest[i].vo2;
        break;
      }
    }
  }
  saveMeditions(objeto: any): void{
    this.logicservice.saveMeditions(objeto).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  ngOnInit(): void {
    this.logicservice.getAllTest(localStorage.getItem('username')).subscribe(
      res =>{
        this.listaTest = res;
      },
      err=> console.log(err));

    this.logicservice.setPrimaryValue().subscribe(res =>console.log(res),err=>{console.log(err)});


    this.char_grafica = new Chart('realtime', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'Medicion de Aire en Tiempo Reals',
					fill: false,
					data: [],
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
						  suggestedMin: -20,
						  suggestedMax: 30
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
  }

  takeTime() {

    this.hiloTimer = setInterval(() => {
      if(!this.pauseTime){
        let second = Number(this.seconds);
        let minute = Number(this.minutes);
        second += 1;
        if(second > 59) {
          second = 0;
          (this.seconds) = '00';
          minute += 1;
          // MINUTO INCREMENTA ENTONCES ACA GUARDO UN DATO EN LA BASE DE DATOS
          console.log("MEDICION "+ (this.nMedicion+1))
          console.log(`Exhalado ${this.exhalacion}`);
          console.log(`Inhalado ${this.inhalacion}`);
          this.volumenTotalInhalado += this.inhalacion;
          this.volumenTotalExhalado += this.exhalacion;

          this.mediciones[this.nMedicion] = {exhalado: this.exhalacion , inhalado: this.inhalacion}
          this.nMedicion++;

          this.inhalacion = 0;
          this.exhalacion = 0;

          if (minute == 5){// MINUTO 5
            this.banderaTest = false;
            this.clearGraph();
            this.calcularReportes();
            this.minutes = '00';
            this.seconds = '00';
            clearInterval(this.hiloTimer);
            Swal.fire('Test Terminado!!');
            return;
          }
        }
        if(second < 10) {

          this.seconds = `0${String(second)}`
        } else {
          this.seconds = String(second);
        }
        this.minutes = `0${String(minute)}`
      }
    }, 1000)

  }

  pause() {
    this.pauseTime = !this.pauseTime;
  }

  reset() {
    this.pauseTime = true;

  }

  getCurrentDate() {
    setInterval(() => {
      this.time = new Date();
    }, 1000)// CADA SEGUNDO
  }


  ngOnDestroy(): void {
		clearInterval(this.hilo);
	}

  calcularReportes(): void{
      console.log(this.mediciones);
      this.promE = (this.volumenTotalExhalado/5)*-1;
      this.promI = this.volumenTotalInhalado/5;

      // calculo del VO2
      /*
      Se partirá de la idea que en 1 litro de aire tiene 21% de oxígeno por lo que hay 210
      ml de oxígeno en 1 litro de aire.

      - sumar los volúmenes de aire que el atleta inhala 5min
      - tomando en cuenta lo anterior respecto al
        porcentaje de oxígeno en el aire se podrá obtener la cantidad de oxígeno consumido
        durante la sesión de 5 minutos.

      - Teniendo el dato anterior solo basta con dividir el dato dentro de 5 para obtener la
        medida por minuto

      - luego dividir dicho dato dentro del peso en kilogramos del atleta
        para así obtener la medición del VO2 MAX.
      */

      // 1 litro tiene  210ml de oxigeno
      // this.volumenTotalInhalado la suma 
      let oxigeno = (this.volumenTotalInhalado/1000)*210;
      let datoEnMinutos = oxigeno/5;
      if(this.weight >0){
        this.vo2 =datoEnMinutos/this.weight;
      }
    console.log("Promedio Ex : " , this.promE ," promedio I: " , this.promI ," VO2:", this.vo2)
    this.getNewtest();// da el inidice
    let newTest = {test: this.testActual , username: localStorage.getItem('username'), promE: this.promE , promI: this.promI , vo2: this.vo2 , peso: this.weight ,volEmin: this.volEMin ,volEmax: this.volEMax, volImin: this.volIMin ,volImax: this.volIMax };
    this.listaTest.push(newTest);
    this.saveMeditions(newTest)
  }

  getNewtest():void{
    if (this.listaTest.length == 0){
      this.testActual = 1 ;
    }else{
      let ultimoTest = this.listaTest[this.listaTest.length-1];
      this.testActual = Number(ultimoTest.test) + 1;
    }
  }

  start() {
    this.takeTime();
    console.log(this.weight);
    this.banderaTest = true;
    this.limpiarVariables();

  }

  logout() {
    this.authService.logout();
  }

  
  private showGraphic(): void {
    if (this.banderaTest){
      this.logicservice.getRealtime().subscribe(res => {
        //console.log(res);
        if(res[1] == 'p'){// P de positivo es INHALADO
          this.inhalacion+= Number(res[0]);
          if(this.volIMin >  Number(res[0]) ){
            this.volIMin =  Number(res[0]);
          }
          if(this.volIMax <  Number(res[0])){
            this.volIMax =  Number(res[0]);
          }

        }else{
          res[0] = Number(res[0])*-1
          this.exhalacion  += res[0];//parseado a positivo :v

          if(this.volEMin >  Number(res[0]*-1) ){
            this.volEMin =  Number(res[0]*-1);
          }
          if(this.volEMax <  Number(res[0]*-1)){
            this.volEMax =  Number(res[0]*-1);
          }
        }
        
  
  
  
        let char_graficaTime: any = new Date();
        // PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
        char_graficaTime = ((char_graficaTime.getMinutes() < 10) ? '0' + char_graficaTime.getMinutes() : char_graficaTime.getMinutes()) + ':' + ((char_graficaTime.getSeconds() < 10) ? '0' + char_graficaTime.getSeconds() : char_graficaTime.getSeconds());
       
       
        if(this.char_grafica.data.labels.length > (30) ) {
            this.char_grafica.data.labels.shift();
            this.char_grafica.data.datasets[0].data.shift();
        } // NO HAY SHIFT
        this.char_grafica.data.labels.push(char_graficaTime);
        this.char_grafica.data.datasets[0].data.push(res[0]);
        this.char_grafica.update();
      } , err => {
        console.log('error' , err);
      });
    }
	}

  private clearGraph(): void{

    this.char_grafica = new Chart('realtime', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'Medicion de Aire en Tiempo Reals',
					fill: false,
					data: [],
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
						  suggestedMin: -20,
						  suggestedMax: 20
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
  }
}
