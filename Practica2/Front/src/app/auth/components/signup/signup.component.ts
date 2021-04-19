import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  signup() {

    this.authService.signup( this.username, this.password )
      .subscribe(
        res => {
          if(!res) {
            Swal.fire('error', 'El usuario ya existe.', 'error');
          } else {
            // this.router.navigate(['/signup']);
          }
        }
      )

  }


}
