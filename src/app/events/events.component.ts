import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Event, EventFormatted } from '../event/event';
import { EVENT } from '../data/mock-event';
import { EVENTS } from '../data/mock-events';
import * as FULL_EVENTS from '../data/events.json';
import * as MINI_EVENTS from '../data/events-mini.json';
import { EventComponent } from '../event/event.component';
import { RequestService } from '../http/request.service';
import { DetailsService } from '../event/details.service';
// import { OverlayService } from '../overlay/overlay.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs/RX';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

/*
 * Assigns {events} from external data and creates related views
 */

export class EventsComponent implements OnInit, AfterContentChecked {

  constructor (
    private request: RequestService,
    private details: DetailsService,
    // private overlay: OverlayService,
    private change: ChangeDetectorRef
  ) {

  }

  width = window.innerWidth;

  events;

  private events_loaded = 0;

  private tries = 0;
  private retry = false;

  public selected;

  /*
   * @method onSelect
   * triggered upon clicking an event-preview
   */

  public onSelect(event: EventFormatted): void {
    this.selected = event;
    // this.overlay.open( EventComponent, event, 'event' );
  }

   processEvents ( req, USER_ID ) {
    return req.mergeMap(
        ( result: Array<Event> ) => {
          return Observable.forkJoin(
            result.map(
              ( event: Event ) => this.details.eventDetails( event, USER_ID )
            )
          );
        }
      );
  }

  /*
   * @method listEvents
   * requests from API and lists all events
   */

  public listEvents ( USER_ID?: string, demo?: boolean ) {

    if ( demo ) {

      // convert fetched Event JSON into data model (EventFormatted)
      let req = this.request.getJSON( 'assets/data/events-mini' );
      req = this.processEvents( req, USER_ID );
      req.subscribe( v => {
        this.events = v;
      });

    } else {

      const max_tries = 3; // limit the # of retrieval attempts
      let type_err;
      let events = this.request.getEvents();
      events = this.processEvents( events, USER_ID );
      events
        .subscribe(
          data => {
            // retry if response is not valid JSON
            if ( typeof data !== 'object' ) {
              type_err = this.request.error('Events API returned an invalid response. Retrying...');
              return this.listEvents();
            }
            this.events = data;
            const i = this.events_loaded++;
            if ( type_err ) { type_err.dismiss(); }
          },
          err => {
            // retry if API is unavailable
            this.tries++;
            if ( this.tries < max_tries ) {
              this.request.error('Events API is unavailable. Retrying.');
              this.listEvents();
            } else {
              const msg = this.retry
                ? 'Please check your connection and try again.'
                : 'The Events API is currently unavailable.';
              const snack = this.request.error( msg, 'Retry' );
              snack.onAction().subscribe(
                () => {
                  this.retry = true;
                  this.tries = 0;
                  return this.listEvents( USER_ID );
                }
              );
            }
          }
        );
    }
  }

  ngOnInit () {

    const USER_ID = 'anything';
    const demo = !true;
    if ( demo ) { this.request.demo_mode(); }
    this.listEvents( USER_ID, demo );

  }

  ngAfterContentChecked() {
    // console.log(this.events);
  }

}
