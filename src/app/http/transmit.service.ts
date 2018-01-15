import { Injectable, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const API_URL = 'https://developer.ticketmaster.com/api-explorer/#9d789114-805f-9d5d-95ff-655e5af75ddf';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Authorization': 'YW55dGhpbmc6ZXZhbHBhc3M='
  })
};

@Injectable()
export class TransmitService implements OnInit {

  // @input('body')

  private results: Object;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.post( API_URL, this.results, HTTP_OPTIONS )
      .subscribe(
        response => {
          console.log('Finish setting up the transmit.service subscribe callback');
        },
        error => {
          console.log( 'Could not get data from', API_URL, error );
        }
      );
  }

}
