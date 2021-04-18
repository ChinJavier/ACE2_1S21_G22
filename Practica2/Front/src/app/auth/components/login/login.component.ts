import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  login() {

    this.authService.login(this.username, this.password)
      .subscribe(res => {
        if(!res) {
          Swal.fire('Error', 'Contraseña o usuario incorrecto.','error')
        } else {
          this.router.navigate(['dashboard']);
          this.username = '';
          this.password = '';

        }
      })



  }

}
