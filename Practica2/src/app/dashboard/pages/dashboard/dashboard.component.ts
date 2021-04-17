import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts/ng2-charts';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {
  }

  takeTime() {

    setInterval(() => {
      if(!this.pauseTime){
        let second = Number(this.seconds);
        let minute = Number(this.minutes);
        second += 1;
        if(second > 59) {
          (this.seconds) = '00';
          minute += 1;
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
    this.dashboardService.setWeight(this.username!, this.weight)
      .subscribe(
        res => {
          if(res) {
            Swal.fire('¡Bien hecho!', 'Guardado exitosamente.', 'success');

          } else {
            Swal.fire('Error', 'No se ha podido guardar su peso.', 'error');
          }
          this.weight =''
        }
      )
  }

  logout() {
    this.authService.logout();
  }

  public vxoLabels: Label[] = [];
  public vxoChartType: ChartType = 'bar';
  public vxoChartLegend = true;
  public vxoData: MultiDataSet = [ [2,3]];
}
