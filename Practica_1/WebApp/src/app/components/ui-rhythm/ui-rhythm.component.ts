import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // PARA CAMBIAR DE UNA PESTAÑA A OTRA
@Component({
  selector: 'app-ui-rhythm',
  templateUrl: './ui-rhythm.component.html',
  styleUrls: ['./ui-rhythm.component.css']
})
export class UiRhythmComponent implements OnInit {
  /**
 * The ChartJS Object
 * @var {any} chart
 */
  public chart: any = null;
  value:any = 0;
  constructor(private r:Router) { }

  ngOnInit(): void {
  }

}
