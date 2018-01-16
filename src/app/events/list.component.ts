import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event/event';
// import { EVENTS } from '../data/mock-events';
import { EVENT } from '../data/mock-event';
import { RequestService } from '../http/request.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class EventsListComponent implements OnInit {

  @Input('events') events;

  selected: Event;

  width = window.innerWidth;

  onSelect(event: Event): void {
    this.selected = event;
  }

  ngOnInit () {
  }

}
