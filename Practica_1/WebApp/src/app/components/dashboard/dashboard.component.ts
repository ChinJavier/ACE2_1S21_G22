import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {MedicionesService} from './../../services/mediciones.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = '' ;
  uid: string | null = '';

  history:any = [];
  constructor(
    private authService: AuthService,
    private s : MedicionesService
  ) {


    console.log(this.history);
  }
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.uid = localStorage.getItem('uid');
    this.getMediciones();
  }

   getMediciones():void{
    const id = localStorage.getItem('uid');
    this.s.getMediciones("oxygen" ,id).subscribe(res => {
      console.log("*GET HISTORY OF OXYGEN" , res)
      for (let i = 0 ; i < res.length; i++){
        const objetoHistory = {
          fecha: res[i].fecha,
          valor: res[i].oxygen,
          type: 'Oxigeno'
        };
        this.history.push(objetoHistory);
      }
    },
      err => console.log(err)
    );
    this.s.getMediciones("temperature" ,id).subscribe(res => {
      console.log("*GET HISTORY OF temperature" , res)
      for (let i = 0 ; i < res.length; i++){
        const objetoHistory = {
          fecha: res[i].fecha,
          valor: res[i].temperature,
          type: 'Temperatura'
        };
        this.history.push(objetoHistory);
      }
    },
      err => console.log(err)
    );
    this.s.getMediciones("rhythm" ,id).subscribe(res => {
      console.log("*GET HISTORY OF rhythm" , res)
      for (let i = 0 ; i < res.length; i++){
        const objetoHistory = {
          fecha: res[i].fecha,
          valor: res[i].rhythm,
          type: 'Ritmo'
        };
        this.history.push(objetoHistory);
      }
    },
      err => console.log(err)
    );
  }


}
