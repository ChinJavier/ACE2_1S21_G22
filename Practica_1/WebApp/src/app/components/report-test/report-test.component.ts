import { Component, OnInit } from '@angular/core';
import { MedicionesService } from 'src/app/services/mediciones.service';

@Component({
  selector: 'app-report-test',
  templateUrl: './report-test.component.html',
  styleUrls: ['./report-test.component.css']
})
export class ReportTestComponent implements OnInit {
  medicionesOxigeno=[];
  medicionesTemperatura=[];
  medicionesRitmo=[];
  constructor(private medicionesService: MedicionesService) { 
    this.getMedicionesOxygen();
    this.getMedicionesRitmoC();
    this.getMedicionesTemperatura();
  }

  getMedicionesOxygen(){
    let user=localStorage.getItem('uid');
    this.medicionesService.getMediciones('oxygen',user).subscribe(res=>{
      this.medicionesOxigeno =res;
      console.log(this.medicionesOxigeno);
    })
  }
  getMedicionesTemperatura(){
    let user=localStorage.getItem('uid');
    this.medicionesService.getMediciones('temperature',user).subscribe(res=>{
      this.medicionesTemperatura =res;
    })
  }
  getMedicionesRitmoC(){
    let user=localStorage.getItem('uid');
    this.medicionesService.getMediciones('rythm',user).subscribe(res=>{
      this.getMedicionesRitmoC =res;
    })
  }
   
  
  ngOnInit(): void {
  }

}
