import { Injectable, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { debounce, retry } from 'rxjs/operators';

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
    this.event.more = { date: event.date, ...event.comments, ...event.images };
  }

  /*
   * @method eventData
   * retrieves image from API and replaces image property
   */

  eventImage ( event ) {
    let img = 'assets/event.jpg';
    // disabled because 1) API provided img src attribute is wrong, 2) accuracy of API response is poo, consider using an API that works.
    const fetch = false;
    if ( fetch ) {
      console.log( 'found event.images' );
      if ( event.images && event.images[0] && event.images[0].id ) {
        const img_id = event.images[0].id;
        const req = this.request.getImage( event.id, img_id );
        req.subscribe(
          data => console.log(data)
        );
        if ( typeof req === 'string' ) { img = req; }
      }
    }
    this.event.image = img;
  }


  /*
   * @method eventStatus
   * retrieves RSVP status for the provided USER_ID
   */

  eventStatus( event ) {
    this.request.getStatus( event.id )
      .retry(4)
      .subscribe(
        _user => {
          // only accept { coming: <boolean> }
          if ( typeof _user === 'object' && _user !== null ) {
            if ( 'coming' in _user ) { this.event.rsvp = _user['coming']; }
          }
          // console.log( `Event: ${event.id} | User Status: ${this.event.rsvp}` );
        }
      );
  }

  /*
   * @method eventDetails
   * accepts an Event and USER_ID. transforms raw Event from database into a more usable format.
   */

  public eventDetails ( event, user, test?: boolean ) {
    this.eventData( event );
    if ( !test ) {
      this.eventImage( event );
      this.eventStatus( event );
    }
    return this.event;
  }

  // map( _event => this.eventDetails( _event, USER_ID ) )

  ngOnInit(): void {}

}
