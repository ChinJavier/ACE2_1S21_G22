import { Component, OnInit } from '@angular/core';
import {MedicionesService} from './../../services/mediciones.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor( private s : MedicionesService) { }
  history:any = [];
  promedio:any = "NINGUNO";
	public rep_grafica_ritmo: any = null;

  ngOnInit(): void {
    //this.getMediciones();

    // OBJETO QUE CONTROLA LA GRAFICA
    this.rep_grafica_ritmo = new Chart('realtime', {
			type: 'bar',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'ritmo vs fecha/hora',
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

  // getMediciones(){
  //   // esta peticion me devuelve el historial
  //   const id = localStorage.getItem('uid');
  //   this.s.getMediciones("rhythm" ,id).subscribe(res => {
  //     for (let i = 0 ; i < res.length; i++){
  //       const objetoHistory = {
  //         fecha: res[i].fecha,
  //         valor: res[i].rhythm,
  //         type: 'rhythm'
  //       };
  //       this.history.push(objetoHistory);
  //     }
  //     this.promedio = this.calcularPromedio();
  //     if (this.promedio == undefined){ this.promedio = "NINGUNO"; console.log('ninguno')}
  //     this.show_rep_ritmo();
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
}
