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

  constructor( private request: RequestService ) {}

  // events = EVENTS;
  events;

  selected: Event;

  width = window.innerWidth;

  onSelect(event: Event): void {
    this.selected = event;
  }

  ngOnInit () {
    this.request.getEvents().subscribe(
      data => {
        console.log(data);
        this.events = data;
      },
      err => {
        this.request.error('No Events Listed');
        this.events = EVENTS;
      }
    );
  }

}
