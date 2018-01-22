import { Component, OnInit } from '@angular/core';
import { Event, EventFormatted } from '../event/event';
import { EVENT } from '../data/mock-event';
import { EVENTS } from '../data/mock-events';
import { EventComponent } from '../event/event.component';
import { RequestService } from '../http/request.service';
import { DetailsService } from '../event/details.service';
import { OverlayService } from '../overlay/overlay.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

/*
 * Assigns {events} from external data and creates related views
 */

export class EventsComponent implements OnInit {

  constructor (
    private request: RequestService,
    private details: DetailsService,
    private overlay: OverlayService
  ) {}

  public events;
  private events_valid: boolean;
  private events_loaded = 0;

  private tries = 0;
  private retry = false;

  public width = window.innerWidth;

  public selected: EventFormatted;

  /*
   * @method onSelect
   * triggered upon clicking an event-preview
   */

  public onSelect(event: EventFormatted): void {
    this.selected = event;
    // this.overlay.open( EventComponent, event, 'event' );
  }

  private processEvents ( events, USER_ID ) {
    return events.forEach(
      evt => {
        const e = this.details.eventDetails( evt, USER_ID );
        return e;
      }
    );
  }

  /*
   * @method listEvents
   * requests from API and lists all events
   */

  public listEvents ( USER_ID?: string, demo?: boolean ) {
    if ( demo ) {
      const events = [ this.details.eventDetails( EVENT, USER_ID ) ];
      // this.processEvents( events, USER_ID );
      return this.events = events;
    }
    const max_tries = 3; // limit the # of retrieval attempts
    const limit = 2; // limit the # of events
    let type_err;
    const observer = this.request.getEvents()
      .subscribe(
        data => {
          // retry if response is not valid JSON
          if ( typeof data !== 'object' ) {
            type_err = this.request.error('Events API returned an invalid response. Retrying...');
            return this.listEvents();
          }
          // convert raw EventData to EventFormatted
          data = this.processEvents( data, USER_ID );
          // console.log( 'Found data:', (data instanceof Array), data.length, data );
          this.events = limit > 0 ? data.slice( 0, limit ) : data;
          const i = this.events_loaded++;
          if ( type_err ) { type_err.dismiss(); }
          if ( i === limit ) { return; }
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

  ngOnInit () {

    const USER_ID = 'anything';
    const demo = true;
    if ( demo ) { this.request.demo_mode(); }
    this.listEvents( USER_ID, demo );

  }

}
