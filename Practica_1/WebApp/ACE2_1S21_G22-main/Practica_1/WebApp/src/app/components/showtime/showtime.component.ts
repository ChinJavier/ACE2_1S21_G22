import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-showtime',
  templateUrl: './showtime.component.html',
  styleUrls: ['./showtime.component.css']
})
export class ShowtimeComponent implements OnInit {
	/*

    ESTA COMPONENTE SIRVE PARA MOSTRAR EL TIEMPO EN LA APLICACION

  */

  time = new Date();
	history:any = [];
	hours = new Date().getHours();
	msg: string = "";

  constructor(
	private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.inicializar();
  }



  logout() {
    this.authService.logout();
  }

	inicializar(){
	this.getDate();
	this.displayMsg();
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
	} else {
		this.msg = "Good Night!"
	}
	}








}
