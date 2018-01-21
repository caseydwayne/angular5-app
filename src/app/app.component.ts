import { Component, AfterViewInit } from '@angular/core';
import { OverlayService } from './overlay/overlay.service';
import { OverlayComponent } from './overlay/overlay.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  constructor(
    private overlay: OverlayService
  ) {}

  title = 'Angular5 App';

  public loading: (boolean) = true;

  ngAfterViewInit() {
    setTimeout( () => { this.loading = false; } );
    this.overlay.open( OverlayComponent );
  }
}
