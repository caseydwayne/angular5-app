import { Component, OnInit } from '@angular/core';
import { Event, EventFormatted } from '../event/event';

// import { EVENTS } from '../data/mock-events';
import { EVENT } from '../data/mock-event';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../http/request.service';
import { DetailsService } from '../event/details.service';
import { Observable } from 'rxjs/Observable';
import { _do, scan, map, toArray  } from 'rxjs/operators';
import { Scanner } from 'typescript';
// import { } from 'lodash.map';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

/*
 * Assigns {events} from external data and creates related views
 */

// this.details.eventDetails( data, USER_ID )

export class EventsComponent implements OnInit {

  constructor(
    private request: RequestService,
    private details: DetailsService
  ) {}

  public events: EventFormatted[];
  private events_valid: boolean;

  private selected: EventFormatted;
  onSelect(event: EventFormatted): void {
    this.selected = event;
  }

  ngOnInit () {

    const USER_ID = 'anything';
    const demo = false;

    if ( demo ) { this.events = [ this.details.eventDetails( EVENT, USER_ID, true ) ];
    } else {
      return this.request.getEvents()
        // .pipe( toArray )
        // .map( evt => this.details.eventDetails( evt, USER_ID ) )

        .subscribe(
          data => {
            if ( typeof data !== 'object' ) {
              return this.request.error('DragonFly API returned an invalid response.');
            }
            // convert raw EventData to EventFormatted
            data.forEach( evt => {
              const e = this.details.eventDetails( evt, USER_ID );
              return e;
            });
            console.log( 'Found data:', (data instanceof Array), data.length, data );
            this.events = data as EventFormatted;
          },
          err => {
            this.request.error('DragonFly API unavailable/returned invalid response.');
          }
        );
      }
    }

}
