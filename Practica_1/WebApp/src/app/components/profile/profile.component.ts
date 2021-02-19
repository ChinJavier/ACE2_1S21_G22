import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from './../../services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  PROFILE: any ;

  datos = [{name: 'Lourdes',
            apellido: 'Lorenzana',
            age: '32',
            sexo: 'M',
            peso: '176 lbs',
            estatura: '180 cms'}];

  constructor(private activatedRoute: ActivatedRoute  , private sUser: UserService) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.username); // aca recibimos el usuario y luego obtenemos los datos
    let username: any = this.activatedRoute.snapshot.params.username; 
    this.sUser.getInfoUser(username).subscribe(res => {
      this.PROFILE = res;
      console.log(res);
    
    }, err => console.log(err));
    
  }

}

