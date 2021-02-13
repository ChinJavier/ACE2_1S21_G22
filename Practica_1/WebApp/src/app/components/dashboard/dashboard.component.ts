import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = '' ;
  uid: string | null = '';
  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.uid = localStorage.getItem('uid');
  }

}
