import { Injectable, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
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
   * @property event
   * all {event} require the following schema to work with event.component and events/list.component
   * @private
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


  /*
   * @method eventData
   * replaces private event values with select raw values
   */

  eventData( event ) {
    this.event.id = event.id;
    this.event.name = event.name;
    this.event.description = event.description;
    this.event.location = event.location;
  }

  /*
   * @method eventData
   * retrieves image from api and replaces image property
   * @todo create getImage method in RequestService
   */

  eventImage ( event ) {
    this.event.image = 'assets/event.jpg';
  }


  /*
   * @method eventStatus
   * retrieves RSVP status for the provided USER_ID
   */

  eventStatus( event, user ) {
    this.request.getStatus( event.id, user )
      .subscribe(
        _user => {
          console.log(_user);
         // this.event.rsvp = ( _user.hasOwnProperty('coming') ? _user.coming : false )
        }
      );
  }


  /*
   * @method eventDetails
   * accepts an Event and USER_ID. transforms raw Event from database into a more usable format.
   */

  public eventDetails ( event, user ) {
    this.eventData( event );
    this.eventImage( event );
    this.eventStatus( event, user );
    return this.event;
  }

  // map( _event => this.eventDetails( _event, USER_ID ) )

  ngOnInit(): void {}

}
