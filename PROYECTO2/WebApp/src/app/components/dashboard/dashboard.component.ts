import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { MedicionesService } from './../../services/mediciones.service';
import Swal from 'sweetalert2';
import { Medition, Valor } from 'src/app/interfaces/interfaces';
import { numbers } from '@material/banner';



@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	NUMERO_DE_TEST_REPORTE = 0 ;
	OPCIONES_NUM_TESTS:any = [];

	MEDICION_TEST_ACTUAL: Medition = { id_user: "", test: 0, valores: [] };
	minutes: any = '00';
	seconds: any = '00';
	
	pauseTime: boolean = false;


	// Estado
	estados = [
		"/assets/parado.png",
		"/assets/caminando.png",
		"/assets/corriendo.png"
	]
	imagen = ""
	username: string | null = '';
	uid: string | null = '';
	time = new Date();
	history: any = [];
	hours = new Date().getHours();
	msg: string = "";

	hiloTimer: any;
	private hilo_save: any;
	private hilo_datos_tiempo_real: any;

	// --------------------------------------------------------  GRAFICA DE TEMPERATURA
	public hilo_temperatura: any = null;
	public char_grafica_temperatura: any = null;
	public valorActual_temperatura: any = 0;

	//-------------------------------------------------------- GRAFICA RITMO
	private hilo_ritmo: any = null;
	public chart_ritmo: any = null;
	public ritmoActual: any = 0;

	//------------------------------------------------------- GRAFICA OXIGENO
	public hilo_oxigeno: any = null;
	public char_grafica_oxigeno: any = null;
	public valorActualOxigeno: any = 0;

	//------------------------------------------------------ GRAFICA DE REPORTES
	// --- REP TEMPERATURA
	public rep_grafica_temperatura: any = null;
	public rep_grafica_oxigeno: any = null;
	public rep_grafica_ritmo: any = null;

	// --------------- HISTORIALES
	public rep_temperaturas:any = [];
	public estadisticas_temp = {promedio: 0 ,max: 0 , min:0}
	public estadisticas_ritmo =  {promedio: 0 ,max: 0 , min:0}
	public estadisticas_oxigeno=  {promedio: 0 ,max: 0 , min:0}

	public rep_ritmos:any = [];
	public rep_oxigenos:any = [];
	constructor(private service: MedicionesService,) { }

	ngOnInit(): void {
		this.username = localStorage.getItem('username');
		this.uid = localStorage.getItem('uid');

		this.getDate();
		if (this.uid != null) {
			this.MEDICION_TEST_ACTUAL.id_user = this.uid;

			this.service.getNumUltimeTest(this.uid).subscribe(res => {

				this.MEDICION_TEST_ACTUAL.test = Number(res.num) + 1;
				console.log("TEST: " + this.MEDICION_TEST_ACTUAL.test);
				for(let x = 0 ; x < res.num ; x++){
					this.OPCIONES_NUM_TESTS.push(x);
				}
			}, err => console.log("ERROR ULTIMO TEST"));
		}
		this.imagen = this.estados[0];

		this.char_grafica_temperatura = new Chart('realtime', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
					{
						label: 'temperatura vs tiempo',
						fill: false,
						data: [],
						backgroundColor: 'orange',
						borderColor: 'red'
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
							suggestedMin: 0,
							suggestedMax: 40
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

		this.showGraphic_temperatura();

		this.hilo_temperatura = setInterval(() => { this.showGraphic_temperatura(); }, 1100);


		this.chart_ritmo = new Chart('realtime3', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
					{
						label: 'ritmo cardiaco vs tiempo',
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

		this.showGraphic_ritmo();

		this.hilo_ritmo = setInterval(() => { this.showGraphic_ritmo(); }, 1100);


		this.char_grafica_oxigeno = new Chart('realtime2', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
					{
						label: 'Oxigeno vs tiempo',
						fill: false,
						data: [],
						backgroundColor: 'blue',
						borderColor: 'blue'
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
					align: 'center',
					labels: {
						fontColor: 'black'
					}
				},
				scales: {
					yAxes: [{

						stacked: true,
						ticks: {
							fontColor: "black",
							suggestedMin: 40,
							suggestedMax: 110
						}
					}],
					xAxes: [{

						stacked: true,
						ticks: {
							fontColor: "black",
							beginAtZero: true
						}
					}]
				}
			}
		});

		this.showGraphic_Oxigeno();



		this.rep_grafica_temperatura = new Chart('realtime4', {
			type: 'bar',
			data: {
				labels: [],
				datasets: [
					{
						label: 'temperatura vs fecha/hora',
						fill: false,
						data: [],
						backgroundColor: 'skyblue',
						borderColor: 'skyblue'
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
					align: 'center',
					labels: {
						fontColor: 'black'
					}
				},
				scales: {
					yAxes: [{

						stacked: true,
						ticks: {
							fontColor: "black",
							suggestedMin: 0,
							suggestedMax: 40
						}
					}],
					xAxes: [{

						stacked: true,
						ticks: {
							fontColor: "black",
							beginAtZero: true

						}
					}]
				}
			}
		});

		this.rep_grafica_oxigeno = new Chart('realtime5', {
			type: 'bar',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'oxigeno vs fecha/hora',
					fill: false,
					data: [],
					backgroundColor: 'yellow',
					borderColor: 'yellow'
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
					align:'center',
					labels: {
						fontColor: 'black'
					}
				},
				scales: {
				  yAxes: [{
					  
					  stacked: true,
					  ticks: {
						  fontColor: "black",
							suggestedMin: 0,
							suggestedMax: 120
					  }
				  }],
				  xAxes: [{

					stacked: true,
					ticks: {
						fontColor: "black",
						beginAtZero: true
            
					}
				  }]
				}
			  }
		});

		this.rep_grafica_ritmo = new Chart('realtime6', {
			type: 'bar',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'ritmo vs fecha/hora',
					fill: false,
					data: [],
					backgroundColor: 'green',
					borderColor: 'green'
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
					align:'center',
					labels: {
						fontColor: 'black'
					}
				},
				scales: {
				  yAxes: [{
					  
					  stacked: true,
					  ticks: {
						  fontColor: "black",
							suggestedMin: 0,
							suggestedMax: 250
					  }
				  }],
				  xAxes: [{

					stacked: true,
					ticks: {
						fontColor: "black",
						beginAtZero: true
            
					}
				  }]
				}
			  }
		});

		this.hilo_oxigeno = setInterval(() => { this.showGraphic_Oxigeno(); }, 1100);
		this.hilo_save = setInterval(() => { this.saveMedition() }, 5000);
		this.hilo_datos_tiempo_real = setInterval(() => { this.getDatosTiempoReal() }, 1000);
	}

	public getDatosTiempoReal() {
		this.service.getMedicionesTiempoReal().subscribe(
			res => {
				if (Number(res.temperature) > 0 && Number(res.temperature) < 41) {
					this.valorActual_temperatura = Number(res.temperature);
				}
				if (Number(res.rhythm) > 0 && Number(res.rhythm) < 201) {
					this.ritmoActual = Number(res.rhythm);
				}
				if (Number(res.oxygen) > 0 && Number(res.oxygen) < 101) {
					this.valorActualOxigeno = Number(res.oxygen);
				}
			}, err => {
				console.log("aun no ha llegado data");
			}
		)
	}


	getDate() {
		setInterval(() => {
			this.time = new Date();
		}, 1000);
	}


	ngOnDestroy(): void {
		clearInterval(this.hilo_temperatura);
		clearInterval(this.hilo_ritmo);
		clearInterval(this.hilo_oxigeno);
		clearInterval(this.hiloTimer);
		clearInterval(this.hilo_save);
		clearInterval(this.hilo_datos_tiempo_real);
		this.saveInMongoDB();
	}


	//-------------------------------------------------------------------- SHOW GRAPHICS
	private showGraphic_temperatura(): void {
		let char_grafica_temperaturaTime: any = new Date();
		// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
		char_grafica_temperaturaTime = char_grafica_temperaturaTime.getHours() + ':' + ((char_grafica_temperaturaTime.getMinutes() < 10) ? '0' + char_grafica_temperaturaTime.getMinutes() : char_grafica_temperaturaTime.getMinutes()) + ':' + ((char_grafica_temperaturaTime.getSeconds() < 10) ? '0' + char_grafica_temperaturaTime.getSeconds() : char_grafica_temperaturaTime.getSeconds());
		if (this.char_grafica_temperatura.data.labels.length > 7) {
			this.char_grafica_temperatura.data.labels.shift();
			this.char_grafica_temperatura.data.datasets[0].data.shift();
		}
		this.char_grafica_temperatura.data.labels.push(char_grafica_temperaturaTime);
		this.char_grafica_temperatura.data.datasets[0].data.push(this.valorActual_temperatura); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
		this.char_grafica_temperatura.update();
	}

	private showGraphic_ritmo(): void {
		let chart_ritmoTime: any = new Date();
		// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
		chart_ritmoTime = chart_ritmoTime.getHours() + ':' + ((chart_ritmoTime.getMinutes() < 10) ? '0' + chart_ritmoTime.getMinutes() : chart_ritmoTime.getMinutes()) + ':' + ((chart_ritmoTime.getSeconds() < 10) ? '0' + chart_ritmoTime.getSeconds() : chart_ritmoTime.getSeconds());
		if (this.chart_ritmo.data.labels.length > 7) {
			this.chart_ritmo.data.labels.shift();
			this.chart_ritmo.data.datasets[0].data.shift();
		}
		this.chart_ritmo.data.labels.push(chart_ritmoTime);
		this.chart_ritmo.data.datasets[0].data.push(this.ritmoActual); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
		this.chart_ritmo.update();
	}

	private showGraphic_Oxigeno(): void {
		let char_grafica_oxigenoTime: any = new Date();
		// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
		char_grafica_oxigenoTime = char_grafica_oxigenoTime.getHours() + ':' + ((char_grafica_oxigenoTime.getMinutes() < 10) ? '0' + char_grafica_oxigenoTime.getMinutes() : char_grafica_oxigenoTime.getMinutes()) + ':' + ((char_grafica_oxigenoTime.getSeconds() < 10) ? '0' + char_grafica_oxigenoTime.getSeconds() : char_grafica_oxigenoTime.getSeconds());
		if (this.char_grafica_oxigeno.data.labels.length > 7) {
			this.char_grafica_oxigeno.data.labels.shift();
			this.char_grafica_oxigeno.data.datasets[0].data.shift();
		}
		this.char_grafica_oxigeno.data.labels.push(char_grafica_oxigenoTime);
		this.char_grafica_oxigeno.data.datasets[0].data.push(this.valorActualOxigeno); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
		this.char_grafica_oxigeno.update();
	}

	//------------------------------------------------------------------------------------- REPORTES

	private showReportTemperatura(): void {
	for (let i = 0; i < this.rep_temperaturas.length; i++) {
		this.rep_grafica_temperatura.data.labels.push("x");
		this.rep_grafica_temperatura.data.datasets[0].data.push(this.rep_temperaturas[i].valor); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
		this.rep_grafica_temperatura.update();
	}
	this.estadisticas_temp.promedio =  Number(this.calcularPromedio(this.rep_temperaturas).toFixed(2));
	this.estadisticas_temp.min = this.getMinimo(this.rep_temperaturas);
	this.estadisticas_temp.max = this.getMaximo(this.rep_temperaturas);
	}
	private show_rep_ritmo(): void {
	for(let i = 0 ; i < this.rep_ritmos.length; i ++){
	this.rep_grafica_ritmo.data.labels.push("x");
	this.rep_grafica_ritmo.data.datasets[0].data.push(this.rep_ritmos[i].valor); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
	this.rep_grafica_ritmo.update();
	}
	this.estadisticas_ritmo.promedio =   Number(this.calcularPromedio(this.rep_temperaturas).toFixed(2));
	this.estadisticas_ritmo.min = this.getMinimo(this.rep_temperaturas);
	this.estadisticas_ritmo.max = this.getMaximo(this.rep_temperaturas);
	}

	private showReportOxigeno(): void {
	for(let i = 0 ; i < this.rep_oxigenos.length; i ++){
	this.rep_grafica_oxigeno.data.labels.push("x");
	this.rep_grafica_oxigeno.data.datasets[0].data.push( this.rep_oxigenos[i].valor); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
	this.rep_grafica_oxigeno.update();
	}
	this.estadisticas_oxigeno.promedio =  Number(this.calcularPromedio(this.rep_temperaturas).toFixed(2));
	this.estadisticas_oxigeno.min = this.getMinimo(this.rep_temperaturas);
	this.estadisticas_oxigeno.max = this.getMaximo(this.rep_temperaturas);
	}

	public ChageCombobox(){
		if (this.NUMERO_DE_TEST_REPORTE == 0){// MANDAR UN 0 SI QUIERO EL REPORTE GENERAL
			this.reportesGenerales();
		}else{
			this.getReportesPorTest(this.NUMERO_DE_TEST_REPORTE);
		}
	}

	public getReportesPorTest(numTest: any):void{

	this.service.getTest(this.uid , numTest).subscribe(
		res=>{
			console.log("POR TEST: ", res);
			let vectorAll = res[0].valores;
			this.rep_oxigenos=[];
			this.rep_ritmos=[];
			this.rep_temperaturas=[];
			for(let i = 0; i < vectorAll.length; i++){
				this.rep_oxigenos.push({valor: vectorAll[i].oxygen , fecha: vectorAll[i].fecha});
				this.rep_ritmos.push({ valor: vectorAll[i].rhythm ,  fecha: vectorAll[i].fecha});
				this.rep_temperaturas.push({valor: vectorAll[i].temperature , fecha: vectorAll[i].fecha});
			}
			this.showReportOxigeno();
			this.show_rep_ritmo();
			this.showReportTemperatura();
		},
		err=>{
			console.log(err)
		}
	)
		

	}

	public reportesGenerales(): void {
		this.service.getHistorialMediciones(this.uid).subscribe(
			res =>{
				console.log("HISTORIAL COMPLETO" , res);
				let vectorAll:Valor[] = [];
				for(let x = 0 ; x < res.length; x++){
					vectorAll.push(...res[x].valores);
				}
				this.rep_oxigenos=[];
				this.rep_ritmos=[];
				this.rep_temperaturas=[];
				for(let i = 0; i < vectorAll.length; i++){
					this.rep_oxigenos.push({valor: vectorAll[i].oxygen , fecha: vectorAll[i].fecha});
					this.rep_ritmos.push({ valor: vectorAll[i].rhythm ,  fecha: vectorAll[i].fecha});
					this.rep_temperaturas.push({valor: vectorAll[i].temperature , fecha: vectorAll[i].fecha});
				}

				this.showReportOxigeno();
				this.show_rep_ritmo();
				this.showReportTemperatura();
			},
			err =>{
				console.log("error historial compleeto", err)
			}
		)
	}



	public saveMedition() {
		// acumulador al objeto de medicion :v
		this.MEDICION_TEST_ACTUAL.valores.push({ temperature: this.valorActual_temperatura, oxygen: this.valorActualOxigeno, rhythm: this.ritmoActual });
	}

	public saveInMongoDB() {

		this.service.saveMedicion(this.MEDICION_TEST_ACTUAL).subscribe(
			res => {
				console.log("REGISTROS ALAMACENADOS EN MONGODB", res);
			}, err => {
				console.log(err);
			}
		)
	}

	start() {
		this.pauseTime = false;
		this.takeTime();
	}


	stop() {
		this.pauseTime = true;
		this.minutes = '00';
		this.seconds = '00';
		clearInterval(this.hiloTimer);
		Swal.fire('Test Terminado!!');
	}


	takeTime() {

		this.hiloTimer = setInterval(() => {
			if (!this.pauseTime) {
				let second = Number(this.seconds);
				let minute = Number(this.minutes);
				second += 1;
				if (second > 59) {
					second = 0;
					(this.seconds) = '00';
					minute += 1;
				}
				if (second < 10) {

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



	calcularPromedio(arreglo: any){
		let suma= 0;
		for(let i = 0 ; i < arreglo.length; i++){
		  suma += arreglo[i].valor;
		}
		if (arreglo.length == 0){
		  return -777
		}
		return suma/arreglo.length;
	  }
	  
	  public getMinimo(arreglo: any):any{
		let min= 1000*9999;
		for(let i = 0 ; i < arreglo.length; i++){
		if( Number(arreglo[i].valor) < min){
		  min = arreglo[i].valor;
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
		 if( arreglo[i].valor > max ){
		  max = arreglo[i].valor;
		 }
		}
		if (arreglo.length == 0){
		  console.log('por el momento no tienes registros');
		  max = 0 ;
		}
		return max;
	  }
	  



}
