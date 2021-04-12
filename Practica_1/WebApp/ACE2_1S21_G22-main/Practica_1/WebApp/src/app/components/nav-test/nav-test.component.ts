import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-nav-test',
  templateUrl: './nav-test.component.html',
  styleUrls: ['./nav-test.component.css']
})
export class NavTestComponent implements OnInit {
  username: String | null = '';
  uid:any;
  time = new Date();
  hours = new Date().getHours();
  constructor(private r: Router) { }

  ngOnInit(): void {
    this.inicializar();  
    this.username = localStorage.getItem('username');
    this.uid = localStorage.getItem('uid');
  }
	inicializar(){
    this.getDate();
    this.displayMsg();
    }
    
    getDate(){
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    }
    
    displayMsg() {
    this.hours = new Date().getHours();
    }

    goto_profile(): void{
      this.r.navigate(['/profile/' , this.username]);
    }

    goto_dashboard(): void{
      this.r.navigate(['/dashboard/']);
    }

    goto_close(): void{
      this.r.navigate(['/home/']);
    }
  

}
