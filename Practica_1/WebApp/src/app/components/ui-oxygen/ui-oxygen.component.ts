import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // PARA CAMBIAR DE UNA PESTAÑA A OTRA
@Component({
  selector: 'app-ui-oxygen',
  templateUrl: './ui-oxygen.component.html',
  styleUrls: ['./ui-oxygen.component.css']
})
export class UiOxygenComponent implements OnInit {
  value: any
  constructor(private r:Router) {
    this.value = 0;
  }

  ngOnInit(): void {
  }

}
