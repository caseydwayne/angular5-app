import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event';
import { EVENTS } from '../data/mock-events';
import { RequestService } from '../http/request.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {

  constructor(private request: RequestService ) {}

  events = EVENTS;

  selected: Event;

  width = window.innerWidth;

  onSelect(event: Event): void {
    this.selected = event;
  }

  ngOnInit (): void {
    this.request.getEvents( () => {} );
  }

}
