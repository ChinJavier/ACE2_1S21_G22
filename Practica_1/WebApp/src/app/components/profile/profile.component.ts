import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username:any = '';
  name: any = '';
  lastname: any = '';
  sex : any = '';
  height: any = '';
  weight: any = '';
  age: any = '';

  datos = [{name: 'Lourdes',
            apellido: 'Lorenzana',
            age: '32',
            sexo: 'M',
            peso: '176 lbs',
            estatura: '180 cms'}];

  constructor(private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params); // aca recibimos el usuario y luego obtenemos los datos
  }

}

