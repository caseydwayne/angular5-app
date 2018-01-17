import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventFormatted } from '../event/event';
// import { EVENTS } from '../data/mock-events';
import { EVENT } from '../data/mock-event';
import { RequestService } from '../http/request.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class EventsListComponent implements OnInit {

  @Input('events') events: EventFormatted[];
  @Output() selected = new EventEmitter<EventFormatted>();
  width = window.innerWidth;

  onSelect ( event ) {
    this.selected.emit(event);
  }

  ngOnInit () {
  }

}
