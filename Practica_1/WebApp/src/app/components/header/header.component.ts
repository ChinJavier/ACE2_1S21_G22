import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String | null = '';
  constructor(
    private authService: AuthService,
  ) { 
  }
  
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  logout() {
    this.authService.logout();
  }

}
