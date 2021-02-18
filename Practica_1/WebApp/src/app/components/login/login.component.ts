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
      localStorage.setItem('isCoach',res['isCoach']);
      // revisar los nombres que puse en RES :v no se si asi estan en el backend
      localStorage.setItem('sex' , res['sex']);
      localStorage.setItem('height' , res['height']);
      localStorage.setItem('weight' , res['weigth']);
      localStorage.setItem('name' , res['name']);
      localStorage.setItem('lastname' , res['name']);
      localStorage.setItem('age' , res['age']);
      console.log(res.coach);
      if (res.coach == true){
        this.router.navigate(['/choose']);
      }else{
        this.router.navigate(['/dashboard']);
      }
    }, err => console.log(err['error']));
  }
  

}
