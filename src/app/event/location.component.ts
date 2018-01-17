import { Component, Input } from '@angular/core';
import { Event } from './event';

@Component({
  selector: 'app-event-location',
  template: `
    <p class="location">
      <span class="city">{{event.location.city}}</span>,&nbsp;
      <span class="state">{{event.location.state}}</span>
    </p>
  `
})

export class EventLocationComponent {

  @Input('event') event;

}
