import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-ui-rhythm',
  templateUrl: './ui-rhythm.component.html',
  styleUrls: ['./ui-rhythm.component.css']
})
export class UiRhythmComponent implements OnInit {
	private hilo: any = null;
	public chart_ritmo: any = null;
	public ritmoActual = 0;
	constructor(private http: HttpClient) {
	}

	
	 ngOnInit(): void {
		this.chart_ritmo = new Chart('realtime', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'RITMO CARDAICO',
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
						  fontColor: "black"
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
	
	ngOnDestroy(): void {
		clearInterval(this.hilo);
	}

	private showGraphic(): void {
		this.getFromAPI().subscribe( res => {
			// { data: 78 , code: 200, error: false }
			let chart_ritmoTime: any = new Date();
			// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
			chart_ritmoTime = chart_ritmoTime.getHours() + ':' + ((chart_ritmoTime.getMinutes() < 10) ? '0' + chart_ritmoTime.getMinutes() : chart_ritmoTime.getMinutes()) + ':' + ((chart_ritmoTime.getSeconds() < 10) ? '0' + chart_ritmoTime.getSeconds() : chart_ritmoTime.getSeconds());
			if(this.chart_ritmo.data.labels.length > 15) {
					this.chart_ritmo.data.labels.shift();
					this.chart_ritmo.data.datasets[0].data.shift();
			}
			this.chart_ritmo.data.labels.push(chart_ritmoTime);
			this.chart_ritmo.data.datasets[0].data.push(res.data); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
			this.chart_ritmo.update();
			this.ritmoActual = res.data;
		}, err => {
			console.log('error' , err);
		});
	}
  
	/**
	* Get the data from the API
	* @function getFromAPI
	* @return {Observable<any>}
	*/
	private getFromAPI(): Observable<any>{
	  return this.http.get(
		'http://localhost:3000',
		{ responseType: 'json' }
	  );
	}
  
}
