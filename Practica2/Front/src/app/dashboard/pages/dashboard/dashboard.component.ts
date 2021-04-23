import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts/ng2-charts';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	private hilo: any = null;
	public char_grafica: any = null;
  vxData: any = [];
  vxDataAux: any = [];
  time: Date = new Date();
  username: string | null = '';

  weight: any;

  // Timer

  minutes: any = '00';
  seconds: any = '00';

  pauseTime: boolean = false;

  counter: number = 0;
  volEMin: number =0;
  volEMax: number =0;
  volIMin: number =0;
  volIMax: number =0;
  promE: number =0;
  promI: number =0;
  vo2: number=0;
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {



    this.char_grafica = new Chart('realtime', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'Medicion de Aire en Tiempo Reals',
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
		
		this.showGraphic();
		
		this.hilo = setInterval(() =>{this.showGraphic();},1000);
  }

  takeTime() {

    setInterval(() => {
      if(!this.pauseTime){
        let second = Number(this.seconds);
        let minute = Number(this.minutes);
        second += 1;
        if(second > 59) {
          second = 0;
          (this.seconds) = '00';
          minute += 1;
          // MINUTO INCREMENTA ENTONCES ACA GUARDO UN DATO EN LA BASE DE DATOS
          
        }
        if(second < 10) {

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

  reset() {
    this.pauseTime = true;
    this.minutes = '00';
    this.seconds = '00'
  }

  getCurrentDate() {
    setInterval(() => {
      this.time = new Date();
    }, 1000)
  }



  public vxoChartOptions: ChartOptions  = {responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'white',
          },
          ticks: {
            fontColor: 'white',
          }
        }
      ]
    }
  };

  start() {
    this.takeTime();
   /* this.dashboardService.setWeight(this.username!, this.weight)
      .subscribe(
        res => {
          if(res) {
            Swal.fire('¡Bien hecho!', 'Guardado exitosamente.', 'success');

          } else {
            Swal.fire('Error', 'No se ha podido guardar su peso.', 'error');
          }
          this.weight =''
        }
      )*/
  }

  logout() {
    this.authService.logout();
  }

  private bandera = false;
  private showGraphic(): void {
    this.bandera = !this.bandera;
		//this.service.getTemperatura().subscribe(res => {
			let char_graficaTime: any = new Date();
			// PONE EL TIEMPO Y SI ES MAYOR A 15 DATOS DA UN SHIFT
			char_graficaTime = char_graficaTime.getHours() + ':' + ((char_graficaTime.getMinutes() < 10) ? '0' + char_graficaTime.getMinutes() : char_graficaTime.getMinutes()) + ':' + ((char_graficaTime.getSeconds() < 10) ? '0' + char_graficaTime.getSeconds() : char_graficaTime.getSeconds());
			if(this.char_grafica.data.labels.length > 7) {
					this.char_grafica.data.labels.shift();
					this.char_grafica.data.datasets[0].data.shift();
			}
			this.char_grafica.data.labels.push(char_graficaTime);
			if(this.bandera){
        this.char_grafica.data.datasets[0].data.push(10); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO

      }else{
        this.char_grafica.data.datasets[0].data.push(-10); // PONE EL VALOR EN Y , ACA VAN LOS DATOS QUE VIENEN DE MONGO
			
      }
      this.char_grafica.update();
		//	this.valorActual = res;
		//} , err => {
		//	console.log('error' , err);
		//});
	}

}
