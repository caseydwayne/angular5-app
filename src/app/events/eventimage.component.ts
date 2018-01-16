import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestService } from '../http/request.service';

@Component({
  selector: 'app-event-image',
  template: `
    User Status: {{userStatus}}
  `
})

export class EventImageComponent implements OnInit {

  constructor(
    private request: RequestService,
    private http: HttpClient
  ) {}

  private userStatus;

  ngOnInit () {
    this.request.getStatus(
      '59d2bd5a2b92b0ceeed8eec7',
      'anything'
    ).subscribe(
      res => {
        this.userStatus = res;
        console.log( res );
      }
    );
  }

}
