import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  styleUrls: ['./bandeja.component.css']
})
export class BandejaComponent implements OnInit {

  correos: any[] = [];

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let uid: any = this.activatedRoute.snapshot.params.uid;
    this.userService.getCorreos(uid).subscribe( resp => {
      this.correos = resp;
      if(this.correos.length === 0){
        Swal.fire('por el momento no tiene correos disponibles');
      }
    });
  }

}
