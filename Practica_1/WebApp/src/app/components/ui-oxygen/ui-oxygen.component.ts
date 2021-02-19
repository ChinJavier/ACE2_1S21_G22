import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // PARA CAMBIAR DE UNA PESTAÑA A OTRA
import {MedicionesService} from './../../services/mediciones.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-ui-oxygen',
  templateUrl: './ui-oxygen.component.html',
  styleUrls: ['./ui-oxygen.component.css']
})
export class UiOxygenComponent implements OnInit {
	private hilo: any = null;
	public char_grafica: any = null;
	public valorActual = 0;
	constructor(private service: MedicionesService) {
	}

	
	 ngOnInit(): void {
		this.char_grafica = new Chart('realtime', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'Oxigeno',
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
		
		this.showGraphic();
		
		this.hilo = setInterval(() =>{this.showGraphic();},1000);
	}
	
	ngOnDestroy(): void {
		clearInterval(this.hilo);
	}

	private showGraphic(): void {
		this.service.getOxygen().subscribe(res => {
			let char_graficaTime: any = new Date();
			// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
			char_graficaTime = char_graficaTime.getHours() + ':' + ((char_graficaTime.getMinutes() < 10) ? '0' + char_graficaTime.getMinutes() : char_graficaTime.getMinutes()) + ':' + ((char_graficaTime.getSeconds() < 10) ? '0' + char_graficaTime.getSeconds() : char_graficaTime.getSeconds());
			if(this.char_grafica.data.labels.length > 9) {
					this.char_grafica.data.labels.shift();
					this.char_grafica.data.datasets[0].data.shift();
			}
			this.char_grafica.data.labels.push(char_graficaTime);
			this.char_grafica.data.datasets[0].data.push(res); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
			this.char_grafica.update();
			this.valorActual = res;
		} , err => {
			console.log('error' , err);
		});
	}


	public saveOxygen():void{
		const objetoModelo = {oxygen: this.valorActual , user: localStorage.getItem('uid')};
		console.log(objetoModelo);
		this.service.saveMedicion(objetoModelo,"oxygen").subscribe(res => {
			alert('Medicion registrada');
			console.log(res);
		} , err => {
			console.log('**error**' , err);
		});
	}

}
