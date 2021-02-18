import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router} from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String | null = '';
  isCoach: any = false;
  uid:any;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.isCoach = localStorage.getItem('isCoach');
    this.uid = localStorage.getItem('uid');
    if (this.isCoach == null ){
      this.isCoach = false;
    }
  }

  logout() {
    this.authService.logout();
  }

  goTo_coachMenu():void{
    this.router.navigate(['/choose']);
  }


  goto_profile(): void{
    this.router.navigate(['/profile/' , this.username]);
  }
}
