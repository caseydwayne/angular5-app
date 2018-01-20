import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
// import 'rxjs/add/operator/retry';
// import { debounce, retry, retryWhen, delay, take } from 'rxjs/operators';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { EventFormatted } from '../event/event';
import { EVENT } from '../data/mock-event';

// const API_URL = environment.api_url;
const API_URL = 'http://dev.dragonflyathletics.com:1337/api/dfkey/';
// const API_URL = '/api/'; // attempting proxy to access images

const AUTH = { 'Authorization': 'Basic YW55dGhpbmc6ZXZhbHBhc3M=' };

const TYPE_JSON = { 'Content-Type': 'application/json' };
const TYPE_JPEG = { 'Content-Type': 'image/jpeg' };
const TYPE_PNG = { 'Content-Type': 'image/png' };
const TYPE_PLAIN = { 'Content-Type': 'text/plain' };
const TYPE_FORM = { 'Content-Type': 'application/x-www-form-urlencoded' };
const RES_ARRBUFF = { 'responseType': 'arraybuffer' };

/*
 * The RequestService handles communication with the Event API
 */

@Injectable()
export class RequestService implements OnInit {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  private user = 'anything';

  private demo = false;
  public demo_mode () {
    this.demo = true;
  }

  public error( message, prompt?: string ) {
    return this.snackBar.open( message, prompt || 'OK', { panelClass: 'error' } );
  }

  /*
   * @method getEvents
   * returns an observable containing Event JSON (see event/event for schema)
   */

  public getEvents() {
    if ( this.demo ) {
      return Observable.of( { 0: EVENT } );
    }
    return this.http.get<Event[]>(
      API_URL + 'events',
      {
        headers: new HttpHeaders({ ...TYPE_PLAIN, ...AUTH })
      }
    );
  }

  /*
   * @method getImage
   * retrieves image from server based on event.id and event.images.id (media.id)
   */

  public getImage( eventid: string, mediaid: string ) {
    if ( this.demo ) {
      return Observable.of('assets/event.jpg');
    }
    return this.http.get(
      `${API_URL}events/${eventid}/media/${mediaid}`,
      {
        headers: new HttpHeaders({
          // ...RES_ARRBUFF,
          ...TYPE_JPEG,
          ...AUTH
        }),
         responseType: 'text'
      }
    );
  }

  /*
   * @method getStatus
   * returns an observable containing UserStatus JSON ( { coming: <boolean> } )
   */

  public getStatus( event: EventFormatted ) {
    if ( this.demo ) {
      return Observable.of({ coming: true });
    }
    return this.http.get(
      `${API_URL}events/${event.id}/status/${this.user}`,
      {
        headers: new HttpHeaders({
          // ...TYPE_JSON,
          ...AUTH })
      }
    );
  }

  /*
   * @method updateStatus
   * updates the UserStatus in the API by toggling existing boolean (or explicitly via the 'value' argument)
   */

  public updateStatus( event: EventFormatted, value?: boolean ) {
    const rsvp = ( typeof value !== 'undefined' ? value : !this.getStatus( event ) );
    const data = { coming: rsvp };
    if ( this.demo ) {
      return Observable.of( data );
    }
    return this.http.put(
      `${API_URL}events/${event.id}/status/${this.user}`,
      data,
      {
        headers: new HttpHeaders({
          // ...TYPE_FORM,
          ...AUTH })
      })
      .retryWhen ( errors => errors.delay(1000).take(10) )
      .subscribe(
        response => {
          console.log( `Changed user status of "${this.user}" to ${rsvp}.` );
          const msg = rsvp ? '"Going"' : '"Not Going"';
          this.snackBar.open( 'RSVP Status Changed To ' + msg, 'OK', { panelClass: 'success' } );
          event.rsvp = rsvp;
        },
        error => {
          console.log( 'Could not get change user status.', error );
          this.snackBar.open( 'Could not change RSVP : server denied access.', 'OK', { panelClass: 'warn' } );
        }
      );
  }

  ngOnInit(): void {
    // console.log('Request Service Initialized. Found Data.');
    // this.getEvents( (data) => { console.log('Found Data'); } );
  }

}
