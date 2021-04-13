import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from './../../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.css']
})
export class ListProfileComponent implements OnInit {
  coachito= ['uno', 'dos',' tres', 'cuatro'];
  usuariosDisponibles: any = [];
  misUsuarios: any = [];
  constructor(private router: Router , private s: UserService) {
  }

  ngOnInit(): void {
    this.inicializar();
    this.getUsersAvailable();
    this.getMyUsers();
  }

  goto_profile(username: any): void{
    this.router.navigate(['/profile/' , username]);
  }

  getUsersAvailable():void{
    this.s.getUsersAvailable().subscribe(res => {this.usuariosDisponibles = res; console.log(res);} , err => console.log(err));
  }
  getMyUsers():void{
    this.s.getMyUsers(localStorage.getItem('username')).subscribe(res => {this.misUsuarios = res; console.log(res);} , err => console.log(err));
  }

  asignarUser(_idMongo: any):void{
     console.log(_idMongo);
    this.s.asignar(_idMongo  ,localStorage.getItem('username')).subscribe(
      res => {this.getMyUsers(); console.log(res); this.getUsersAvailable();} , err => console.log(err)
    );
  }

  verHistorial(_id:any , username: any):void{
    this.router.navigate(['/history',_id , username]);
  }

  enter_with_how_user(_id:any , username:any):void{
 
    Swal.fire({text: `¿Seguro que desea entrar como coach de ${username} ?` , icon: 'warning' , showCancelButton:true, confirmButtonText:"SI", cancelButtonText:"CANCELAR"})
    .then (resultado =>{
      if(resultado.value){
        const id_coach:any = localStorage.getItem('uid');
        const user_coach:any = localStorage.getItem('username');
        localStorage.setItem('username' ,username);
        localStorage.setItem('uid' , _id);
        localStorage.setItem('username_coach' ,user_coach);
        localStorage.setItem('uid_coach' , id_coach);
        console.log("____ CHANGE USER ______");
        console.log(localStorage.getItem('uid'));
        console.log(localStorage.getItem('username'));
        console.log("______________________");
        this.router.navigate(['/dashboard']);
      }else{
        return
      }
    });
  }


  // VARIABLES PARA EL RELOJ
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
