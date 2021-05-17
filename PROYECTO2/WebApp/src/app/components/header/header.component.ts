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
  time = new Date();
  history:any = [];
  hours = new Date().getHours();
  msg: string = "";
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getDate();
    this.displayMsg();
    this.username = localStorage.getItem('username');
    this.isCoach = localStorage.getItem('isCoach');
    this.uid = localStorage.getItem('uid');
    if (this.isCoach == null || this.isCoach == undefined  || this.isCoach != true ){ // daba clavo porque el isCoach regresaba como string
      if (this.isCoach != 'true'){
        this.isCoach = false;
      }
    }

  }

  logout() {
    this.authService.logout();
  }

  goTo_coachMenu():void{
    let id:any = localStorage.getItem('uid_coach');
    let user :any= localStorage.getItem('username_coach');
    console.log(id);
    console.log(user);

    if ((id != undefined && id != null  && id.length != 0 ) && (user !== undefined && user != null && user.length != 0 )){
      localStorage.setItem('uid',id );
      localStorage.setItem('username',user);
      console.log('COMEBACK COACH MODE');
    }
    this.router.navigate(['/choose']);
  }


  goto_profile(): void{
    this.router.navigate(['/profile/' , this.username]);
  }

  goto_bandeja(): void{
    this.router.navigate(['/bandeja/', this.uid]);
  }

  getDate(){
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  displayMsg() {
    this.hours = new Date().getHours();

    if(this.hours < 10) {
      this.msg = "Good Morning!"
    } else if(this.hours < 16) {
      this.msg = "Good Afternoon!";
    } else {
      this.msg = "Good Night!"
    }
  }
}
