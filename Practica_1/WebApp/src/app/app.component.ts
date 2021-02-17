import { Component } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TVE';
  mediaSub: Subscription = {} as Subscription;
  deviceXS: boolean = false;
  constructor(private mediaObserver: MediaObserver) {}

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange) => {
      console.log(result.mqAlias);
      this.deviceXS = result.mqAlias === 'xs' ? true : false;
    });
  }
  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }
}
