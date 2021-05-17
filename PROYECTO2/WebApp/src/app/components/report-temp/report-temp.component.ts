import { Component, OnInit } from '@angular/core';
import {MedicionesService} from './../../services/mediciones.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-report-temp',
  templateUrl: './report-temp.component.html',
  styleUrls: ['./report-temp.component.css']
})
export class ReportTempComponent implements OnInit {

  constructor( private s : MedicionesService) { }
  history:any = [];
  promedio:any = "NINGUNO";
  min:any = 0;
  max:any = 0;
	public rep_grafica_temperatura: any = null;

  ngOnInit(): void {
//    this.getMediciones();

    // OBJETO QUE CONTROLA LA GRAFICA
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
							suggestedMax: 50
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
		
  }


  private showReportTemperatura(): void {
			// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
    for(let i = 0 ; i < this.history.length; i ++){
        let rep_grafica_temperaturaTime = new Date(this.history[i].fecha).toLocaleDateString() +"  "+new Date(this.history[i].fecha).toLocaleTimeString();
        if(this.rep_grafica_temperatura.data.labels.length > this.history.length) {
            this.rep_grafica_temperatura.data.labels.shift();
            this.rep_grafica_temperatura.data.datasets[0].data.shift();
        }
        this.rep_grafica_temperatura.data.labels.push(rep_grafica_temperaturaTime);
        this.rep_grafica_temperatura.data.datasets[0].data.push(this.history[i].valor); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
        this.rep_grafica_temperatura.update();
     }
	}

  // getMediciones(){
  //   // esta peticion me devuelve el historial
  //   const id = localStorage.getItem('uid');
  //   this.s.getMediciones("temperature" ,id).subscribe(res => {
  //     for (let i = 0 ; i < res.length; i++){
  //       const objetoHistory = {
  //         fecha: res[i].fecha,
  //         valor: res[i].temperature,
  //         type: 'temperature'
  //       };
  //       this.history.push(objetoHistory);
  //     }
  //     this.promedio = this.calcularPromedio();
  //     if (this.promedio == undefined){ this.promedio = "NINGUNO"; console.log('ninguno')}
  //     this.showReportTemperatura();
  //     this.getMinimo();
  //     this.getMaximo();
  //     // PRINTS SOLO PARA VER LOS VALORES
  //     console.log(this.history);
  //     console.log(this.promedio);
  //   },
  //     err => console.log(err)
  //   );
  // }

  calcularPromedio(){
    let suma= 0;
    for(let i = 0 ; i < this.history.length; i++){
      suma += this.history[i].valor;
    }
    if (this.history.length == 0){
      alert('por el momento no tienes registros');
      return undefined
    }
    return suma/this.history.length;
  }

  public getMaximo():void{
    this.min= 1000*999;
    for(let i = 0 ; i < this.history.length; i++){
    if( this.history[i].valor < this.min){
      this.min = this.history[i].valor;
    }
    }
    if (this.history.length == 0){
      alert('por el momento no tienes registros');
      this.min = 0 ;
    }
  }

  public getMinimo(): void{
    this.max= -1;
    for(let i = 0 ; i < this.history.length; i++){
    if(  this.history[i].valor > this.max ){
      this.max = this.history[i].valor;
    }
    }
    if (this.history.length == 0){
      alert('por el momento no tienes registros');
      this.max = 0 ;
    }
  }

}
