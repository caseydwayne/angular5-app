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

@Injectable()
export class RequestService implements OnInit {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  private results;

  private request( path: String, cb?: Function ) {
    const destination = API_URL + path;
    return this.http.get( destination, HTTP_OPTIONS )
      .retry(2)
      .subscribe(
        data => {
          console.log( 'Found Data:', data );
          if ( cb ) { cb( data ); }
          return this.results = data;
        },
        error => {
          console.log( 'Could not get data from', destination, error );
          this.snackBar.open( error.message, 'OK', { panelClass: 'error' } );
        }
      );
  }

  public error( message ) {
    this.snackBar.open( message, 'OK', { panelClass: 'error' } );
  }

  public getEvents() {
    return this.http.get( API_URL + 'events', HTTP_OPTIONS );
    // return this.request( 'events' );
  }

  getEvent( event: String, cb? ) {
    return this.request( 'events/' + event , cb );
  }

  public getStatus( eventid: string, user: string ) {
    return this.http.get(
      `${API_URL}events/${eventid}/status/${user}`,
      HTTP_OPTIONS
    );
  }

  public updateStatus( event, user, value ) {
    const rsvp = ( typeof value !== 'undefined' ? value : !this.getStatus( event, user ) );
    const data = { coming: rsvp, client_id: 'anything', client_secret: 'evalpass' };
    this.http.post( `${API_URL}events/${event}/status/${user}`, data, HTTP_OPTIONS )
      .retry(3)
      .subscribe(
        response => {
          console.log( `Changed status of ${user} to ${rsvp}.` );
          this.snackBar.open( 'RSVP Status Changed To ' + rsvp, 'OK', { panelClass: 'success' } );
          return response;
        },
        error => {
          console.log( 'Could not get change user status.', error );
          this.snackBar.open( 'Could not change RSVP', 'OK', { panelClass: 'warn' } );
        }
      );
    return rsvp;
  }

  ngOnInit(): void {
    // console.log('Request Service Initialized. Found Data.');
    // this.getEvents( (data) => { console.log('Found Data'); } );
  }

}
