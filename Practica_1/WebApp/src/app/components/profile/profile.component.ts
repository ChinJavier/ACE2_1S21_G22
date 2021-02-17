import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  datos = [{name: 'Lourdes', 
            apellido: 'Lorenzana',
            age: '32',
            sexo: 'M',
            peso: '176 lbs',
            estatura: '180 cms'}];

  constructor() { }

  ngOnInit(): void {
  }

}

