import { Component, OnInit } from '@angular/core';
import {MedicionesService} from './../../services/mediciones.service';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from './../../services/user.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history_ritmo:any = [];
  history_temperatura:any = [];
  history_oxigeno:any = [];
  _id : any ;
  constructor(private s: MedicionesService ,private activatedRoute: ActivatedRoute , private sUser:UserService) {
    
  }

  ngOnInit(): void {
  this._id = this.activatedRoute.snapshot.params.id;
  this.getMediciones();
  }

  getMediciones():void{
    this.s.getMediciones("oxygen" ,this._id).subscribe(res => {
      console.log("*GET HISTORY OF OXYGEN" , res)
      for (let i = 0 ; i < res.length; i++){
        const objetoHistory = {
          fecha: res[i].fecha,
          valor: res[i].oxygen,
          type: 'Oxigeno'
        };
        this.history_oxigeno.push(objetoHistory);
      }
    },
      err => console.log(err)
    );
    this.s.getMediciones("temperature" ,this._id).subscribe(res => {
      console.log("*GET HISTORY OF temperature" , res)
      for (let i = 0 ; i < res.length; i++){
        const objetoHistory = {
          fecha: res[i].fecha,
          valor: res[i].temperature,
          type: 'Temperatura'
        };
        this.history_temperatura.push(objetoHistory);
      }
    },
      err => console.log(err)
    );
    this.s.getMediciones("rhythm" ,this._id).subscribe(res => {
      console.log("*GET HISTORY OF rhythm" , res)
      for (let i = 0 ; i < res.length; i++){
        const objetoHistory = {
          fecha: res[i].fecha,
          valor: res[i].rhythm,
          type: 'Ritmo'
        };
        this.history_oxigeno.push(objetoHistory);
      }
    },
      err => console.log(err)
    );
  }


  getInfoUsuario():void{
    
  }
}
