import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  title = 'Dragonfly API';

  public loading: (boolean) = true;

  ngAfterViewInit() {
     setTimeout( () => { this.loading = false; } );
  }
}
