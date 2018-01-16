import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-event-image',
  template: `
    <img alt="event.image" />
  `
})

export class EventImageComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) {}

  private image: String;

  api = 'http://dev.dragonflyathletics.com:1337/api/dfkey/';

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YW55dGhpbmc6ZXZhbHBhc3M='
    })
  };

  loadImg( event, image ) {
    const dest = `${this.api}events/${event}/media/${image}`;
    this.http.get( dest, this.options ).subscribe(
      img => {
        console.log(img);
        // this.image = img;
      },
      err => {
        // this.request.error('No Events Listed');
        // this.events = EVENTS;
      }
    );
  }
  ngOnInit () {
    this.loadImg(
      '59d2bd5a2b92b0ceeed8eec7',
      'uHAis0T+SuSywBdWX0j+UQ=='
    );
  }

}
