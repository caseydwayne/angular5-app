import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { EventFormatted } from '../event/event';
import { EVENT } from '../data/mock-event';

// const API_URL = environment.api_url;
const API_URL = '/api/'; // using a proxy to bypass same-origin errors

const AUTH = { 'Authorization': 'Basic YW55dGhpbmc6ZXZhbHBhc3M=' };

/*
 * The RequestService handles communication with the Events API
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
      return Observable.of( EVENT ).map( o => JSON.stringify(o) );
    }
    return this.http.get(
      API_URL + 'events',
      {
        headers: new HttpHeaders({ ...AUTH })
      }
    );
  }

  /*
   * @method getImage
   * retrieves image from server based on event.id and event.images.id (media.id)
   */

  public getImage( eventid: string, mediaid: string ) {
    return `${API_URL}events/${eventid}/media/${mediaid}`;
  }

  /*
   * @method getStatus
   * returns an observable containing UserStatus JSON ( { coming: <boolean> } )
   */

  public getStatus( event: EventFormatted ) {
    if ( this.demo ) {
      return Observable.of({ coming: event.rsvp });
    }
    return this.http.get(
      `${API_URL}events/${event.id}/status/${this.user}`,
      {
        headers: new HttpHeaders({ ...AUTH })
      }
    );
  }

  private statusChanged ( event, rsvp ) {
    event.rsvp = rsvp;
    console.log( `Changed user status of "${this.user}" to ${rsvp}.` );
    const msg = rsvp ? '"Going"' : '"Not Going"';
    const sb = this.snackBar.open( 'RSVP Status Changed To ' + msg, 'OK', { panelClass: 'success' } );
    setTimeout( () => sb.dismiss(), 2200 );
  }

  private statusError ( error ) {
    console.log( 'Could not get change user status.', error );
    this.snackBar.open( 'Could not change RSVP : server denied access.', 'OK', { panelClass: 'warn' } );
  }

  /*
   * @method updateStatus
   * updates the UserStatus in the API by toggling existing boolean (or explicitly via the 'value' argument)
   */

  public updateStatus( event: EventFormatted, value: boolean, silent?: boolean ) {
    const rsvp = value;
    const data = { coming: rsvp };
    if ( this.demo ) {
      return Observable.of( data )
        .subscribe(
          () => {
            if ( !silent ) { this.statusChanged( event, rsvp ); }
          },
          err => { if ( !silent ) { this.statusError( err ); } }
        );
    }
    return this.http.put(
      `${API_URL}events/${event.id}/status/${this.user}`,
      data,
      {
        headers: new HttpHeaders({ ...AUTH })
      })
      .retryWhen ( errors => errors.delay(1000).take(10) )
      .subscribe(
        () => {
          if ( !silent ) { this.statusChanged( event, rsvp ); }
        },
        err => { if ( !silent ) { this.statusError( err ); } }
      );
  }

  public getJSON ( file ) {
    return this.http.get( `${file}.json` );
  }

  ngOnInit(): void { }

}
