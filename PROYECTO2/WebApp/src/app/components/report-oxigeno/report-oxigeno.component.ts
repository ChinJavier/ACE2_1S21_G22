import { Component, OnInit } from '@angular/core';
import {MedicionesService} from './../../services/mediciones.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-report-oxigeno',
  templateUrl: './report-oxigeno.component.html',
  styleUrls: ['./report-oxigeno.component.css']
})
export class ReportOxigenoComponent implements OnInit {


  constructor( private s : MedicionesService) { }
  history:any = [];
  promedio:any = "NINGUNO";
	public rep_grafica_oxigeno: any = null;

  ngOnInit(): void {
    //this.getMediciones();

    // OBJETO QUE CONTROLA LA GRAFICA
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

  // getMediciones(){
  //   // esta peticion me devuelve el historial
  //   const id = localStorage.getItem('uid');
  //   this.s.getMediciones("oxygen" ,id).subscribe(res => {
  //     for (let i = 0 ; i < res.length; i++){
  //       const objetoHistory = {
  //         fecha: res[i].fecha,
  //         valor: res[i].oxygen,
  //         type: 'oxygen'
  //       };
  //       this.history.push(objetoHistory);
  //     }
  //     this.promedio = this.calcularPromedio();
  //     if (this.promedio == undefined){ this.promedio = "NINGUNO"; console.log('ninguno')}
  //     this.showReportOxigeno();
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
