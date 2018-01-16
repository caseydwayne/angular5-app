import { Injectable, OnInit } from '@angular/core';
import { RequestService } from '../http/request.service';
import { MatSnackBar } from '@angular/material';

/*
 * Creates valid "Event" object for /event/* components
 */

@Injectable()
export class DetailsService implements OnInit {

  constructor(
    private request: RequestService,
    private snackBar: MatSnackBar
  ) {}

  /*
   * All {event} require the following schema to work with event.component and events/list.component
   */

  private event = {
    id: 'uniqueidstring',
    name: 'Event Name',
    description: 'Descriptive text describing event.',
    location: { city: 'Knoxville', state: 'Tennessee' },
    image: 'assets/event.jpg',
    rsvp: true,
    more: {} // store extra data (comments, images) here, if needed
  };

  eventData( event ) {
    this.event.name = event.name;
    this.event.description = event.description;
    this.event.location = event.location;
  }

  eventImage ( event ) {
    this.event.image = 'assets/event.jpg';
  }

  eventStatus( event, user ) {
    this.request.getStatus( event.id, user )
      .subscribe(
        _user => {
          console.log(_user);
         this.event.rsvp = ( _user.hasOwnProperty('coming') ? _user.coming : false ) 
        }
      )
  }

  public eventDetails ( event, user ) {
    this.eventData( event );
    this.eventImage( event );
    this.eventStatus( event, user );
  }

  ngOnInit(): void {}

}
