import { Component, OnInit } from '@angular/core';
import { Event, EventFormatted } from '../event/event';
// import { EVENTS } from '../data/mock-events';
import { EVENT } from '../data/mock-event';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../http/request.service';
import { DetailsService } from '../event/details.service';
import { map } from 'rxjs/operators';

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

  public events;
  private events_valid: boolean;

  getDetails = this.details.eventDetails;

  private selected: EventFormatted;
  onSelect(event: EventFormatted): void {
    this.selected = event;
  }

  ngOnInit () {

    const USER_ID = 'anything';
    this.events_valid = false;

    const demo = false;

    if ( demo ) {
      this.events = [ this.getDetails( EVENT, USER_ID, true ) ];
      this.events_valid = true;
    } else {
      this.request.getEvents()
        .subscribe(
          data => {
            console.log(data);
            const etype = ( typeof this.events === 'object' );
            if ( etype ) {
              this.events = data;
              this.events_valid = true;
            } else {
              this.events = {};
              this.events_valid = false;
            }
          },
          err => {
            this.request.error('DragonFly API unavailable/returned invalid response.');
            this.events = {};
            this.events_valid = false;
          }
        );
      }
    }

}
