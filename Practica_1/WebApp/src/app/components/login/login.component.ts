import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {} as User;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  

  ngOnInit(): void {
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.user =  {
      username,
      password,
    } 

    this.authService.logUser(this.user).subscribe( res => {
      console.log(res);
      localStorage.setItem('x-token', res['token']);
      localStorage.setItem('username', res['username']);
      localStorage.setItem('uid', res['uid']);
      console.log(res.coach);
      if (res.coach == true){
        this.router.navigate(['/choose']);
      }else{
        this.router.navigate(['/dashboard']);
      }
    }, err => console.log(err['error']));
  }
  

}
