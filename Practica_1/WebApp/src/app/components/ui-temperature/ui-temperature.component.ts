import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // PARA CAMBIAR DE UNA PESTAÑA A OTRA
@Component({
  selector: 'app-ui-temperature',
  templateUrl: './ui-temperature.component.html',
  styleUrls: ['./ui-temperature.component.css']
})
export class UiTemperatureComponent implements OnInit {
  value:any;
  constructor(private r: Router) {
    this.value = 0;
  }

  ngOnInit(): void {
  }

}
