import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Event, EventFormatted } from '../event/event';
import { EVENT } from '../data/mock-event';
import { EVENTS } from '../data/mock-events';
import * as FULL_EVENTS from '../data/events.json';
import * as MINI_EVENTS from '../data/events-mini.json';
import { EventComponent } from '../event/event.component';
import { RequestService } from '../http/request.service';
import { DetailsService } from '../event/details.service';
import { OverlayService } from '../overlay/overlay.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs/RX';

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
    private overlay: OverlayService,
    private change: ChangeDetectorRef
  ) {

  }

  width = window.innerWidth;

  events;

  public selected;

  /*
   * @method onSelect
   * triggered upon clicking an event-preview
   */

  public onSelect(event: EventFormatted): void {
    this.selected = event;
    // this.overlay.open( EventComponent, event, 'event' );
  }

  /*
   * @method listEvents
   * requests from API and lists all events
   */

  public listEvents ( USER_ID?: string, demo?: boolean ) {
    if ( demo ) {
      // convert fetched Event JSON into data model (EventFormatted)
      const req = this.request.getJSON( 'assets/data/events-mini' )
      .mergeMap(
        ( result: Array<Event> ) => {
          return Observable.forkJoin(
            result.map(
              ( event: Event ) => this.details.eventDetails( event, USER_ID )
            )
          );
        }
      );
      req.subscribe( v => {
        this.events = v;
      });
      /*
      req.subscribe(
        data => {
          console.log( 'Found data:', data );
          const events = Observable.from( data );
          events.map(
            _evt => {
              return this.details.eventDetails( _evt, USER_ID );
            }
          );
          console.log( 'Updating events', events );
          this.events = events;
          // this.events.next(data);
        }
      );
      this.change.detectChanges();
      */
      /*
        .subscribe(
          data => {
            data.forEach(
              _evt => {
                const e = this.details.eventDetails( _evt, USER_ID );
                console.log( 'Found', e );
                return Observable.of(e); // this is correct (EventFormatted)
              }
            );
            // this.events = Observable.from( data );
            // const formatted = this.details.eventDetails( _evt, USER_ID );
            // console.log( 'listEvents subscribe map', formatted );
            // return Observable.of( formatted );
            // console.log( 'listEvents subscribe', this.events );
          }
        );
    */
    } else {

    }
  }

  ngOnInit () {

    const USER_ID = 'anything';
    const demo = true;
    if ( demo ) { this.request.demo_mode(); }
    this.listEvents( USER_ID, demo );

  }

  ngAfterContentChecked() {
    // console.log(this.events);
  }

}
