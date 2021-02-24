import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from './../../services/user.service';
import { User } from "../../models/user";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {} as User;

  datos = [{name: 'Lourdes',
            apellido: 'Lorenzana',
            age: '32',
            sexo: 'M',
            peso: '176 lbs',
            estatura: '180 cms'}];

  constructor(private activatedRoute: ActivatedRoute  , private sUser: UserService) { }

  ngOnInit(): void {
    this.inicializar();
    console.log(this.activatedRoute.snapshot.params.username); // aca recibimos el usuario y luego obtenemos los datos
    let username: any = this.activatedRoute.snapshot.params.username; 
    this.sUser.getInfoUser(username).subscribe(res => {
      this.user = res;
      console.log(this.user);
    
    }, err => console.log(err));
    
  }






  time = new Date();
	history:any = [];
	hours = new Date().getHours();
	msg: string = "";





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

