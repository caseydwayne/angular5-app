import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  title = 'Angular5 App';

  public loading: (boolean) = true;

  ngAfterViewInit() {
     setTimeout( () => { this.loading = false; } );
  }
}
