import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import {MedicionesService} from './../../services/mediciones.service';
import { MatDialog } from "@angular/material/dialog";
import { SuccessComponent } from '../dialogs/success/success.component';

@Component({
  selector: 'app-ui-rhythm',
  templateUrl: './ui-rhythm.component.html',
  styleUrls: ['./ui-rhythm.component.css']
})
export class UiRhythmComponent implements OnInit {
	private hilo_ritmo: any = null;
	public chart_ritmo: any = null;
	public ritmoActual = 0;
	constructor(private service: MedicionesService,
		public dialog: MatDialog,
		) {
	}

	
	 ngOnInit(): void {
		this.chart_ritmo = new Chart('realtime', {
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
		
		this.hilo_ritmo = setInterval(() =>{this.showGraphic_ritmo();},1000);
	}
	
	ngOnDestroy(): void {
		clearInterval(this.hilo_ritmo);
	}

	private showGraphic_ritmo(): void {
		this.service.getrhythm().subscribe(res => {
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
	openDialog() {
		this.dialog.open(SuccessComponent, {
			width: "350px",
			height: "220px",
		  });
	}

	public saveRitmo():void{
		this.openDialog();
		const objetoModelo = {rhythm: this.ritmoActual , user: localStorage.getItem('uid')};
		console.log(objetoModelo);
		this.service.saveMedicion(objetoModelo,"rhythm").subscribe(res => {
			console.log(res);
		} , err => {
			console.log('error' , err);
		});
	}

}
