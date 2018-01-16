import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event';
// import { EVENTS } from '../data/mock-events';
import { EVENT } from '../data/mock-event';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../http/request.service';
import { DetailsService } from '../event/details.service';

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

  ngOnInit () {

    const USER_ID = 'anything';
    this.events_valid = false;

    const demo = false;
    const mock = { 0: EVENT };

    if ( demo ) {
      this.events = mock;
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
