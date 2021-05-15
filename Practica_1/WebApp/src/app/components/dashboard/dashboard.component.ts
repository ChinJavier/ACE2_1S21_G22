import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {MedicionesService} from '../../services/mediciones.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = '' ;
  uid: string | null = '';
  time = new Date();
  history:any = [];
  hours = new Date().getHours();
  msg: string = "";
  constructor(
    private s : MedicionesService
  ) {


  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.uid = localStorage.getItem('uid');
    //this.getMediciones();
    this.getDate();
   // this.displayMsg();

   console.log("CHIN CHE");
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

  getDate(){
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  displayMsg() {
    this.hours = new Date().getHours();
    
    if(this.hours < 10) {
      this.msg = "Good Morning!"
    } else if(this.hours < 16) {
      this.msg = "Good Afternoon!";
    }
  }


}
