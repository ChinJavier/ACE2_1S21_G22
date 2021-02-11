import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password  = '123';
  condition: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }


}
