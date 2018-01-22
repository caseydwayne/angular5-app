import { Component, OnInit } from '@angular/core';
import { Event, EventFormatted } from '../event/event';
import { DetailsService } from '../event/details.service';
import { EVENT } from '../data/mock-event';

@Component({
  selector: 'app-events-test',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

/*
 * creates events-list using data/mock-event
 */

export class EventsTestComponent implements OnInit {

  constructor(
    private details: DetailsService
  ) {}

  public events: EventFormatted[];
  private events_valid: boolean;
  public selected: EventFormatted;

  onSelect ( event ) {
    this.selected = event;
  }

  ngOnInit () {

    const USER_ID = 'anything';

    this.events_valid = false;

    // convert raw event to formatted
    const mock = this.details.eventDetails( EVENT, USER_ID, true );

    this.events = [ mock ];
 
    this.events_valid = true;

  }

}
