import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const API_URL = 'https://developer.ticketmaster.com/api-explorer/#9d789114-805f-9d5d-95ff-655e5af75ddf';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RequestService implements OnInit {

  results: Object;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get( API_URL, HTTP_OPTIONS )
      .subscribe(
        data => {
          console.log( 'Found Data:', data );
          this.results = data;
        }
      );
  }

}
