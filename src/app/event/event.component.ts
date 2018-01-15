import { Component, Input, OnInit } from '@angular/core';
// import { Event } from './event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {

  @Input('event') event; // : Event, disabled for placeholder image
  @Input('preview') preview: Boolean;
  // private preview: Boolean;
  private image: String;

  ngOnInit() {
    // alert( this.preview || false );
    let img = 'assets/event';
    if ( this.preview ) { img += '-thumbnail'; }
    this.event.image = img + '.jpg';
  }

}
