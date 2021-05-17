import { Component, OnInit } from '@angular/core';
import {MedicionesService} from './../../services/mediciones.service';
import { Chart } from 'chart.js';

import { MatDialog } from "@angular/material/dialog";
import { SuccessComponent } from '../dialogs/success/success.component';


@Component({
  selector: 'app-ui-oxygen',
  templateUrl: './ui-oxygen.component.html',
  styleUrls: ['./ui-oxygen.component.css']
})
export class UiOxygenComponent implements OnInit {
	private hilo_oxigeno: any = null;
	public char_grafica_oxigeno: any = null;
	public valorActualOxigeno = 0;
	constructor(
		private service: MedicionesService,
		public dialog: MatDialog,
	) {
	}

	
	 ngOnInit(): void {
		this.char_grafica_oxigeno = new Chart('realtime', {
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
		
		this.hilo_oxigeno = setInterval(() =>{this.showGraphic_Oxigeno();},1000);
	}
	
	ngOnDestroy(): void {
		clearInterval(this.hilo_oxigeno);
	}

	openDialog() {
		this.dialog.open(SuccessComponent, {
			width: "350px",
			height: "220px",
		  });
	}

	private showGraphic_Oxigeno(): void {
		// this.service.getOxygen().subscribe(res => {
		// 	let char_grafica_oxigenoTime: any = new Date();
		// 	// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
		// 	char_grafica_oxigenoTime = char_grafica_oxigenoTime.getHours() + ':' + ((char_grafica_oxigenoTime.getMinutes() < 10) ? '0' + char_grafica_oxigenoTime.getMinutes() : char_grafica_oxigenoTime.getMinutes()) + ':' + ((char_grafica_oxigenoTime.getSeconds() < 10) ? '0' + char_grafica_oxigenoTime.getSeconds() : char_grafica_oxigenoTime.getSeconds());
		// 	if(this.char_grafica_oxigeno.data.labels.length > 9) {
		// 			this.char_grafica_oxigeno.data.labels.shift();
		// 			this.char_grafica_oxigeno.data.datasets[0].data.shift();
		// 	}
		// 	this.char_grafica_oxigeno.data.labels.push(char_grafica_oxigenoTime);
		// 	this.char_grafica_oxigeno.data.datasets[0].data.push(res); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
		// 	this.char_grafica_oxigeno.update();
		// 	this.valorActualOxigeno = res;
		// } , err => {
		// 	console.log('error' , err);
		// });
	}




}
