import { Injectable, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import { RequestService } from '../http/request.service';
import { MatSnackBar } from '@angular/material';

/*
 * Creates valid "Event" object for /event/* components
 */

@Injectable()
export class DetailsService implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
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
    thumbnail: 'assets/event-thumbnail.jpg',
    rsvp: true,
    more: {} // store extra data (comments, images) here, if needed
  };

  private events_loaded = 0;
  private events_max = 2;

  /*
   * @method eventData
   * replaces private event values with select raw values
   */

  eventData( event ) {
    this.event.id = event.id;
    this.event.name = event.name;
    this.event.description = event.description;
    this.event.location = event.location;
    this.event.more = { date: new Date( event.date ), ...event.comments, ...event.images };
  }

  /*
   * @method _arrayBufferToBase64
   * modified from https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
   */

  _arrayBufferToBase64( buffer ) {
    let binary = '';
    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  /*
   * @method eventData
   * retrieves image from API and replaces image property
   */

  eventImage ( event ) {
    const img_default = this.event.image;
    let img = this.sanitizer.bypassSecurityTrustUrl(img_default);
    // disabled because 1) API provided img src attribute is wrong, 2) accuracy of API response is poo, consider using an API that works.
    const fetch = false;
    if ( fetch ) {
      console.log( 'found event.images', event.images );
      if ( event.images && event.images[0] && event.images[0].id ) {
        const img_id = event.images[0].id;
        const req = this.request.getImage( event.id, img_id );
        req.subscribe(
          res => {
            const data = this._arrayBufferToBase64(res);
            // console.log( 'Image Data:', res );
            img = `data:image/JPEG;base64,${res}`;
            // img = res;
          },
          err => {
            console.log( 'Received error status:', err.status );
            if ( err.status === 200 ) {
              console.log( err.message );
            }
          }
        );
      }
    }
    this.event.image = img as string;
    this.event.thumbnail = this.sanitizer.bypassSecurityTrustStyle(`url(${img_default})`) as string;
  }

  /*
   * @method _fixStatus
   * fixes invalid database data type (forces { coming: <boolean> })
   */

  _fixStatus ( event ) {
    this.request.updateStatus( event, false );
  }

  /*
   * @method eventStatus
   * retrieves RSVP status for the provided event
   */

  eventStatus( event ) {
    const cap = 5;
    this.request.getStatus( event )
      .retry(5)
      .subscribe(
        _user => {
          // only accept { coming: <boolean> }
          if ( typeof _user === 'object' && _user !== null ) {
            if ( 'coming' in _user ) { this.event.rsvp = _user['coming']; }
          } else {
            this._fixStatus( event );
          }
          // console.log( `Event: ${event.id} | User Status: ${this.event.rsvp}` );
        },
        // retry until successful
        err => {
          // this.eventStatus( event );
        }
      );
  }


  /*
   * @method eventDetails
   * accepts an Event and USER_ID. transforms raw Event from database into a more usable format.
   */

  public eventDetails ( event, user, test?: boolean ) {
    if ( this.events_loaded < this.events_max ) {
      this.eventData( event );
      if ( !test ) {
        this.eventImage( event );
        this.eventStatus( event );
      }
      this.events_loaded++;
    }
    return this.event;
  }

  // map( _event => this.eventDetails( _event, USER_ID ) )


  ngOnInit(): void {}

}
