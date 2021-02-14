import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // PARA CAMBIAR DE UNA PESTAÑA A OTRA
@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  goto_userMode():void{
    //this.router.navigate(['']);
  }
  goto_coachMode():void{
    this.router.navigate(['/coach']);
  }
}
