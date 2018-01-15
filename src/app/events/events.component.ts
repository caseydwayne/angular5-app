import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event';
import { EVENTS } from '../data/mock-events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent {

  events = EVENTS;

  selected: Event;

  width = window.innerWidth;

  onSelect(event: Event): void {
    this.selected = event;

  }

}
