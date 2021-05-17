import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { MedicionesService } from './../../services/mediciones.service';
import Swal from 'sweetalert2';
import { Medition } from 'src/app/interfaces/interfaces';



@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	MEDICION_TEST_ACTUAL: Medition={id_user:"",test:0,valores:[]};
	NUM_TEST_ACTUAL: Number= 0;
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


	// --------------------------------------------------------  GRAFICA DE TEMPERATURA
	public hilo_temperatura: any = null;
	public char_grafica_temperatura: any = null;
	public valorActual_temperatura = 0;

	//-------------------------------------------------------- GRAFICA RITMO
	private hilo_ritmo: any = null;
	public chart_ritmo: any = null;
	public ritmoActual = 0;

	//------------------------------------------------------- GRAFICA OXIGENO
	public hilo_oxigeno: any = null;
	public char_grafica_oxigeno: any = null;
	public valorActualOxigeno = 0;

	constructor(private service: MedicionesService,) {}

	ngOnInit(): void {
		this.username = localStorage.getItem('username');
		this.uid = localStorage.getItem('uid');
		//this.getMediciones();
		this.getDate();

		this.imagen = this.estados[0];


		this.char_grafica_temperatura = new Chart('realtime', {
			type: 'bar',
			data: {
				labels: [],
				datasets: [
					{
						label: 'temperatura vs tiempo',
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

		this.hilo_temperatura = setInterval(() => { this.showGraphic_temperatura(); }, 1000);


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

		this.hilo_ritmo = setInterval(() => { this.showGraphic_ritmo(); }, 1000);




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

		this.hilo_oxigeno = setInterval(() => { this.showGraphic_Oxigeno(); }, 1000);

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
	}


	//-------------------------------------------------------------------- SHOW GRAPHICS
	private showGraphic_temperatura(): void {
		this.service.getTemperatura().subscribe(res => {
			let char_grafica_temperaturaTime: any = new Date();
			// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
			char_grafica_temperaturaTime = char_grafica_temperaturaTime.getHours() + ':' + ((char_grafica_temperaturaTime.getMinutes() < 10) ? '0' + char_grafica_temperaturaTime.getMinutes() : char_grafica_temperaturaTime.getMinutes()) + ':' + ((char_grafica_temperaturaTime.getSeconds() < 10) ? '0' + char_grafica_temperaturaTime.getSeconds() : char_grafica_temperaturaTime.getSeconds());
			if (this.char_grafica_temperatura.data.labels.length > 7) {
				this.char_grafica_temperatura.data.labels.shift();
				this.char_grafica_temperatura.data.datasets[0].data.shift();
			}
			this.char_grafica_temperatura.data.labels.push(char_grafica_temperaturaTime);
			this.char_grafica_temperatura.data.datasets[0].data.push(res); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
			this.char_grafica_temperatura.update();
			this.valorActual_temperatura = res;
		}, err => {
			console.log('error', err);
		});
	}

	private showGraphic_ritmo(): void {
		this.service.getrhythm().subscribe(res => {
			let chart_ritmoTime: any = new Date();
			// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
			chart_ritmoTime = chart_ritmoTime.getHours() + ':' + ((chart_ritmoTime.getMinutes() < 10) ? '0' + chart_ritmoTime.getMinutes() : chart_ritmoTime.getMinutes()) + ':' + ((chart_ritmoTime.getSeconds() < 10) ? '0' + chart_ritmoTime.getSeconds() : chart_ritmoTime.getSeconds());
			if (this.chart_ritmo.data.labels.length > 15) {
				this.chart_ritmo.data.labels.shift();
				this.chart_ritmo.data.datasets[0].data.shift();
			}
			this.chart_ritmo.data.labels.push(chart_ritmoTime);
			this.chart_ritmo.data.datasets[0].data.push(res); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
			this.chart_ritmo.update();
			this.ritmoActual = res;
		}, err => {
			console.log('error', err);
		});
	}

	private showGraphic_Oxigeno(): void {
		this.service.getOxygen().subscribe(res => {
			let char_grafica_oxigenoTime: any = new Date();
			// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
			char_grafica_oxigenoTime = char_grafica_oxigenoTime.getHours() + ':' + ((char_grafica_oxigenoTime.getMinutes() < 10) ? '0' + char_grafica_oxigenoTime.getMinutes() : char_grafica_oxigenoTime.getMinutes()) + ':' + ((char_grafica_oxigenoTime.getSeconds() < 10) ? '0' + char_grafica_oxigenoTime.getSeconds() : char_grafica_oxigenoTime.getSeconds());
			if (this.char_grafica_oxigeno.data.labels.length > 9) {
				this.char_grafica_oxigeno.data.labels.shift();
				this.char_grafica_oxigeno.data.datasets[0].data.shift();
			}
			this.char_grafica_oxigeno.data.labels.push(char_grafica_oxigenoTime);
			this.char_grafica_oxigeno.data.datasets[0].data.push(res); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
			this.char_grafica_oxigeno.update();
			this.valorActualOxigeno = res;
		}, err => {
			console.log('error', err);
		});
	}


	public saveMedition(){
		// acumulador al objeto de medicion :v
		
	}

	public saveInMongoDB(objeto:  Medition){
		this.service.saveMedicion(objeto).subscribe(
			res=>{
				console.log(res);
			},err=>{
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
