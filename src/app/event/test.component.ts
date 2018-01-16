import { Component, Input, OnInit } from '@angular/core';
import { Event } from './event';
import { EVENT } from '../data/mock-event';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-event-test',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

/*
 * creates a single event based on data/mock-event
 */

export class EventTestComponent implements OnInit {

  constructor(
    private details: DetailsService
  ) {}

  // message will be injected into email body. used in "share this" link
  private message = encodeURI( 'View details at ' + location );

  event = this.details.eventDetails( EVENT, 'anything' );

  ngOnInit() { }

}
