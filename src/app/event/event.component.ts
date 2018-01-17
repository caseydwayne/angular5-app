import { Component, Input, AfterContentChecked } from '@angular/core';
import { RequestService } from '../http/request.service';
import { EventFormatted } from './event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements AfterContentChecked {

  constructor ( private request: RequestService ) {}

  @Input('event') event: EventFormatted;

  private message = encodeURI( 'View details at ' + location );

  async toggleStatus(event) {
    const status = event.rsvp;
    this.request.updateStatus( event.id );
    this.event.rsvp = !status;
    console.log( 'Event Status:', status );
  }

  ngAfterContentChecked() {
    if ( !this.event.image ) {
      this.event.image = 'assets/event.jpg';
    }
  }

}
