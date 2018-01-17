import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/retry';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';

// const API_URL = environment.api_url;
const API_URL = 'http://dev.dragonflyathletics.com:1337/api/dfkey/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic YW55dGhpbmc6ZXZhbHBhc3M='
  })
};

/*
 * The RequestService handles communication with the DragonFly API
 */

@Injectable()
export class RequestService implements OnInit {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  private user = 'anything';


  public error( message ) {
    this.snackBar.open( message, 'OK', { panelClass: 'error' } );
  }

  /*
   * @method getEvents
   * returns an observable containing Event JSON (see event/event for schema)
   */

  public getEvents() {
    return this.http.get<Event[]>( API_URL + 'events', HTTP_OPTIONS );
  }

  /*
   * @method getImage
   * retrieves image from server based on event.id and event.images.id (media.id)
   */

  public getImage( eventid: string, mediaid: string ) {
    return this.http.get(
      `${API_URL}events/${eventid}/media/${mediaid}`,
      HTTP_OPTIONS
    );
  }

  /*
   * @method getStatus
   * returns an observable containing UserStatus JSON ( { coming: <boolean> } )
   */

  public getStatus( event_id: string ) {
    return this.http.get(
      `${API_URL}events/${event_id}/status/${this.user}`,
      HTTP_OPTIONS
    );
  }

  /*
   * @method updateStatus
   * updates the UserStatus in the API by toggling existing boolean (or explicitly via the 'value' argument)
   */

  public updateStatus( event_id: string, value?: boolean ) {
    const rsvp = ( typeof value !== 'undefined' ? value : !this.getStatus( event_id ) );
    const data = { coming: rsvp };
    return this.http.post( `${API_URL}events/${event_id}/status/${this.user}`, data, HTTP_OPTIONS )
      .subscribe(
        response => {
          console.log( `Changed status of ${this.user} to ${rsvp}.` );
          this.snackBar.open( 'RSVP Status Changed To ' + rsvp, 'OK', { panelClass: 'success' } );
          return response;
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
