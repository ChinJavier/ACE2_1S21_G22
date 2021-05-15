import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    user: User = {} as User;

    signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),

  }); 

  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  initializeForm() {
    this.signupForm = this.fb.group({

    });
  }

  onSubmit() {
    this.user = this.signupForm.value;
    console.log(this.user);
    this.authService.createUser(this.user).subscribe(res => {
      console.log(res);
      localStorage.setItem('x-token', res['token']);
      localStorage.setItem('username', res['username']);
      localStorage.setItem('uid', res['uid']);
      this.router.navigate(['/login/']);
      Swal.fire({
        icon:"success",
        title:"OK",
        text:"Registrado",
        showConfirmButton:false,
        timer: 2000
      })
    }, err => {
      console.log(err);
      Swal.fire({
        icon:"error",
        title:":(",
        showConfirmButton:false,
        timer: 2000
      })
    }); 
    
  }

}
