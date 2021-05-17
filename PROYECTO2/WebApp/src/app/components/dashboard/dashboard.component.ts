import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { MedicionesService } from './../../services/mediciones.service';
import Swal from 'sweetalert2';
import { Medition } from 'src/app/interfaces/interfaces';
import { numbers } from '@material/banner';



@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
	constructor(private service: MedicionesService,) { }

	ngOnInit(): void {
		this.username = localStorage.getItem('username');
		this.uid = localStorage.getItem('uid');
		//this.getMediciones();
		this.getDate();
		if (this.uid != null) {
			this.MEDICION_TEST_ACTUAL.id_user = this.uid;

			this.service.getNumUltimeTest(this.uid).subscribe(res => {

				this.MEDICION_TEST_ACTUAL.test = Number(res.num) + 1;
				console.log("TEST: " + this.MEDICION_TEST_ACTUAL.test);
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
		// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
		for (let i = 0; i < this.history.length; i++) {
			let rep_grafica_temperaturaTime = new Date(this.history[i].fecha).toLocaleDateString() + "  " + new Date(this.history[i].fecha).toLocaleTimeString();
			if (this.rep_grafica_temperatura.data.labels.length > this.history.length) {
				this.rep_grafica_temperatura.data.labels.shift();
				this.rep_grafica_temperatura.data.datasets[0].data.shift();
			}
			this.rep_grafica_temperatura.data.labels.push(rep_grafica_temperaturaTime);
			this.rep_grafica_temperatura.data.datasets[0].data.push(this.history[i].valor); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
			this.rep_grafica_temperatura.update();
		}
	}
	private show_rep_ritmo(): void {
	// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
	for(let i = 0 ; i < this.history.length; i ++){
	let rep_grafica_ritmoTime = new Date(this.history[i].fecha).toLocaleDateString() +"  "+new Date(this.history[i].fecha).toLocaleTimeString();
	if(this.rep_grafica_ritmo.data.labels.length > this.history.length) {
	this.rep_grafica_ritmo.data.labels.shift();
	this.rep_grafica_ritmo.data.datasets[0].data.shift();
	}
	this.rep_grafica_ritmo.data.labels.push(rep_grafica_ritmoTime);
	this.rep_grafica_ritmo.data.datasets[0].data.push(this.history[i].valor); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
	this.rep_grafica_ritmo.update();
	}
	}

	
	private showReportOxigeno(): void {
	// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
	for(let i = 0 ; i < this.history.length; i ++){
	let rep_grafica_oxigenoTime = new Date(this.history[i].fecha).toLocaleDateString() +"  "+new Date(this.history[i].fecha).toLocaleTimeString();
	if(this.rep_grafica_oxigeno.data.labels.length > this.history.length) {
	this.rep_grafica_oxigeno.data.labels.shift();
	this.rep_grafica_oxigeno.data.datasets[0].data.shift();
	}
	this.rep_grafica_oxigeno.data.labels.push(rep_grafica_oxigenoTime);
	this.rep_grafica_oxigeno.data.datasets[0].data.push(this.history[i].valor); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
	this.rep_grafica_oxigeno.update();
	}
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




}
