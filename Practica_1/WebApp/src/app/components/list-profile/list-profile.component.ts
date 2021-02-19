import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from './../../services/user.service'
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

}
