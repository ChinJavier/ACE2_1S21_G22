import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.css']
})
export class ListProfileComponent implements OnInit {
  coachito= ['uno', 'dos',' tres', 'cuatro'];
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goto_profile(username: any): void{
    this.router.navigate(['/profile/' , username]);
  }

}
